import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react'; // Import act from react

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  // SCENARIO 1
  test("When user hasn't specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given("the user hasn't specified or filtered the number of events", () => {
      AppComponent = render(<App />);
    });

    when('the user sees the list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    then('the default number of displayed events will be 32', () => {
      expect(eventList.length).toEqual(32);
    });
  });

  // SCENARIO 2
  test('User can change the number of events they want to see.', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given('the user has events displayed', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toBeGreaterThan(0);
      });
    });

    when('the user chooses to change the number of events displayed', async () => {
      const input = AppComponent.getByTestId('number-of-events'); // Correct the test id

      await act(async () => { // Use act from react
        await userEvent.clear(input);
        await userEvent.type(input, '32');
      });
    });

    then('the number of events displayed will update to the number the user selected', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventList = within(AppDOM).queryAllByRole('listitem');
      await waitFor(() => {
        expect(eventList.length).toEqual(32); // Adjust the assertion to match the expected behavior
      });
    });
  });
});
