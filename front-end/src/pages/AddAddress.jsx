 import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
// Input fields for address details
const InputFields = ({type, placeholder, name, handleChange, address}) => (
    <input className='border border-gray-500/30 rounded outline-none focus:border-primary transition outline-none w-full rounded-full px-2 py-2.5 text-gray-500' type={type} placeholder={placeholder} onChange={handleChange} name={name} address={address[name]} required/>
)

const AddAddress = () => {
    const {axios, user, navigate} = useAppContext();
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value 
        }))
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/address/add', {address});
            if (data.success) {
                toast.success(data.message);
                navigate('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/cart');
        }
    }, [])
  return (
    <div className='flex flex-col mt-16 pb-16'>
      <p className='text-2xl md:text-3xl font-medium text-gray-500'>Add Shipping <span className='text-primary font-semibold'>Address</span></p>
      <div className='flex flex-col-reverse justify-between md:flex-row gap-6 mt-10'>
        <div className='w-full md:w-1/2 flex flex-col gap-6 max-w-md flex-1'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-6 space-y-3 mt-6 text-sm'>
                <div className='flex flex-col gap-4 grid grid-cols-2'>
                    <InputFields handleChange={handleChange} address={address} name='firstName' placeholder='First Name' type='text'/>
                    <InputFields handleChange={handleChange} address={address} name='lastName' placeholder='Last Name' type='text'/>
                </div>
                <InputFields handleChange={handleChange} address={address} name='email' type='email' placeholder='Email Address'/>
                <InputFields handleChange={handleChange} address={address} name='street' type='text' placeholder='Street'/>
                <div className='flex flex-col gap-4 grid grid-cols-2'>
                    <InputFields handleChange={handleChange} address={address} name='city' type='text' placeholder='City'/>
                    <InputFields handleChange={handleChange} address={address} name='state' type='text' placeholder='State'/>
                </div>
                <div className='flex flex-col gap-4 grid grid-cols-2'>
                    <InputFields handleChange={handleChange} address={address} name='country' type='text' placeholder='Country'/>
                    <InputFields handleChange={handleChange} address={address} name='zipcode' type='number' placeholder='Zip Code'/>
                </div>
                <InputFields handleChange={handleChange} address={address} name='phone' type='number' placeholder='Phone Number'/>
                <button className='w-full py-3 bg-primary text-white font-medium hover:bg-primary-dull transition rounded-full' type='submit'>
                    Save address
                </button>
            </form>
        </div>
        <img className='w-full md:w-1/2 object-cover h-full' src={assets.add_address_iamge} alt="" />
      </div>
    </div>
  )
}

export default AddAddress
