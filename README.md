# top-listing-automation

## Commands

#### To start

Run the following in your console:

```
npm install

```

#### To run the application

Run the following in your console, but replace `SEARCH_TERM` with the desired search term (_Case sensitive_), the desired position for that search term (`1` for first place, `2` for second place, and `3` for third place), and the target date and time (year, month, day, hour, minute):

```
npm run start SEARCH_TERM POSITION YEAR MONTH DAY HOUR MINUTE
```

- `SEARCH_TERM`: The search term to be used (Case sensitive).
- `POSITION`: The position of the "Buy Now" button (1, 2, or 3).
- `YEAR`: The target year for the date (e.g., `2025`).
- `MONTH`: The target month for the date (e.g., `3` for March).
- `DAY`: The target day for the date (e.g., `3`).
- `HOUR`: The target hour for the time in 24-hour format (e.g., `17` for 5 PM).
- `MINUTE`: The target minute for the time (e.g., `51`).

Example:

```
npm run start Morning 1 2025 3 3 17 51
```

This will run the script with `Morning` as the search term, position `1`, and target date and time set to March 3, 2025, at 5:51 PM.

#### To build the application

Run the following in your console:

```
npm run build
```

After building, you get a `main.js` file. Run the following command to execute the built application, but replace `SEARCH_TERM` with the desired search term (_Case sensitive_), the desired position, and the target date and time parameters:

```
node main.js SEARCH_TERM POSITION YEAR MONTH DAY HOUR MINUTE
```

## Procedure

1. Open the Top Listing link.
2. Check if authentication is required:
   - a. If yes, wait until the Top Listing page shows up.
   - b. If no, wait until the Top Listing page shows.
3. Click on the Search Terms dropdown.
4. Select the desired Search Term.
5. Click the "Check Eligibility" button.
6. Wait until the Searched Term shows up in the table.
7. Refresh the page a few seconds before the specified target time.
8. Click the "Buy Now" button for the selected position when it appears.
9. Accept the Terms and Conditions if necessary.
