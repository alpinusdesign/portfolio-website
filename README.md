# Portfolio website
## About
This repository contains the codebase of a web portfolio, interfacing with the REST-service https://github.com/mrql/portfolio-rest-service to add, update, remove and view
projects, occupations and educations to and from a database.

## How to setup
### Setup REST-service
Clone the REST-service using the command *git clone https://github.com/mrql/portfolio-rest-service*.

Set up a database in MySQL or MariaDB, and run the install-scripts in /**install.sql** to initialize the database tables.

Update the file /includes/**config.php** with the new database credentials.

Upload the files to a live web server.

### Rebuild the project in Node.js
Clone the website using the command *git clone https://github.com/mrql/portfolio-website*, to a suitable folder.
Using **Node.js**, rebuild the development enviroment in that folder through the command *npm rebuild*.

### Set up portfolio bindings
Open the file /src/js/**index.js** and change the content of the constant **apiUrl** at **line 8** to the URL of **index.php**, in the REST-services root folder.

You can setup the mail-function by changing the constant **emailUrl** to the URL of **email.php** in the REST-services root folder, although it is currently non-functional.

### Set up administration interface bindings
Open the file /src/js/**admin.js** and change the contents of constant **url** at **line 8** to the URL of the REST-service.

### Generate build
Use the command *gulp* to run the default task, that performs all the neccessary tasks to produce a publishable project.

Upload the contents of the resulting **/pub**-folder to your web server.
