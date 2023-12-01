import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispatchDetailsPage } from './dispatch-details.page';

const routes: Routes = [
  {
    path: '',
    component: DispatchDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispatchDetailsPageRoutingModule {}
