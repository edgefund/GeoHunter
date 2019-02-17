# ETHdenver Project: GeoHunter
_This app was developed for the ETHdenver hackathon, February 2019._

_Authors: Bryce Doganer, Andy Watt, Gareth Oates, Colin McCrae, Lucas Henning_


## Project Specs
### Repo Location
[The final project is stored here on GitHub](https://github.com/edgefund/GeoHunter "GitHub - ETHdenver Project: GeoHunter")



## How to Set Up for Evaluation
### Pre-requisites
 It is presumed that the evaluator has the following applications already installed:

+ Git
+ Node Package Manager (Node v11.9.0, Npm v6.5.0)
+ Truffle v5.0.4 (core: 5.0.4)
+ Solidity v0.5.0 (solc-js)
+ Ganache or Ganache-CLI (v6.3.0 (ganache-core: 2.4.0)
+ Google Chrome with Metamask Plug-in installed
+ A code editor (e.g. VS Code or Atom)

### Steps
The following steps will allow the project to be evaluated. The terminal commands are based on using Ubuntu Linux.

1. Navigate your development folder and clone the project repo from Github. The command below will create a folder 'project' in your chosen development folder. 

   $ `git clone https://github.com/edgefund/GeoHunter`
   
2. Go into the new folder 

   $ `cd project`

3. Install the npm modules

   $ `npm install`

4. To view in a code editor 

   $ `code .` for VS Code or `atom .` for Atom

5. To compile the app code

   $ `truffle compile`

6. Ensure that you are running Ganache (or Ganache-CLI) on Port 8545 (HTTP://127.0.0.1:8545)

7. To migrate the contacts to the Ganache local blockchain

   $ `truffle migrate` (if you need to migrate the contract again, you will  need to use `truffle migrate --reset`)

8. To run the app code tests

   $ `truffle test`

9. Run the app's JavaScript React development server locally to bring up the app UI. These commands should automoatically open your default browser

   $ `cd app`

   $ `npm install`
   
   $ `npm run start`

11. You should now be able to use the app's UI. 

Contract actions will appear in the developer console log in Google Chrome. Press Ctrl + Shift + I to view these. Ctrl+C to exit the development server in Terminal.
