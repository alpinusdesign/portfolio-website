# Portfolio website
## About
This repository contains the codebase of a web portfolio, interfacing with the REST-service https://github.com/mrql/portfolio-rest-service to add, update, remove and view
projects, occupations and educations to and from a database.

## How to setup
### Setup REST-service
Clone the REST-service using the command *git clone https://github.com/mrql/portfolio-rest-service*.
Upload the files to a web server.

### Rebuild the project in Node.js
Clone the website using the command *git clone https://github.com/mrql/portfolio-website*, to a suitable folder.
Using **Node.js**, rebuild the development enviroment in that folder through the command *npm rebuild*.

### Set up portfolio bindings
Open the file src/js/**index.js** and change the content of the constant **apiUrl** at **line 8** to the URL of the REST-service.

### Set up administration interface bindings
Open the file src/js/**admin.js** and change the contents of constant **url** at **line 8** to the URL of the REST-service.

### Generate build
Use the command *gulp* to run the default task, that performs all the neccessary tasks to produce a publishable project.
Upload this to your web server.
