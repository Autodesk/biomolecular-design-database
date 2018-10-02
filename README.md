# Biomolecular Design Database
<br/>
The Biomolecular Design Database Project is a web application that allows users to share, search and use nucleic acid nanotechnology designs. This includes DNA Origami, RNA Origami, DNA Bricks and many other types of systems.

## Contributors and how you can contribute
<br />

We currently have a single maintainer: Joseph Schaeffer <thiryal+bdd@gmail.com>.

The primary developer for the initial version was [Rut Patel](https://github.com/rutpatel). Scientific advisors were Joseph and [Ebbe Andersen](http://bion.au.dk).

Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for how you can contribute.

## Application Stack
<br /> 
This Web Application is developed with ReactJS frontend, Node.js backend and uses PostgreSQL database.


## Usage
<br />
### Quick Start

* STEP 1: Running Server Side <br />
-> From the console (in the project directory), do `cd ./bddbserver`. The database and Node.js application can be started using `docker-compose` 
`docker-compose up`

This will start the Node.js application on port 8000 on the docker machine. 

* STEP 2: Running Client Side <br />
-> From the console (in the project directory), do `cd ./bddbclient`. The reactJS frontend can be started using `docker-compose` 
`docker-compose up`

This will start the client side application on port 3000 on the docker machine. 

For S3 stored image functionality you will need AWS credentials (access key/secret key) that have access to the S3 buckets referenced in the `src/routes/files.js` (and those buckets may need to be changed to a new name for your installation).
