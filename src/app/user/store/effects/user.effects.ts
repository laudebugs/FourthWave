import { Router } from '@angular/router'
import { setContext } from '@apollo/client/link/context'
import { Apollo } from 'apollo-angular'
import { AuthService } from '../../services/auth.service'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, pluck, tap } from 'rxjs/operators'

import * as userActions from '../actions/user.actions'
import * as PlayerActions from '../../../shared/player/store/player.actions'
import { User } from 'src/app/shared/Models/User'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store/app.state'
@Injectable()
export class UserEffects {
  constructor (
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private apollo: Apollo,
    private router: Router
  ) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.signInStart),
      exhaustMap(action => {
        return this.authService.signIn(action.username, action.password).pipe(
          pluck('data', 'signin'),
          map((data: User) => {
            const user: User = data

            // Save the auth token to the local storage.
            localStorage.setItem('token', user.authtoken)
            this.store.dispatch(
              PlayerActions.getPlayingQueueSuccess({ plays: user.queue })
            )
            this.store.dispatch(
              PlayerActions.changeVolumeSuccess({ volume: user.volume })
            )
            this.router.navigateByUrl('')
            return userActions.signInSuccess({ user: user })
          }),
          catchError(error => {
            console.log(error.message)
            return [userActions.signInFailure()]
          })
        )
      })
    )
  })

  signInWithtoken$ = createEffect(() => {
    const req$ = this.actions$.pipe(
      ofType(userActions.signInWithTokenStart),
      exhaustMap(action => {
        return this.authService.signInWithToken()
      }),
      catchError(error => {
        return [userActions.signInFailure()]
      })
    )

    const res$ = req$.pipe(
      pluck('data', 'signInWithToken'),
      map((user: User) => {
        this.store.dispatch(
          PlayerActions.getPlayingQueueSuccess({ plays: user.queue })
        )
        this.store.dispatch(
          PlayerActions.changeVolumeSuccess({ volume: user.volume })
        )
        return userActions.signInWithTokenSuccess({ user: user })
      }),
      catchError((error: Error) => {
        console.log(error.message)
        return [userActions.signInWithTokenFailure()]
      })
    )

    return res$
  })

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.signOutStart),
      exhaustMap(action => {
        return this.authService.signOut().pipe(
          pluck('data', 'signout'),
          map((result: boolean) => {
            return userActions.signOutSuccess()
          }),
          catchError(error => {
            console.log(error.message)
            return [userActions.signOutFailure()]
          })
        )
      })
    )
  })

  signUp$ = createEffect((): any => {
    const request$ = this.actions$.pipe(
      ofType(userActions.signUpStart),
      exhaustMap(action => {
        return this.authService.signUp({ ...action.user })
      })
    )

    const result$ = request$.pipe(
      pluck('data', 'signup'),
      map((result: User) => {
        return userActions.signUpSuccess({ user: result })
      }),
      catchError(error => {
        console.log(error.message)
        return [userActions.signUpFailure()]
      })
    )
    return result$
  })
}
