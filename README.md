# Universal Quiz Game

##### This project is about a quiz game with questions from more than 20 categories, on different levels of difficulty.
##### The API used to grab data is: ***https://opentdb.com/***.
##### Project has been built using React.JS and SASS (for now)
 
<br />


## Improvements in progress:
 * ~~Webpack with Babel for bundling and cross-browser friendly JavaScript~~ (done)
 * Improvements with SASS, mainly for responsive design and cross-browser friendly styling
 * Backend with a mongo db in which I want to store results based on player usernames
 * (Maybe) Separate branch with MaterialUI implementation
 
 
# Setup:
1) **In order to make the project run, you need to have node.js installed:**

    * Windows users:
        * please download from [here](https://nodejs.org/en/download/), and perform the installation.
    * Linux users:
        * please follow these [instructions](https://nodejs.org/en/download/package-manager/).
    * MacOS users:
        * please download from [here](https://nodejs.org/en/download/), and perform the installation.
        
    <br />

2) **Install node modules for front-end**:    
    * Change directory to ***<path_to_repo>/universal-quiz-game_react.js*** and run ```npm install``` in the terminal. This command will install all the packages featured in package.json file under dependencies and devDependencies properties.

<br />

# How to run
* Open one terminal, change directory to ***<path_to_repo>/universal-quiz-game_react.js***, and run the following command:
    ```
        npm run dev
    ```
    * This will trigger **webpack-dev-server** to start in watch mode. OPen a browser and go to ```http://localhost:3000/``` URL.

<br />

# Other commands
*   ```
        npm run build
    ```
    * This will generate a ***dist*** (distributable) folder in the root directory where the minified html, and bundled index.js file can be found.

<br />

*   ```
        npm run sass
    ```
    * This will compile the .sass files under ***src/sass*** directory into .css files, which can be found in the generated ***stylesheet*** folder under the root directory. The project related stylings can be found in ***stylesheet/framework*** folder.
    
<br />    
    
*   ```
        npm run sass:watch
    ```    
    * This command will have the same output as the ```npm run sass``` command, except that it will be triggered everytime the .sass files are modified, meaning that it will generate the new .css file right after the modified .sass file is read by the compiler.
    
<br /> 
   
# Creator
* [Sebastian Pacurar](https://github.com/sebastianpacurar)
