import { useState, useEffect } from "react"
import axios from 'axios'
import { isEmptyObject } from "jquery";


export default function ChooseTime({selectedDate, numberOfGuests, sendDataToReservation}){
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    //Checks if you number of guests and date is chosen, and updates if another date or nr of guests is chosen
    useEffect(() => {
        if (selectedDate && numberOfGuests) {
            getTimeSlots();
        }
    }, [selectedDate, numberOfGuests]);

    //Gets the avialable time-slots for a specific day
    async function getTimeSlots(){
        try {
            const response = await axios.get(`https://localhost:7190/api/Table/availableTables`, {
                params: {
                    date: selectedDate.toISOString(),
                    partySize: numberOfGuests
                }
            });
            setTimeSlots(response.data);
        } catch (error) {
            console.error("Error fetching time slots:", error);
        }
    }

    /* //Checks if a timeslot is chosen before allowing parent to render CreateReservation
    useEffect(() => {
        if(selectedTimeSlot){
            setCanRenderCreateReservation(true)
        }
    }, [selectedTimeSlot]); */

    //Sends the data back to parent if a time-slot is chosen
    function handleCreateResButtonOnClick(){
        if(selectedTimeSlot){
            sendDataToReservation(selectedTimeSlot, numberOfGuests); // Send the data back to parent
        } else {
            alert("choose a timeslot!")
        }
    }

    //Sets the time-slot 
    //Maybe skip and just do select on the button instant
    const handleSlotSelectionButtonOnClick = (slot) => {
        if (slot.isAvailable) {
            setSelectedTimeSlot(slot);
        }
    };

    return (
        <div className="time-slots mt-3">
            <h3>Available Time Slots</h3>
            <div className="d-flex flex-wrap">
                {timeSlots.map((slot, index) => (
                    <div>
                        <button
                        key={index}
                        className={`btn ${slot.isAvailable ? 'btn-success' : 'btn-danger'} m-1`}
                        disabled={!slot.isAvailable}
                        onClick={() => slot.isAvailable && handleSlotSelectionButtonOnClick(slot)}
                    >
                            {new Date(slot.slotStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} - {new Date(slot.slotEnd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}
                        </button>
                        
                    </div>
                ))}
            </div>
            {selectedTimeSlot && (
                <div className="mt-3">
                    <h4>Selected Time Slot:</h4>
                    <div className="border rounded hover-none">
                        {new Date(selectedTimeSlot.slotStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} - {new Date(selectedTimeSlot.slotEnd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}
                    </div>
                </div>)}
            
                <div>
                    <button className="btn btn-info mt-3" onClick={handleCreateResButtonOnClick}>
                        Create Reservation
                    </button>
                </div>
        </div>

        
    )
}


//TILL ALEX IMORGON
//Skapa create RES component, ändra så man inte behöver bord-nummer i API, måste skapa en Customer, ta emot ID, spara och skicka med till create