# ETHdenver Project: Supply Chain App
_This app was developed for the ETHdenver hackathon, February 2019._

_Authors: Bryce Doganer, Andy Watt, Gareth Oates, Colin McCrae, Lucas Henning_


## Project Specs
### Repo Location
[The final project is stored here on GitLab](https://gitlab.com/ethdenver/project "GitLab - ETHdenver Project: Supply Chain App")


## How to Set Up for Evaluation
### Pre-requisites
 It is presumed that the evaluator has the following applications already installed:
+ Git
+ NPM (Node Package Manager)
+ Truffle
+ Ganache (or Ganache-CLI)
+ Google Chrome with Metamask Plug-in installed
+ A code editor (e.g. VS Code or Atom)

### Steps
The following steps will allow the project to be evaluated. The terminal commands are based on using Ubuntu Linux.

1. Navigate your development folder and clone the project repo from Github. The command below will create a folder 'project' in your chosen development folder. 

   $ `git clone https://gitlab.com/ethdenver/project`

2. Go into the new folder 

   $ `cd project`

3. Install the npm modules

   $ `npm install`

4. To view in a code editor 

   $ `code .` for VS Code or `atom .` for Atom

5. To compile the app code

   $ `truffle compile`

6. Ensure that you are running Ganache (or Ganache-CLI) on Port 8545 (HTTP://127.0.0.1:8545)

7. Ensure the Metamask Chrome Plug-in is connected to your Ganache (or Ganache-CLI) instance. The requires the same twelve-word seed phrase to be used for both.

8. To migrate the contacts to the Ganache local blockchain

   $ `truffle migrate` (if you need to migrate the contract again, you will  need to use `truffle migrate --reset`)

9. To run the app code tests

   $ `truffle test`

10. Run the app's JavaScript React development server locally to bring up the app UI. These commands should automoatically open your default browser (you'll need Google Chrome with Metamask Plug-in installed) and bring up the app at the local address (URL = http://localhost:3000/) where you can interact with the app. Note that it will prompt you to sign into Metamask if you are not already signed in. 

   $ `cd client`

   $ `nmp install`
   
   $ `npm run start`

11. You should now be able to use the app's UI. When approving a transaction in Metamask, if you get a nonce mismatch error that is due to Metamask being out of sync with Ganache and you will need to reset both.

Please press Ctrl + Shift + I and view the developer console in Google Chrome. All the contract actions will appear there as console log entries.

12. Ctrl+C to exit the development server in Terminal.
