import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function BookingConfirmed(){
    const location = useLocation();
    const reservationNumber = location.state?.reservationNumber;
    const customerId = location.state?.customerId
    const [customer, setCustomer] = useState(null);
    const [reservation, setReservation] = useState(null);

    async function GetCustomer(){
        try{
            const respose = await axios.get(`https://localhost:7190/api/customer/${customerId}`)
            setCustomer((await respose).data)
        } catch(error){
            console.error(error)
            alert("Could not get customer")
        }
    }

    async function GetReservation(){
        try{
            const respose = await axios.get(`https://localhost:7190/api/reservation/${reservationNumber}`)
            setReservation((await respose).data)
        } catch(error){
            console.error(error)
            alert("Could not get customer")
        }
    }

    useEffect(() =>{
        GetCustomer(),
        GetReservation()
    }, []);
    

    return(
        <div>
            <h2>Booking Confirmed</h2>
            <h3>Reservation number: {reservationNumber}</h3>
            <div >
                <ul>
                    <li>Name: {customer.name}</li>  
                    <li>Phone: {customer.phoneNr}</li>
                    <li>Party size: {reservation.partySize}</li>
                    <li>Time from: {reservation.timeFrom}</li>
                    <li>Time to: {reservation.timeTo}</li>
                </ul>
            </div>

            
            <p>Thank you for your reservation and a warm welcome to Taco Town!</p>
        </div>
    )
}