import {NgModule} from '@angular/core';
import {ViewsComponent} from './views.component';
import {ViewsRoutingModule} from './views-routing.module';
import {TicketComponent} from './ticket/ticket.component';
import {CognitoToolsComponent} from './cognito-tools/cognito-tools.component';
import { HomeComponent } from './home/home.component';
import {TicketListComponent} from '../components/ticket-list/ticket-list.component';
import {FormsModule} from '@angular/forms';
import {TicketDetailComponent} from '../components/ticket-detail/ticket-detail.component';

@NgModule({
  imports: [
    ViewsRoutingModule,
    FormsModule
  ],
  declarations: [
    ViewsComponent,
    TicketComponent,
    HomeComponent,
    CognitoToolsComponent,
    HomeComponent,
    TicketListComponent,
    TicketDetailComponent
  ]
})
export class ViewsModule { }
