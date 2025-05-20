
const Products = (props) => {
   
  return (
    // React Fragment
    <>   
      <div className="p-[20px] max-w-[360px] rounded-[20px] text-center m-[20px] shadow-2xl ">

        <img className="w-[300px] h-[250px]" src={props.image} alt={props.name}/>
        <p class="ttle">{props.name}</p>
        <p className="text-gray-400 text-[22px]">{props.price}</p>
        <button className="border-none outline-0 p-[12px] text-gray-100 bg-amber-600 text-center cursor-pointer w-[100%] text-[18px] rounded-2xl hover:opacity-[0.7]">Add to cart</button>
        
      </div>

    </>
  );
};

export default Products;