import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DispatchDetailsPage } from './dispatch-details/dispatch-details.page';
import { DispatchPage } from './dispatch/dispatch.page';

const routes: Routes = [
  {
    path: 'dispatch',
    component: DispatchPage
  },
  {
    path: 'dispatch-details',
    component: DispatchDetailsPage
  },
  {
    path: '',
    redirectTo: '/dispatch',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
