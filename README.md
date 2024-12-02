# Server Explorer
The project was scaffolded using Vite with React-TS flavor. It uses Vitest for unit testing.


## Run locally

### Install Dependencies
>npm install

### Start the dev server
>npm run dev

### Start a test run
>npm run test

## What was implemented
- Login screen with field validations and error handling.
- Loading component for the transition after the form is submitted.
- Authentication with bearer token using the `v1/tokens` endpoint provided.
- Server Dashboard screen that retrieves and displays an array of object from `v1/servers` endpoint.
- Sorting the servers in the table by name or distance when clicking on the respective header.
- Responsive styling that was tested to mobile devices screen sizes.
- Unit tests using Vitest.
- Basic accessibility features (e.g. input field and validatio descriptions).


## What is needed to be production ready

- A secure way to persist the authentication token. Currently it is stored in a context store that is lost when the page is refreshed/navigated via the browser.
- Improvements in the design in relation to accessibility:
  - The contrast ration of some colors used in the pallete you provided don't pass the WCAG 2.2 benchmarks in particular the field titles and placeholders in the login screen and the input field borders. Also, the background color used behind the main white element in the form and server table and the logout button's border This was tested using
  WEBAIM contrast checker tool: https://webaim.org/resources/contrastchecker/.
  - Placeholders are providing label instructions that need additional programmatical handling using aria.
- Integration/UI testing
- An extended configuration of tailwind according to color palletes, sizes and design features that are most commonly used or will be used.
- Further separation of some components (e.g. separate input field component to be used in the login form)
- Design and implement a more strategic interface/type structure.
- Handling of some edge cases (e.g. empty server list, slow response times from the servers endpoint etc)
- When sorting by country, it might be a good idea to short firstly based on the alphabetical order and then on the numerical one for consistency.
- When sorting by distance, it might be a good idea to do an additional sub sort by country for servers that have equal distance value.