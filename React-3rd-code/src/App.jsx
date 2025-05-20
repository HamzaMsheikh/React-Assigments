
import './App.css'
import Navbar from './Components/Navbar/navbar'
import Hero from './Components/Hero/Hero'
import ProductData from './Components/ProductData/ProductData'
import Footer from './Components/Footer/Footer'


function App() {

  return (
    <>
    <Navbar />
    <Hero heading="Shop-Easy" image="https://img.freepik.com/premium-vector/isometric-flat-3d-illustration-online-shopping-concept-with-ecommerce-app_18660-4570.jpg?semt=ais_hybrid"
    
    
    description="Shop Easy generally refers to a platform or service that aims to simplify the online shopping experience, offering a variety of products and services with ease of access and delivery. "
    />
    <h1 className='text-center text-4xl font-bold p-[20px]'>Products</h1>
    
    <ProductData />

    <Footer />
    </>
  )
}

export default App
