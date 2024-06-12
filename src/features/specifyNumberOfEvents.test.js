import { render, waitFor, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('By default, 32 events are shown', ({ given, when, then }) => {
        given('the user has not specified number of events', () => {

        });

        let AppComponent;
        when('the user is viewing a list of events', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();

        });

        then('the user should see 32 events', async()=> {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });
    });

    test('User specifies the number of events to display', ({ given, when, then }) => {
        let AppComponent;
        given('the user has specified the number of events', async() => {
            const user = userEvent.setup();
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const NumberOfEventsDOM = AppDOM.querySelector('#no-of-events');
            const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
            await user.type(numberOfEventsInput, '{backspace}{backspace}10');

        });

        when('the user sees the event list', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();

        });

        then('the user should see the specified number of events', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
            expect(allRenderedEventItems.length).toEqual(10);
        });
    });
});