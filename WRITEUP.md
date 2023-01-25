This project is a simple app to list cities by the number of restaurants with a specified accommodation.

## Setup

```bash
# get mongodb docker container
docker run -d -p 27017:27017 --name example-mongo mongo:latest

# install node modules
yarn install
cd client && yarn install

# run start from the project root
yarn start
```

Note: I wanted to use mongodb-memory-server, however, I found there to be an incompatibility issue with the ubuntu version running in WSL (Windows Subsystem for Linux) as I'm currently working on a Windows PC.  So after some considerable debugging and discovery, I opted for the docker route.

## App usage

On the first run of the application, the database will be empty so you will need to press the "Sync" button on the home screen.  This will send a request to the web server query the yelp api for various cities and store the counts in the database.  Each subsequent visit to the app will load the data from the db.  Hitting Sync again will process the data from the yelp api again, however, I don't expect these numbers to change often.

The documents are stored in the following format:
```TypeScript
interface ILocation {
  name: string;
  attributes: string[];
  count: number;
}
```

Features that didn't make the cut due to time:

* allow user to add a city
* allow user to search other attributes
