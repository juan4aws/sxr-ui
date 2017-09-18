import {Component, OnInit} from '@angular/core';
import {CognitoLoginService, CognitoService, LoggedInCallback} from './services/cognito.service';
import {AWSService} from './services/aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, LoggedInCallback {

  constructor(public awsService: AWSService,
              public cognitoLoginService: CognitoLoginService,
              public cognitoService: CognitoService) {
  }

  ngOnInit() {
    console.log('AppComponent: Checking if the user is already authenticated');
    this.cognitoLoginService.isAuthenticated(this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {

    console.log('AppComponent: the user is authenticated: ' + isLoggedIn);

    const myThis = this;

    this.cognitoService.getIdToken({
      callback() {
        console.log('??');
      },
      callbackWithParam(token: any) {
        // Include the passed-in callback here as well so that it's executed downstream
        console.log('AppComponent: calling initAwsService in callback');
        myThis.awsService.initAWSService(null, isLoggedIn, token);

      }
    });
  }

}
