import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import ChooseTime from "./ChooseTime";
import CreateReservation from "./CreateReservation"
//import bootstrap

export default function Reservation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState(null);
    const [canRenderChooseTime, setCanRenderChooseTime] = useState(false);
    const [selectedDateAndTime, setSelectedDateAndTime] = useState(null);

    //Checks to see if a date is selected and number of guests are selected before  calling rendering timeslots.
    function checkRequirments(){
        if(!selectedDate || !numberOfGuests){
            alert('Please select a date and number of guests.');
            return;
        } 
        setCanRenderChooseTime(true)
    }

    //Renders the time-slot window for a specific day if checkRequirments is met
    function renderTimeSlots(){
        if(canRenderChooseTime){
            return <ChooseTime selectedDate={selectedDate} numberOfGuests={numberOfGuests} sendDataToReservation={handleDataFromChooseTime}/>
        }
    }

    function renderCreateReservation(){
        if(selectedDateAndTime !== null){
            return <CreateReservation />
        }
    }

    //Gets the chosen date from the choose-time component
    const handleDataFromChooseTime = (dateAndTime) => {
        setSelectedDateAndTime(dateAndTime);
    };

    return (
        <>
            <h1>Create booking:</h1>
            <div className="booking-system border border-info rounded p-5">
                <h3>Select a Date</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    minDate={new Date()} // Disable past dates
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Choose a date"
                />
            
                <p className="mt-2 mr-2">How many guests?</p>
                <div>
                    <input 
                        type="number" 
                        min={1}
                        max={8}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                        required/>
                </div>
                <div>
                    <button className="btn btn-info mt-3" onClick={checkRequirments}>
                        Show Available Time Slots
                    </button>
                </div>
                <p>{selectedDateAndTime}</p>
                {renderTimeSlots()}
                {renderCreateReservation()}
            </div>
        </>
    )
} 


//Först välja datum
//Välja hur många 
//Visa alla lediga tider - 12-24
//show only times, not the tables,