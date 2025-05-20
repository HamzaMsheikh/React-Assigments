import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='grid grid-cols-3 grid-rows-[70px_250px_200px_100px] m-1 gap-3'>
      <div className='bg-amber-500 col-span-3'>Header</div>
      <div className='bg-blue-600 row-span-2'>Sidebar</div>
      <div className='bg-emerald-500'>Content-1</div>
      <div className='bg-fuchsia-500'>Content-2</div>
      <div className='bg-lime-500 col-span-2'>Conttent-3</div>
      <div className='bg-pink-500 col-span-3'>Footer</div>
    </div>
  )
}

export default App
