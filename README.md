## State-management in React with Context and Hooks

### Get started

```
yarn && yarn start
```

This project uses a JSON-based API, using [My JSON Server](https://my-json-server.typicode.com/), which uses the file `db.json` to create a REST API. You can use GET, POST, PUT, PATCH, and DELETE. But keep in mind that changes aren't persisted between calls.

### Libraries used

- [React Router 5](https://reactrouter.com/web/guides/quick-start)

### Exercises

1. Try running this application, what do you see? To display data on this page (`/`), you need to request the data from the API and put it in a local state object e.g. with `useState`.

Hint: the hotel information is available on [https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels](https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels).

2. Now the application is displaying a list of hotels, when you click on one of the hotels you'll navigate to a detail page. You need to fetch the data from an individual hotel on this page by adding one or multiple `useState` Hooks to `Detail.js`.

Hint: Use the `match` object from React Router to get the hotel id from the URL.

3. Also, get the reviews for this hotel from the REST API. You can render these inside the `ReviewWrapper` component, and use the already existingReviewItem` component to display them.

Hint: Have a look at the `db.json` file to find all endpoints for the REST API.

4. Create a new file called `HotelsContext.js` and instead of adding the data for a hotel to a local state object in `Hotels.js`, put it in a `Context` object. Consume the `Context` for the hotels in `Hotels.js`. You can consume this same `Context` in `Detail.js` so that you only need to request to get the hotel data once when navigating between different pages. 

Hint: Where should you import this file to be able to access it from both the `Hotels.js` and `Detail.js` files?

5. The logic for the reviews can also be added to the `Context` for the hotel data, make the changes to also consume this information from `Detail.js`. Keep in mind that you only want to request the reviews for the hotel detail page that you currently have open.

6. Everything we did so far is based on Hooks, so let's create a custom Hook. You can call this Hook `useHotelsContext` and use it instead of the built-in `useContext` Hook from React.

7. Split the data about the hotel reviews into a different `Context` object, in a new file called `ReviewsContext.js`. The data about the reviews can be removed from the `HotelsContextProvider` afterward.

8. As your application grows in size, it's more efficient to use the `useReducer` Hook to handle state updates than the `useState` Hook. Refactor both the `Context` for hotels and reviews to use `useReducer` instead. If you're familiar with Redux you can use a comparable pattern to handle changes in your state.

Hint: Wrap the logic to do data fetching into separate functions in the `Context` files, and move all `useEffect` Hooks to the components that request the data.

9. When clicking on a hotel, you might have seen the "Add review" button. Submitting a review on this page sends a POST request to the mock REST API. No actual data is saved as it's a mock REST API, but a success message is returned. Can you still somehow "save" the request in the `Context` for reviews? 

BONUS: Show a success message when a new review has been added.

10. Refactor the logic to retrieve the hotel for the detail page that you currently have open, so that not all hotels are being requested from the API but just the opened hotel. This is particularly useful if the user visits the detail page directly, and doesn't navigate there from the main page.

11. To give the idea of a "global `Context`" you can compose the `HotelsContextProvider` and the `ReviewsContextProvider` together. You can do this in the file `GlobalContext.js`.

Hint: Use the `children` object to make it possible to wrap a component.