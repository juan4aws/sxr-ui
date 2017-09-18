import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ViewsComponent} from './views.component';
import {TicketComponent} from './ticket/ticket.component';
import {CognitoToolsComponent} from './cognito-tools/cognito-tools.component';
import {HomeComponent} from './home/home.component';

const viewsRoutes: Routes = [
  {
    path: '', component: ViewsComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'ticket', component: TicketComponent
      },
      {
        path: 'cognito', component: CognitoToolsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(viewsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ViewsRoutingModule { }
