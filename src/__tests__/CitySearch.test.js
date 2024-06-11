import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;

  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch allLocations={[]} setInfoAlert={() => {}} />
    );
  });

  test('suggestion list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a suggestionList when city box is clicked', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');

    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestion');
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('updates suggestionList correctly when user types in textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setInfoAlert={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const suggestions = allLocations.filter((location) => 
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  });

  test('renders suggestion text in the textbox after clicking suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} setInfoAlert={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const BerlinSuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinSuggestion);

    expect(cityTextBox).toHaveValue(BerlinSuggestion.textContent);
  });
});

describe('<CitySearch/>, integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
