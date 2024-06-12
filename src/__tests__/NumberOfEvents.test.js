import { render } from '@testing-library/react';
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from '@testing-library/user-event';
describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
  });

  test('has element with role textbox', () => {
    let textbox = NumberOfEventsComponent.queryByRole("textbox");
    expect(textbox).toBeInTheDocument();
  });
  test("render 32 events as default", () => {
    expect(NumberOfEventsComponent.queryByRole("textbox")).toHaveValue("32");
  });
  test('number of events updates accordingly when user types in "textbox"', async () => {
    const user = userEvent.setup();
    const numOfEvents = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(numOfEvents, '{backspace}{backspace}10');
    expect(numOfEvents).toHaveValue("10");
  });
});