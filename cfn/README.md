# About
This yaml file is used to create the necessary cognito 
resources, e.g. user pool, identity pool, etc.

You will use the output of the executed template to update reference ids in
the UI code: [environment.ts](../src/environments/environment.ts) (See TODO Comments)


# Useful Commands

aws cloudformation validate-template --template-body file://cognito.yaml

