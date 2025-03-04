# top-listing-automation

## Pre-requisites

- Chrome as the default browser
- Node v18 to build

## Commands

#### To start

Run the following in your console:

```
npm install

```

#### To run the application

Run the following in your console and populate the parameters when asked.

```
npm run start
```

- `SEARCH_TERM`: The search term to be used (Case sensitive).
- `POSITION`: The position of the "Buy Now" button (1, 2, or 3).
- `MONTH`: The target month for the date (e.g., `3` for March).
- `DAY`: The target day for the date (e.g., `3`).
- `HOUR`: The target hour for the time in 24-hour format (e.g., `17` for 5 PM).
- `MINUTE`: The target minute for the time (e.g., `51`).

This will run the script with `Morning` as the search term, position `1`, and target date and time set to March 3, 2025, at 5:51 PM.

#### To build the application

`cd` into the `dist` directory and then run the following in your console:

```
npm run build
```

After building, you get a `main.js` file. Run the following command to execute the built application.

```
node main.js
```

#### To compile the application into an executable

`cd` into the `dist` directory

```
pkg main.js
```
