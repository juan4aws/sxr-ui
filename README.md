# About SXRUI

This is the serverless cross region UI that displays a bare bones 
ticketing system.

# Assumptions
- Facebook never goes down.

# Requirements

- a facebook dev account.
- local environment with node, npm, angular2.

# Instructions

- Cognito
  - deploy [cognito.yaml](./cfn/cognito.yaml) via CloudFormation console.
  - after deployment is finished take a look at the outputs tab. You will 
  uses these ids in subsequent steps.

- Facebook
  - Create a facebook developer account.
  - create an application 

- User Interface
  - check out application code from [TODO: insert github repo]
  - update application code with cognito and facebook ids.
  - follow development instructions below to bring up your app in dev mode.
  - take face book application id from previous step and update 
    [environment.ts](./src/environments/environment.ts) (See TODO Comments)
  - 
  
# Issues to address

* Cognito API requires you specify a region. Does this imply we will 
maintain 2 code bases, one for each region?

* Facebook app id: will users create their own facebook account or 
will we have a master account for all participants?

**W/O R53 Ideas**
* will need 2 cognito and api gateway setups in 2 regions.
* client will have to be smart enough to determine which region.
  * will need to store configurations for 2 regions?
  * will need to health check region 1 and fail over to region 2?
  

# TODOs

- [ ] get api should return array even when only one item is returned
- [ ] had to manually add CORS headers for options pre flight check - need to add this to cfn.
- [ ] on insert/update/post return the object that was created/updated.
- [ ] need api to return all tickets for userid (user id will be email)
- [ ] api returning error response on no row returned - 200?
- [X] fix facebook/cognito auth
- [ ] Nice to Have: protect api w/ custom authorizer using facebook.
- [ ] Facebook federation needs to be added to cfn template.



# Development

In order to start the project locally use:
```bash

$ npm install
# install the project's dependencies

$ npm start
# watches your files and uses livereload by default run `npm start` 
# for a dev server. Navigate to `http://localhost:4200/`. 
# The app will automatically reload if you change any of the source files.

$ npm run build
# prod build, will output the production application in `dist`
# the produced code can be deployed (rsynced) to a remote server

```
