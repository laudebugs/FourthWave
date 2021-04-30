import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { PodcastComponent } from './podcast/podcast.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'me',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'podcast/:slug',
    loadChildren: () =>
      import('./podcast/podcast.module').then(m => m.PodcastModule)
  },
  {
    path: 'discover',
    loadChildren: () =>
      import('./discover/discover.module').then(m => m.DiscoverModule)
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./your-library/your-library.module').then(
        m => m.YourLibraryModule
      )
  }
  // {
  //   path: 'signin',
  //   component: SignInComponent
  // },
  // {
  //   path: 'signup',
  //   component: SignUpComponent
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
