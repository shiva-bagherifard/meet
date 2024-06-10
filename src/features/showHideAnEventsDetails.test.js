import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  // SCENARIO 1
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    given('the user first opens the app', () => {
      AppComponent = render(<App />);
    });

    when('the user receives the full list of events (specific for the city or all events)', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('all events will collapse by default.', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });

  // SCENARIO 2
  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppComponent;
    given('the user gets a list of events', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });
    });

    when("a user selects an event's details", async () => {
      const button = AppComponent.queryAllByText('Show Details')[0];
      await userEvent.click(button);
    });

    then('the details will show up for that chosen event', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });
  });

  // SCENARIO 3
  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppComponent;
    let button;
    given('the user sees the details of an event', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });

      button = AppComponent.queryAllByText('Show Details')[0];
      await userEvent.click(button);

      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    when("the user presses a button to hide the event's details", async () => {
      await userEvent.click(button);
    });

    then('the details of that event will be hidden', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });
});
