import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import ChooseTime from "./ChooseTime";
import CreateReservation from "./CreateReservation"
import { useNavigate } from "react-router-dom";
//import bootstrap

export default function Reservation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState(null);
    const [canRenderChooseTime, setCanRenderChooseTime] = useState(false);
    const [canRenderCreateReservation, setCanRenderCreateReservation] = useState(false);
    const [selectedDateAndTime, setSelectedDateAndTime] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [reservationNumber, setReservationNumber] = useState(null);
    const [canRouteToConfirmation, setCanRouteToConfirmation] = useState(false);

    const navigate = useNavigate();
    //Checks to see if a date is selected and number of guests are selected before  calling rendering timeslots.
    function checkTimeSlotRequirments(){
        if(!selectedDate || !numberOfGuests){
            alert('Please select a date and number of guests.');
            return;
        } 
        setCanRenderChooseTime(true)
    }

    //Checks to see if a time slot is selected and number of guests are sent with it from the TimeSlots component
    /* useEffect(() => {
        if(selectedDateAndTime && canRenderCreateReservation){
            setCanRenderCreateReservation(true)
        }
        
    },[selectedDateAndTime, selectedNumberOfGuests, selectionsChooseTimeSubmit]) */

    //Renders the time-slot window for a specific day if requirments from checkTimeSlotRequirments is met
    function renderTimeSlots(){
        if(canRenderChooseTime){
            return <ChooseTime selectedDate={selectedDate} numberOfGuests={numberOfGuests} sendDataToReservation={handleDataFromChooseTime}/>
        }
    }

    //Renders the Create reservation window if requirements from useeffect is met
    function renderCreateReservation(){
        if(canRenderCreateReservation){
            return <CreateReservation selectedDateAndTime={selectedDateAndTime} numberOfGuests={numberOfGuests} sendDataToReservation={handleDataFromCreateReservation}/>
        }
    }

    function routeToBookingConfirmed(){
        if(canRouteToConfirmation)
        navigate('/booking-confirmed', { state: { customerId, reservationNumber } });

    }

    //Gets the data from the choose-time component
    const handleDataFromChooseTime = (dateAndTime, guests) => {
        setSelectedDateAndTime(dateAndTime);
        setNumberOfGuests(guests);
        setCanRenderCreateReservation(true);
    };

    //Gets the data from CreateReservation component
    const handleDataFromCreateReservation = (customerId, reservationNumber) => {
        setCustomerId(customerId)
        setReservationNumber(reservationNumber)
        setCanRouteToConfirmation(true)
        alert(`${customerId}, ${reservationNumber}`)
    }
    
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
                    <button className="btn btn-info mt-3" onClick={checkTimeSlotRequirments}>
                        Show Available Time Slots
                    </button>
                </div>
                {renderTimeSlots()}
                
                {renderCreateReservation()}
                
                {routeToBookingConfirmed()}
            </div>
        </>
    )
} 


//Först välja datum
//Välja hur många 
//Visa alla lediga tider - 12-24
//show only times, not the tables,


//use-effect for numer of guests and date to skip show available times