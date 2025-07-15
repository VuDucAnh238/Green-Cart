import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
    return (
        <div className='bg-green-100 p-4 md:p-6 text-center rounded-lg relative mt-10'>
            <img src={assets.bottom_banner_image} alt="" className='hidden md:block object-cover w-full' />
            <img src={assets.bottom_banner_image_sm} alt="" className='md:hidden object-cover w-full' />
            <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>Why we are the best?</h1>
                    {features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-4 mt-2'>
                            <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
                            <div>
                                <h3 className='md:text-xl font-semibold text-lg text-start'>{feature.title}</h3>
                                <p className='md:text-sm text-xs text-gray-500/70'>{feature.description}</p> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BottomBanner
