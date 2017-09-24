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
  - execute instructions in api project README.md
  
- UI 

- cd into cfn folder and execute the following.

```bash
aws cloudformation deploy \
--template-file web-ui-stack.yaml \
--stack-name web-ui-stack \
--capabilities CAPABILITY_IAM
```

- You will use the output of the stack to update reference ids in
  the UI config file: [environment.ts](../src/environments/environment.ts) (See TODO Comments in file)
  
- create an S3 bucket to host your UI and set it up for static website hosting. 
` aws s3 mb s3://[web_ui_bucket_name] --region us-east-1 ` 
(TODO: will cfn this later)


- Facebook
  - Create a facebook developer account.
  - create an application and save the application id
  - Configure this app with domain and site url from your bucket 
  (TODO: include images and detailed how to as this could stump users).
  - Add this facebook app id to the Cognito identity pool under authentication providers --> facebook. (TODO: cfn'ify this)

- User Interface
  - check out application code from [TODO: insert github repo]
  - update [environment.ts](./src/environments/environment.ts) with ids from 
    - web-ui-stack output
    - facebook app id from face book developer portal
    - api url from ticket-service-api stack output
  - **NOTE**: you can run the UI locally by running `npm run start`
    - this will create a local server environment, host your UI, and make 
    it available at http://localhost:4200
  - To deploy to static website bucket
    - compile your app by typing ` npm run build `
    - you can now deploy contents of dist folder to your s3 bucket.
      - cd into dist folder and execute ` aws s3 sync . [web_ui_bucket_name] --acl public-read`
  
  
# Issues to address

* Cognito API requires you specify a region. Does this imply we will 
maintain 2 code bases, one for each region?

# TODOs
- [ ] add to cfn template - create static ui bucket.
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
