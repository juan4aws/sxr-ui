# About SXRUI

This is the serverless cross region UI that displays a bare bones 
ticketing system.

# Assumptions
- Facebook never goes down.

# Requirements

- a facebook dev account.
- local environment with node, npm, angular2.

# Instructions

- API
  - execute instructions from 
  
- Cognito
  - deploy [cognito.yaml](./cfn/cognito.yaml) via CloudFormation console.
  - after deployment is finished take a look at the outputs tab. You will 
  use these ids in subsequent steps.
  
- create an S3 bucket to host your UI. (will cfn this later)

- Facebook
  - Create a facebook developer account.
  - create an application and get the application id
  - add this application id to [environment.ts](./src/environments/environment.ts)
  and replace facebookAppId (see TODO 2)
  - 

- User Interface
  - check out application code from [TODO: insert github repo]
  - update [environment.ts](./src/environments/environment.ts) 
  with ids from cfn output and facebook app id.
  - compile your app by typing ` npm run build `
  - you can now deply contents of dist folder to your s3 bucket.
  - cd into dist folder and execute ` aws s3 sync . [bucketName] `
  
  
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
- [ ] create cfn template to create static ui bucket.
- [X] fix facebook/cognito auth
- [ ] Nice to Have: protect api w/ custom authorizer using facebook.
- [ ] Facebook App ID for federation needs to be added to cognito cfn template.
- [ ] clean up unused code from cognito service



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


# Reference

#### serverless topics
- [continuous-deployment](https://aws.amazon.com/blogs/compute/continuous-deployment-for-serverless-applications/)
#### ng
- [routing and nav](https://angular.io/guide/router)
