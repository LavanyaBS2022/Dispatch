import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SidenavPage } from './shared/sidenav/sidenav.page';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'',
    component:SidenavPage,
    children:[
      { path: 'dispatch-details', loadChildren: () => import('../app/dispatch-details/dispatch-details.module').then(m => m.DispatchDetailsPageModule) },
      { path: 'dispatch', loadChildren: () => import('../app/dispatch/dispatch.module').then(m => m.DispatchPageModule) },
      ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'sidenav',
    loadChildren: () => import('./shared/sidenav/sidenav.module').then( m => m.SidenavPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-pwd',
    loadChildren: () => import('./forgot-pwd/forgot-pwd.module').then( m => m.ForgotPwdPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }
];

@NgModule({ 
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
