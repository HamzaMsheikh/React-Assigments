import React from 'react'

const Hero = (props) => {
  return (
     <div className='flex justify-between'>
          <div className='flex flex-col items-start justify-center gap-[40px] px-[20px] py-[50px]'>
            <h1 class="text-[40px] font-bold">
             {props.heading}
            </h1>
  
            <p className='text-2xl font-light text-gray-500'>{props.description}</p>
            
  
            <button className='px-[15px] py-[12px] text-2xl border-none rounded-[15px] bg-amber-500 hover:bg-amber-600'>Shop now !</button>
          </div>
  
  
          <div className='flex-auto'>
              <img className='w-400 h-[600px] object-contain' src={props.image}/>
          </div>
      </div>
  )
}

export default Hero