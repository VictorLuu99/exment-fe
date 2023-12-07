# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

This project uses Typescript, Sass for styles.
It contains some basic components. Each component is a TSX file and a .scss file that is associated to the component.

## How to run on local machine

1. Create a `.env.development` file
    - Make `.env.development` file by copy from `.env.example`
2. Edit env config
    - Change API url to `http://localhost:8003` if you run API on the same machine
    - Install dependency:
    
    ```
    npm install
    ```
    
    - Run:
    
    ```
    npm start
    ```
    
    Access at: `http://localhost:3000`

## How to build production

1. Create a `.env.production` file
2. Edit env config
3. Run
    
    ```
    npm run build
    ```

## Folder Structure

Use `kebab-case` for all files and folders in this project.

```
├── src
│   ├── apis
│   ├── components
│   ├── elements
│   │   ├── button
│   │   ├── input
│   │   ├── ...
│   ├── constants
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── stores
│   ├── utils
│   ├── styles
```

* `apis`: API call functions for each feature which is store in separately file such as src/api/user.ts ...
* `components`: Contains components of app
* `elements`: Generic and reusable across the whole app (Button, Input ...)
* `constants`: Define constant variable
* `hooks`: Contains common utility hooks
* `pages`: Contain all the pages with router define by sub folder and file name
* `services`: All the common services, eg. storage, api, etc
* `stores`: Manage redux state
* `utils`: Contains util and helper function
* `styles`: All common styles (css) or theme (sass)

## Note

* With styles, use `rem` unit for defining most sizes, you can use function `pxToRem` in `styles/function` to convert pixels to the CSS unit REM

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
