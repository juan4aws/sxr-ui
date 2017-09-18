import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AWSService} from './services/aws.service';
import {CognitoLoginService, CognitoRegistrationService, CognitoService} from './services/cognito.service';
import {WildRydesService} from './services/wildrydes.service';

import { FacebookModule } from 'ngx-facebook';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketComponent } from './views/ticket/ticket.component';
import { CognitoToolsComponent } from './views/cognito-tools/cognito-tools.component';
import { LoginComponent } from './views/login/login.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AWSService,
    CognitoService,
    CognitoRegistrationService,
    CognitoLoginService,
    WildRydesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
