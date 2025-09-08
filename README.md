# Skillwatch application

### To run this project:

#### Make sure your node version is 14 or higher

#### Follow the steps

1. Run `yarn` (if yarn is not installed, first run `npm i -g yarn`)(first time step)
2. Create `.env` file and add the environment variables
3. Run `yarn watch` to start dev server

Make sure your server is running on `http://localhost:8080`, or social logins will not work.

#### Commands to run test cases:

* Run `yarn test:jest` to run all test cases.
* Run `yarn test:jest -u` to run all test cases and update snapshots.
* Run `yarn test:jest filename.test` to run specific test case and `yarn test:jest -u filename.test` to update snapshots.

