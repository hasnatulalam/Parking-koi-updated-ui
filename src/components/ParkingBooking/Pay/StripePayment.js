import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { UserContext } from '../../context/Context'
import './StripePayment.css'

const appearance = {
    theme: 'flat',
    variables: {
        width: '100%',
        colorText: '#ffffff',
        colorBackground: '#131d33'
    }
  };
  

const StripePayment = () => {
    const {state: {slots, amount, date, location, selectedRooms, alldates}} = useLocation()
    const [clientSecret, setClientSecret] = useState('')
    const options = {clientSecret, appearance};
    const [state] = useContext(UserContext)
    const {_id, name} = state?.isUser

    const stripePromise = loadStripe("pk_test_51LruCgKqwBUsU0I5bR8zuDzEyZqhpLFN4byt2B4Kqojeop9ddkROhbxXIbxqo3ntsKfwXxGoEb76nuWdVrg3HrXi00HRSRG9yG")

    useEffect(() => {
        const getClientSecret = async () => {
            const { data } = await axios.post('http://localhost:9000/api/payment/create-payment-intent', {amount})
            setClientSecret(data.clientSecret)
        }
        getClientSecret()
    }, [])

    return (
        <div className="payment-container">
                <div>
                    <h2 className='text-2xl font-bold'>Hello {name},</h2>
                    <p><span className='text-4xl font-semibold'>${amount}</span> Will be deducted</p>
                </div>
                { 
                    clientSecret && 
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm 
                            alias={name} 
                            slots={slots} 
                            amount={amount} 
                            user={_id} 
                            date={date} 
                            location={location} 
                            selectedRooms={selectedRooms} 
                            alldates={alldates}
                        />
                    </Elements>
                }
        </div>
    )
}


const CheckoutForm = ({ alias, slots, amount, user, date, location, selectedRooms, alldates }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardErr, setCardErr] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [paymentLoading, setPaymentLoading] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()
        setCardErr('')

        if (!stripe || !elements) {
            return
        }

        setPaymentLoading(true)

        const { paymentIntent, error: intentErr } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        name: alias
                }},
            },
            redirect: 'if_required'
        })

         if (intentErr) {
            setCardErr(intentErr?.message)
            setPaymentLoading(false)
        } else {
            const {data} = await axios.post('http://localhost:9000/api/payment', {trxId: paymentIntent.id, user, date, location, slots})
            if(data?.success){
                await Promise.all(selectedRooms.map((parkingSlotId) => 
                        axios.put(`http://localhost:9000/api/parkingSlot/availability/${parkingSlotId}`, {
                        dates: alldates,
                      })));
                setTransactionId(paymentIntent.id)
                setPaymentLoading(false)
            }
        }
    }

    return (
        <form>
            <PaymentElement/>
            <button
                onClick={e => handleSubmit(e)}
                className={`btn btn-primary pay-now-btn ${transactionId && 'bg-blue-400'}`}
                disabled={!stripe || transactionId}
            >
                {paymentLoading ? 
                    <>
                        <div className='payment-loader-button-container'>
                            <span>Processing</span>
                            <ClipLoader
                                size='18'
                                color='#3fe5e5'
                                loading={paymentLoading}
                                speedMultiplier={1}
                            />
                        </div>
                    </> 
                    : `Pay $${amount}`
                }
            </button>
            {cardErr && <p className="payment-confirm-text">{cardErr}</p>}
            {transactionId && (
                <div>
                    <p className="payment-confirm-text">Congrats! Your payment is confirmed.</p>
                    <p className="payment-confirm-text">
                        Transaction Id: <span className="payment-transactionId">{transactionId}</span>
                    </p>
                </div>
            )}
        </form>
    )
}

export default StripePayment;
