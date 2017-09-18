// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    region: 'us-east-1',


  // TODO 1: These Ids can be retrieved by selecting the cognito cloud formation stack
  // after launch and looking at outputs section.
  identityPoolId: 'us-east-1:2843f769-8b5c-4d6f-b2f1-4e947d6a0c0c',
  userPoolId: 'us-east-1_gspu2ARdD',
  clientId: '67el23b7bkiq8o8nb3letgu9d9',

  // TODO 2: Facebook app id can be retrieved from the application you created in your facebook
  // developer account.
  facebookAppId: '263106057531801',

  // TODO 3: These Ids can be retrieved by selecting the api cloud formation stack
  // after launch and looking at outputs section.
  wildRydesAPI: 'https://uo2ya3s1i0.execute-api.us-east-1.amazonaws.com/Prod/'

};
