# Hellena

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Notes

* Responsive ccs classes must go into src/styles.css (use mobile fist look)
* Bootstrap md size is breakpoint between mobile and web look
* icon list: https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
* image editor: https://www.fotor.com/

## TODO
* docker best practice and docker ignore
* angular.json (offical doc) see best practices and implement options
* docker image is not working on local machine problem nginx configuration root url access like search for angular

## update app version
* https://medium.com/@tolvaly.zs/how-to-version-number-angular-6-applications-4436c03a3bd3

## publish to Heroku

Steps
* heroku login
* heroku container:login
* heroku container:push web
* heroku container:release web
* heroku open

### Problem

* On Linux Cannot connect to the Docker daemon. Solution: sudo service docker start. More info [here](https://phoenixnap.com/kb/cannot-connect-to-the-docker-daemon-error)

* Heroku specific [here](https://dev.to/levelupkoodarit/deploying-containerized-nginx-to-heroku-how-hard-can-it-be-3g14)

## TODO

* https://allfront.io/blog/deploying-your-angular-app-to-the-the-google-play-store

* look https://www.picodi.com/ and https://www.picodi.com/ae/

* idjevi za shoping list i pretraživanje tablicu
* popis za kupovinu treba imati compare ( i info da li postoji jeftinije i di)

* navigation is not working
