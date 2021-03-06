# React-DatePick
react-datepick can be used to pick a date range in react and specify a data refresh interval.
#### 
[![npm package](https://img.shields.io/badge/npm%40latest-1.1.3-blueviolet)](https://www.npmjs.com/package/@preston10/react-datepick)
[![dependencies](https://david-dm.org/iamPres/react-datepick.svg)](https://david-dm.org/iamPres/react-datepick)
[![Build Status](https://travis-ci.org/iamPres/react-datepick.svg?branch=master)](https://travis-ci.org/iamPres/react-datepick)
[![license](https://img.shields.io/badge/license-BSD--2-blue)](https://github.com/iamPres/react-datepick/blob/master/LICENSE)
#### [![Edit confident-night-iqfek](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/confident-night-iqfek?fontsize=14&hidenavigation=1&theme=dark)

## Demo
![media](https://github.com/iamPres/react-datepick/raw/master/media/demo-1.PNG)
![media](https://github.com/iamPres/react-datepick/raw/master/media/demo-2.PNG)
![media](https://github.com/iamPres/react-datepick/raw/master/media/demo-3.PNG)
![media](https://github.com/iamPres/react-datepick/raw/master/media/demo-4.PNG)

## Dependencies
 - install the [package.json](https://github.com/iamPres/react-datepick/blob/master/package.json) dependencies with npm

## Example Usage
```javascript
import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import DatePick from "../src/index.tsx";

const app = document.getElementById("app");

function reset() {
  console.log("Reset!");
}

function getData(data) {
  console.log(data);
}

ReactDOM.render(
  <DatePick
    resetFn={reset}
    getData={getData}
  />,
  app
);

```

## Building and Serving the Examples

1. Build the `react-datepick` project.  It will install all of the peer dependencies, so that it may produce a clean build.  Finally, link it into the global registry.
```sh
  $ npm link
  $ npm install
  $ npm run-script build
```

NOTE: Make sure you do `npm link` first, before you run `npm install`.  If the link to the `../../node_modules/react` fails below, then it's likely because these steps were inverted.

2. In the example directory, specify the link for the project, install the dependencies, link the duplicate `react` modules (to avoid duplicate versions), and then serve locally:
```sh
  examples/basic_example $ npm link @preston10/react-datepick
  examples/basic_example $ npm install
  examples/basic_example $ npm link ../../node_modules/react
  examples/basic_example $ npm run-script start
```

NOTE: Occasionally an error of 'Cannot read property 'match' of undefined' occurs.  If this happens, remove the `package-lock.json` and `node_modules` complete and try again.

NOTE: The sequence of link's and installs is fragile and may not work if executed out of order.

## Creating a new version in NPM

```
$ npm install && npm build && npm publish
```

## Props
- `onDateEvent(data: Date[])` (required `(data: Date[]) => void)`)
  - Called every time the user chooses a date, takes a `Date[]` object
- `onTimerEvent()` (optional `(() => void)`)
  - Called when the refresh timer resets

- `theme` (optional)
  - Takes a materialUI `createMuiTheme()` object
  ```javascript
   theme={createMuiTheme({
      palette: {
        primary: purple,
        secondary: green,
      },
    })}
    ```   
- `minimumYearValue` (optional `number`)
  - Takes a number to represent the minimum year to be chosen
  ```javascript
      maximumYearValue: {100}
   ```
- `maximumYearValue` (optional `number`)
  - Takes a number to represent the maximum year to be chosen
  ```javascript
   maximumYearValue: {2500}
   ```
- `relativeIntervals` (optional `number[]`)
  - Takes an array of relative intervals to be used in the relative date select dropdown menu
  ```javascript
   relativeIntervals: {[60000, 1000]}
    ```
   
- `quickSelectIntervals` (optional `number[]`)
  - Takes an array of relative intervals to be used in the quick select dropdown menu
  ```javascript
   quickSelectIntervals: {[-60000, 1000]}
  ```
- `localeObj` (optional `OptionalLocale`)
  - Takes any of the followng optional properties
  ```javascript
  localeObj={{ nowText: "NOW", localeString: "fr" }}
  ```
### localeObj properties
- `dateFormatter` (optional `Intl.DateTimeFormat`)
  - Takes a `Intl.DateTimeFormat` object used to format displayed dates
  ```javascript
  dateFormatter={
      new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    }
  ```
- `localeString` (optional `string`)
  - Takes a time-locale string format
  ```javascript
   localeString: "en-US"
    ```
- `relativeTerms` (optional `string[]`)
  - Takes an array of 2 relative terms to be used in the relative date select dropdown menu
  ```javascript
   relativeTerms=: {["ago", "from now"]}
    ```
- `quickSelectTerms` (optional `string[]`)
  - Takes an array of relative terms to be used in the quick select dropdown menu
  ```javascript
   quickSelectTerms: {["ago", "from now"]}
- `commonlyUsedText` (optional `number[]`)
  - Takes an array of relative intervals to be used in the quick select dropdown menu
  ```javascript
   commonlyUsedText: {[-60000, 10000]}   
- `nowText` (optional `string`)
  - Takes a string to represent the displayed "now" text
  ```javascript
   nowText: "ahora"
   ```
### Storage
- `storedRange` (optional `() => string[] | null`)
  - Takes a function that returns a `string[]` object representing the date range in milliseconds. Can be used to set date range data to preset or stored value
  ```javascript
   storedRange={(): Date[] => {
      let persistedRange = history.location.hash.substring(1).split("=")[1];
      persistedRange = persistedRange.replace(/\%22/g, '"');
      console.log(persistedRange);
      let json = JSON.parse(persistedRange);

      return [new Date(json[0]), new Date(json[1])];
    }
   ```
- `setStoredRange` (optional `Date[]`)
  - Takes a `Date[]` object
  ```javascript
      setRawRange={(): string | null => {
         let range = null;
       try {
         range = JSON.parse(
           decodeURIComponent(history.location.hash.substring(1).split("=")[1])
         );
       } catch {
         return null;
       }
       return range;
    }}

   ```
   
## Customization
 - Utilizes materialUI elements
 - Compatible with any materialUI `createMuiTheme()` object configuration
 - Add custom date formatters (11/2/2000 vs November 2, 2000)
 - Add custom menu text and preset time options
 - Fully localized
