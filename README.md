[![CircleCI](https://circleci.com/gh/bradtaniguchi/ng-flare/tree/master.svg?style=svg)](https://circleci.com/gh/bradtaniguchi/ng-flare/tree/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# NgFlare

## Developing locally

To develop locally you need to configure a firestore database via firebase from [here](https://firebase.google.com/). With this, you need to provide the following environment variables from the firebase settings in a `.env` file locally:

```
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MSG_SENDER_ID
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
