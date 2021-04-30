import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { Material } from '../../libs/material/material.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { StoreModule } from '@ngrx/store'
import { userReducer } from './store/reducers/user.reducer'
import { MeComponent } from './me/me.component'
import { USER_STATE_NAME } from './store/selectors/user.selector'
import { EffectsModule } from '@ngrx/effects'
import { UserEffects } from './store/effects/user.effects'
// import { reducers } from './store'

const routes: Routes = [
  {
    path: '',
    component: MeComponent
  },

  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent }
]

@NgModule({
  declarations: [SignInComponent, SignUpComponent, MeComponent],
  imports: [
    CommonModule,
    Material,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(USER_STATE_NAME, userReducer)
  ],
  exports: [RouterModule]
})
export class UserModule {}