import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const[numOfEvents, setNumOfEvents] = useState('32');

    const handleInputChanged = (event)=>{
        const value = event.target.value;
        setNumOfEvents(value)


        let infoText;
        if (isNaN(value) || value <= 0) {
          infoText = "Only positive numbers are allowed"
        } else {
          infoText = "";
          setCurrentNOE(value);
        }
        setErrorAlert(infoText);
    }

    return (
        <div id="no-of-events">
            <label className="label"> No. of events: </label>
            <input 
            type= "text"
            value={numOfEvents}
            onChange={handleInputChanged}
            />
        </div>
    )
}
export default NumberOfEvents;

    