import './App.css'

function App() {
 
  let isLoggedIn = false
  let name = "Hamza"

  return (
     //isLoggedIn ? <h1>Welcome {name}</h1> : <h1>Please log in!</h1>
     <div className='flex justify-center items-center h-screen '>
     <div className='border-1 w-[600px]'>   
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihVy-kVYng0zH5uXKQ4cqbjs16hfWSnaLQQ&s' />
      <p>Buggati</p>
      <p>1M $</p>
     </div>
     </div>
  )
}

export default App
