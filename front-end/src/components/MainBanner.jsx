import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div className='relative w-full h-[300px] md:h-[400px]'>
            <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block object-cover' />
            <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden object-cover' />
            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness you can trust, every day at Green Cart!</h1>
                <div className='flex items-center mt-6 font-medium text-lg md:text-xl lg:text-2xl text-center md:text-left text-gray-600'>
                    <Link className='group flex items-center gap-2 px-7 py-3 text-lg font-medium text-white bg-primary rounded-full hover:bg-emerald-400 transition cursor-pointer' to='/products'>
                        Shop now
                        <img className='md:hidden transition group-focus:transalate-x-1' src={assets.white_arrow_icon} alt="" />
                    </Link>
                    <Link className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer' to='/products'>
                        Explore deals
                        <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
