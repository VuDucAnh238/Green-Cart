import React, { useEffect, useState } from 'react'

import { dummyOrders } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const {currenc, axios, user} = useAppContext()
    const fetchMyOrders = async () => {
        try {
            const {data} = await axios.get('/api/order/user')
            if (data.success) {
                setMyOrders(data.orders)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        if (user) {
            fetchMyOrders()
        }
    }, [user])
  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl md:text-3xl font-medium uppercase'>My orders</p>
            <div className='w-29 h-0.5 bg-primary rounded-full'></div>
        </div>
        {myOrders.map((order, index) => (
            <div className='gap-2 mb-4 border border-gray-500 rounded-lg mb-10 p-4 py-5 max-w-4xl' key={index}>
                <p className='flex justify-between md:items-center text-gray-500 md:font-medium max-md:flex-col'>
                    <span>OrderId : {order._id}</span>
                    <span>Payment : {order.paymentType}</span>
                    <span>Total Amount : {currency}{order.amount}</span>
                </p>
                {order.items.map((item, index) => (
                    <div key={index} className={`relative flex items-start justify-between gap-4 my-2 ${index !== order.items.length - 1 ? 'border-b border-gray-300 pb-4' : ''}`}>
                        <div className='flex items-center justify-between gap-4 my-2'>
                            <div className='flex items-center justify-between gap-4 my-2'>
                                <img src={item.product.image[0]} alt="" className='w-16 h-16'/>
                            </div>
                            <div className='flex flex-col items-start gap-2'>
                                <h2 className='font-medium text-xl text-gray-800'>{item.product.name}</h2>
                                <p>Category: {item.product.category}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-start gap-2'>
                            <p>Quantity: {item.quantity || '1'}</p>
                            <p>Status: {order.status}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className='text-gray-500 font-medium'>
                            Amount: {currency}{item.product.offerPrice * item.quantity}
                        </p>
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default MyOrders
