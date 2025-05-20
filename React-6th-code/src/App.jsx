import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center'>
    <div className=''>
      <button className='bg-blue'>+</button>
    </div>
     {count}
     <div className=''>
      <button className='bg-red'>-</button>
    </div>
    </div>
    </>
  )
}

export default App
