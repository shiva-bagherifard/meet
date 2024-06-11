import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [eventNumber, setEventNumber] = useState('32');

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (isNaN(value)) {
            setErrorAlert('Value is not a number');
        } else if (value > 50) {
            setErrorAlert('Maximum value is 50');
        } else if (value <= 0) {
            setErrorAlert('Minimum value is 1');
        } else {
            setErrorAlert('');
            setEventNumber(value);
            setCurrentNOE(value);
        }
    };

    return (
        <div id="numberOfEvents">
            <label htmlFor="number-of-events">Number of Events</label>
            <input
                type="text"
                id="number-of-events"
                data-testid="number-of-events" // Correct the test id
                value={eventNumber}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default NumberOfEvents;
