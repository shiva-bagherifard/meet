import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

// jest workers
jest.setTimeout(90000);

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  // Scenario 1
  test("When the user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    given("a user has not specified the number of events", () => {
      // No action required in this step
    });

    let AppComponent;
    when("the user views the events section", () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    then(/^(\d+) events are shown by default$/, async (arg0) => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  // Scenario 2
  test("When the user specifies the number of events.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("a user has specified the number of events", async () => {
      const user = userEvent.setup();
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      // Wait for the element to be rendered asynchronously
      await waitFor(() => {
        const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");

        // Verify if NumberOfEventsDOM exists before querying
        if (NumberOfEventsDOM) {
          const numberOfEventsInput =
            within(NumberOfEventsDOM).queryByRole("textbox");
          user.type(numberOfEventsInput, "10");
        } else {
          // Handle the case when the element is not found
          throw new Error(
            "Element with id #number-of-events not found in the DOM."
          );
        }
      });
    });

    when("the user views the events section", () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    then(
      "the app displays exactly as many events as the user specified",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems =
          within(EventListDOM).queryAllByRole("listitem");
        expect(allRenderedEventItems.length).toEqual(10);
      }
    );
  });
});
