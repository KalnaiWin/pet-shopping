import RegisterForm from '@/components/auth/register-form'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='absolute top-0 object-cover w-full h-screen hidden md:block'>
            <img src="/images/auth.png" alt="Authentication" />
        </div>
        <div className='z-10'>
            <RegisterForm />
        </div>
    </div>
  )
}
