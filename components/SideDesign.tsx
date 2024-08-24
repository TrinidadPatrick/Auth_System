import Image from 'next/image'
import React from 'react'
import waves from '../assetts/waves.svg'

interface SideDesignProps {
    image : string
}


const SideDesign = ({image} : SideDesignProps) => {
  return (
    <div className='w-[350px] hidden md:flex items-center justify-center h-full'>
        <Image src={image} alt="waves" width={250} />
    </div>
  )
}

export default SideDesign