import { useState, useEffect } from "react"
import axios from 'axios'


export default function ChooseTime({selectedDate, numberOfGuests, sendDataToReservation}){
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState([null]);

    useEffect(() => {
        if (selectedDate && numberOfGuests) {
            getTimeSlots();
        }
    }, [selectedDate, numberOfGuests]);

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

    const handleOnClick = (slot) => {
        if (slot.isAvailable) {
            setSelectedTimeSlot(slot);
            sendDataToReservation(slot.slotStart); // Send the data back to parent
        }
    };

    return (
        <div className="time-slots mt-3">
            <h3>Available Time Slots</h3>
            <div className="d-flex flex-wrap">
                {timeSlots.map((slot, index) => (
                    <button
                        key={index}
                        className={`btn ${slot.isAvailable ? 'btn-success' : 'btn-danger'} m-1`}
                        disabled={!slot.isAvailable}
                        onClick={() => slot.isAvailable && handleOnClick(slot)}
                    >
                        {new Date(slot.slotStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} - {new Date(slot.slotEnd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}
                    </button>
                ))}
            </div>
            {selectedTimeSlot && (
                <div className="mt-3">
                    <h4>Selected Time Slot:</h4>
                    <div className="border rounded hover-none">
                        {new Date(selectedTimeSlot.slotStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} - {new Date(selectedTimeSlot.slotEnd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}
                    </div>
                </div>
            )}
        </div>
    )
}