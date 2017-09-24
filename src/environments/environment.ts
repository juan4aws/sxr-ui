// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  region: 'us-east-1',


  // TODO 1: These Ids can be retrieved by selecting the cognito cloud formation stack
  // after launch and looking at outputs section.
  cognitoIdentityPoolId: 'API_URL_FROM_UI_STACK_OUTPUT',
  cognitoUserPoolClientId: 'API_URL_FROM_UI_STACK_OUTPUT',
  cognitoUserPoolId: 'API_URL_FROM_UI_STACK_OUTPUT',

  // TODO 2: Facebook app id can be retrieved from the application you created in your facebook
  // developer account.
  // facebookAppId: '130815800866938', // prod bucket
  facebookAppId: 'ID_FROM_FACEBOOK_DEV_PORTAL', // localhost

  // TODO 3: These Ids can be retrieved by selecting the api cloud formation stack
  // after launch and looking at outputs section.
  ticketAPI: 'API_URL_FROM_API_STACK_OUTPUT'
};
