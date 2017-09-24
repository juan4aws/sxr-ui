import {Injectable, Inject} from '@angular/core';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';
import {environment} from '../../environments/environment';

/**
 * TODO: cleanup unused code
 */

declare var AWSCognito: any;
declare var AWS: any;

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;
}

export interface FacebookCallback {
    fbCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
    callback(): void;
    callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoService {

    public static _REGION = environment.region;

    public static _IDENTITY_POOL_ID = environment.cognitoIdentityPoolId;
    public static _USER_POOL_ID = environment.cognitoUserPoolId;
    public static _CLIENT_ID = environment.cognitoUserPoolClientId;

    public static _POOL_DATA = {
        UserPoolId: CognitoService._USER_POOL_ID,
        ClientId: CognitoService._CLIENT_ID
    };

    /**
     * When authenticating w/ user pool or face book we set currentEmailID
     * This ID is used in API requests.
     * @type {string}
     */
    public currentEmailID = '';

    public static getAwsCognito(): any {
        return AWSCognito;
    }

    getUserPool() {
        return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(CognitoService._POOL_DATA);
    }

    getCurrentUser() {

        const user = this.getUserPool().getCurrentUser();
        return user;
    }


    getCognitoIdentity(): string {
        return AWS.config.credentials.identityId;
    }

    getAccessToken(callback: Callback): void {

        if (callback == null) {
            throw('CognitoService: callback in getAccessToken is null...returning');
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoService: Can\'t set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        } else {
            callback.callbackWithParam(null);
        }
    }

    getIdToken(callback: Callback): void {
        if (callback == null) {
            throw('CognitoService: callback in getIdToken is null...returning');
        }
        if (this.getCurrentUser() != null) {

            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoService: Can\'t set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    } else {
                        console.log('CognitoService: Got the id token, but the session isn\'t valid');
                    }
                }
            });

        } else {
            callback.callbackWithParam(null);
        }
    }

    getRefreshToken(callback: Callback): void {
        if (callback == null) {
            throw('CognitoService: callback in getRefreshToken is null...returning');
        }
        if (this.getCurrentUser() != null) {

            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoService: Can\'t set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });

        } else {
            callback.callbackWithParam(null);
        }
    }

    refresh(): void {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log('CognitoService: Can\'t set the credentials:' + err);
            } else {
                if (session.isValid()) {
                    console.log('CognitoService: refreshed successfully');
                } else {
                    console.log('CognitoService: refreshed but session is still not valid');
                }
            }
        });
    }
}

@Injectable()
export class CognitoRegistrationService {

    constructor(@Inject(CognitoService) public cognitoService: CognitoService) {

    }

    register(user: any, callback: CognitoCallback): void {

        console.log('CognitoRegistrationService: user is ' + user);

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };

        const dataNickname = {
            Name: 'nickname',
            Value: user.name
        };

        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

        this.cognitoService.getUserPool().signUp(user.name, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {

                console.log('CognitoRegistrationService: registered user is ' + JSON.stringify(result));

                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

}

@Injectable()
export class CognitoLoginService {

    public static _FACEBOOK_APP_ID = environment.facebookAppId;

    constructor(public cognitoService: CognitoService,
                private fb: FacebookService) {

        const initParams: InitParams = {
            appId: CognitoLoginService._FACEBOOK_APP_ID,
            xfbml: true,
            version: 'v2.8'
        };

        fb.init(initParams);
    }

    authenticate(username: string, password: string, callback: CognitoCallback) {

        console.log('CognitoLoginService: starting the authentication');

        // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
        AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

        const authenticationData = {
            Username: username,
            Password: password,
        };

        const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        console.log('CognitoLoginService: Params set...Authenticating the user');

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        console.log('CognitoLoginService: config is ' + AWS.config);

        const that = this;

        cognitoUser.authenticateUser(authenticationDetails, {

            onSuccess: function (result) {

                const idToken = result.getIdToken().getJwtToken().split('.')[1];

                const decoded = JSON.parse((atob(idToken)));

                const logins = {};

                that.cognitoService.currentEmailID = decoded.email;

                logins['cognito-idp.' + CognitoService._REGION + '.amazonaws.com/' + CognitoService._USER_POOL_ID]
                    = result.getIdToken().getJwtToken();

                // Add the User's Id Token to the Cognito credentials login map.
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: CognitoService._IDENTITY_POOL_ID,
                    Logins: logins
                });

                console.log('CognitoLoginService: set the AWS credentials - ' + JSON.stringify(AWS.config.credentials));

                console.log('CognitoLoginService: set the AWSCognito credentials - ' + JSON.stringify(AWSCognito.config.credentials));

                AWS.config.credentials.get(function (err) {
                    if (!err) {
                        callback.cognitoCallback(null, result);
                    } else {
                        callback.cognitoCallback(err.message, null);
                    }
                });

                localStorage.setItem('isLoggedin', 'true');

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
                localStorage.removeItem('isLoggedin');
            },
        });
    }

    /**
     * http://docs.aws.amazon.com/cognito/latest/developerguide/facebook.html
     * @param {FacebookCallback} callback
     */
    authenticateWithFacebook(callback: FacebookCallback) {

        // login with options
        const options: LoginOptions = {
            scope: 'email',
            return_scopes: true,
            enable_profile_selector: true
        };

        const that = this;

        this.fb.login(options)
            .then((response: LoginResponse) => {

                // Add the Facebook access token to the Cognito credentials login map.
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: CognitoService._IDENTITY_POOL_ID,
                    Logins: {
                        'graph.facebook.com': response.authResponse.accessToken
                    }
                });

                localStorage.setItem('isLoggedin', 'true');

                this.fb.api('/me', 'get', {fields: 'name, email'})
                    .then(res => {
                        console.log(res);
                        that.cognitoService.currentEmailID = res.email;
                    })
                    .catch(e => {
                        console.log(e)
                    });

                AWS.config.credentials.get(function (err) {
                    if (!err) {
                        callback.fbCallback(null, response);
                    } else {
                        callback.fbCallback(err.message, null);
                    }
                });


            })
            .catch((error: any) => {
                console.error(error);
                callback.fbCallback(error, null);
            });
    }

    forgotPassword(username: string, callback: CognitoCallback) {
        const userData = {
            Username: username,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function (result) {

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
        const userData = {
            Username: email,
            Pool: this.cognitoService.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function (result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    logout() {

        console.log('CognitoLoginService: Logging out');

        localStorage.removeItem('isLoggedin');
        this.cognitoService.currentEmailID = '';

        if (this.cognitoService.getCurrentUser()) {
            this.cognitoService.getCurrentUser().signOut();
        }

        // AWS.config.credentials.clearCachedId();
        AWS.config.credentials = null;
    }

    isAuthenticated(callback: LoggedInCallback) {

        if (callback == null) {
            throw('CognitoLoginService: Callback in isAuthenticated() cannot be null');
        }

        const cognitoUser = this.cognitoService.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log('CognitoLoginService: Couldn\'t get the session: ' + err, err.stack);
                    callback.isLoggedIn(err, false);
                } else {
                    console.log('CognitoLoginService: Is session valid? ' + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log('CognitoLoginService: Can\'t retrieve the current user');
            callback.isLoggedIn('Can\'t retrieve the CurrentUser', false);
        }
    }

}

@Injectable()
export class UserParametersService {

    constructor(public cognitoService: CognitoService) {
    }

    getParameters(callback: Callback) {
        const cognitoUser = this.cognitoService.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err)
                    console.log('UserParametersService: Couldn\'t retrieve the user');
                else {
                    cognitoUser.getUserAttributes(function (err, result) {
                        if (err) {
                            console.log('UserParametersService: in getParameters: ' + err);
                        } else {
                            callback.callbackWithParam(result);
                        }
                    });
                }

            });
        } else {
            callback.callbackWithParam(null);
        }


    }
}
