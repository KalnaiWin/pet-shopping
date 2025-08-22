import { prisma } from '@/lib/prisma'
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {

  const productInformation = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      images: true,
      price: true,
      discount: true,
      delivery: true,
      description: true,
      
    }
  })

  return (
    <div className='w-full bg-amber-400 ml-6'>
      <div>

      </div>
    </div>
  )
}
