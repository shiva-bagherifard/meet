# Meet App


## Project description
A serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique.


## The API the project uses
The application uses the Google Calendar API to fetch upcoming events.


## Serverless Functions
This app uses serverless functions for authorizing access to public calendar events from the Google Calendar API. The user enters a key and secret to ask for an access token from the authorization server. The server informs the user with a consent screen. When the user agrees by logging into their Google account and giving consent, the app can fetch and show the calendar events.


## Key Features:


### Filter Events by City.
As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.


SCENARIO 1: When user hasn’t searched for a specific city, show upcoming events from all cities.
* **When** the user opens the app;
* **Then** the user should see a list of upcoming events.


SCENARIO 2: User should see a list of suggestions when they search for a city.
* **Given** the main page is open;
* **When** user starts typing in the city textbox;
* **Then** the user should receive a list of cities (suggestions) that match what they’ve typed.


SCENARIO 3: User can select a city from the suggested list.
* **Given** user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
* **When** the user selects a city (e.g., “Berlin, Germany”) from the list;
* **Then** their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.


### Show/Hide Event Details.
As a user, I should be able to show and hide event details, so that that I can get more details on an event only when needed.


SCENARIO 1: When the details of an event are hidden by default.
* **Given** the main page is open;
* **When** the app displays a list of event;
* **Then** the event details are hidden by default.


SCENARIO 2: User slicks to show event details
* **Given** there is an event with hidden details;
* **When** the user clicks on the event to show details;
* **Then** the app should display the details of the event.


SCENARIO 3: User clicks to hide event details 
* **Given** there is an event with displayed details;
* **When** the user clicks on the event to hide details again;
* **Then** the app should hide the details of the event.

### Specify Number of Events.
As a user, I should be able to specify the number of events displayed, so that I can decide how many I want to see at once.


SCENARIO 1: When the user hasn’t specified a number, 32 events are shown by default. 
* **Given** a user has not specified the number of events;
* **When** the user views the events section;
* **Then** 32 events are shown by default.


SCENARIO 2: When the user specifies the number of events.
* **Given** a user has specified the number of events;
* **When** the user views the events section;
* **Then** the app displays exactly as many events as the user specified.


### Use the App When Offline.
As a user, I should be able to use the application when I am offline, so that so I can use the app even when I don’t have an internet connection.


SCENARIO 1: User uses the app when offline
* **Given** the user is offline;
* **When** the user interacts with the app;
* **Then** the app should provide offline functionality.


SCENARIO 2: User downloads information for offline usage
* **Given** the user is online;
* **When** the user chooses to download information for offline usage;
* **Then** the app should download and store the necessary data.


### Add an App Shortcut to the Home Screen.
As a user, I should be able to add shortcut for the app to my home screen, so that so I can easily navigate to the app whenever I open my browser.


SCENARIO 1: User adds app shortcut to home screen
* **Given** the app is installed on the user's device;
* **When** the user adds an app shortcut to the home screen;
* **Then** the app shortcut should be visible on the home screen.


### Display Charts Visualizing Event Details.
As a user, I should be able to see charts visualizing event details, so that I can quickly see what kind of events there are and where.


SCENARIO 1: User clicks to see chart of events
* **Given** the user is on the home screen;
* **When** the user clicks to see a chart of the events;
* **Then** the app should display a chart visualizing event details.