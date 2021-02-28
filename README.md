## State-management in React with Context and Hooks

### Get started

```
yarn && yarn start
```

This project uses a JSON-based API, using [My JSON Server](https://my-json-server.typicode.com/), which uses the file `db.json` to create a REST API. You can use GET, POST, PUT, PATCH and DELETE. But keep in mind that changes aren't persisted between calls.

### Libraries used

- [React Router 5](https://reactrouter.com/web/guides/quick-start)

### Excercises

1. Try running this application, what do you see? To display data on this page (`/`), you need to request the data from the API and put it in a local state object e.g. with `useState`.

Hint: the hotel information is available on [https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels](https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels).

2. Now the application is displaying a list of hotels, when you click on one of the hotels you'll navigate to a detail page. You need to fetch the data from an individual hotel on this page by adding one or multiple `useState` Hooks to `Detail.js`.

Hint: Use the `match` object from React Router to get the hotel id from the url.

3. Also, get the reviews for this hotel from the REST API. You can render these inside the `ReviewWrapper` component, and use the already exisiting `ReviewItem` component to display them.

Hint: Have a look at the `db.json` file to find all endpoints for the REST API.

4. Create a new file called `HotelsContextProvider.js` and instead of adding the data for a hotel to a local state object in `Hotels.js`, put it in a `Context` object. Consume the `Context` for the hotels in `Hotels.js`. You can consume this same `Context` in `Detail.js`, so that you only need to make the request to get the hotel data once when navigation between different pages.

Hint: Where should you import this file to be able to access it from both the `Hotels.js` and `Detail.js` file?

5. The logic for the reviews can also be added to the `Context` for the hotels data, make the changes to also consume this information from `Detail.js`. Keep in mind that you only want to request the reviews for the hotel detail page that you currently have open.









Finally, you can use a POST request to submit a new review for any of the hotels. To do so, add the logic for this using an `useState` Hook in the file `Form.js`.
    `
