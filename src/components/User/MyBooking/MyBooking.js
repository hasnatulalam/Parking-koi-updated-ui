import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/Context'

const Booking = () => {
    const [state]= useContext(UserContext)
    const [userBookings, setUserBookings] = useState([])

    const getStandardTime = (time) => {
        const date = new Date(time).toLocaleString('en-US',{day:'numeric', month:'short', year:'numeric'})
        return date
    }

    useEffect(() => {
      const getUserPaymentInfos = async () => {
        const {data} = await axios.get(`http://localhost:9000/api/payment/user?id=${state?.isUser?._id}`)
        if(data){
          setUserBookings(data)
        }
      }
      state?.isUser?._id && getUserPaymentInfos()
    },[state])

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                <tr>
                    <th></th>
                    <th>Location</th>
                    <th>Slot(s)</th>
                    <th>Booking Date</th>
                    <th>Transaction ID</th>
                </tr>
                </thead>
                <tbody>
                    {
                        userBookings.map((booking, i) => 
                            <tr>
                                <th>{i + 1}</th>
                                <td>{booking?.bookingLocation}</td>
                                <td>{booking?.slots?.join(', ')}</td>
                                
                                <td>{getStandardTime(booking?.bookingDate?.startDate)} - {getStandardTime(booking?.bookingDate?.endDate)}</td>
                                <td>{booking?.trxId}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Booking;