import { useState } from "react";
import axios from "axios";

export default function CreateReservation({selectedDateAndTime, numberOfGuests, sendDataToReservation}){
    const timeFrom = selectedDateAndTime.slotStart;
    const [partySize, setPartySize] = useState(numberOfGuests);
    const [name, setName] = useState('');
    const [phoneNr, setPhoneNr] = useState();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            //Create customer and get CustomerId
            const customer = {
                phoneNr,
                name
            }
            const customerResponse = await axios.post('https://localhost:7190/api/customer/createCustomer', customer)
            //Create reservation using CustomerId
            const reservation = {
                partySize: partySize,
                customerId: customerResponse.data,
                timeFrom: timeFrom
            }
            const reservationResponse = await axios.post('https://localhost:7190/api/reservation/createRes', reservation)

            console.log(customerResponse.data)
            console.log(reservationResponse.data)
            sendDataToReservation(customerResponse.data, reservationResponse.data)

        } catch(error) {
            console.error(error)
            alert("Issue creating customer or reservation")
        }
    }





    return(
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <label htmlFor='timeFrom'>Selected Time and date: </label>
                    <input 
                    id='timeFrom'
                    type='text' 
                    required
                    readOnly
                    value={timeFrom}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor='partySize'>Party size: </label>
                    <input 
                    id='partySize'
                    type='number' 
                    required
                    readOnly
                    value={partySize}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor='name'>Booking Name: </label>
                    <input 
                    id='name'
                    type='text' 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor='phoneNr'>Phone number: </label>
                    <input 
                    id='phoneNr'
                    type='number' 
                    required
                    value={phoneNr}
                    onChange={(e) => setPhoneNr(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Create Booking</button> 
            </form>
            
        </div>
    )
}