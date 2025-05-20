
const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-[20px] py-[30px] bg-[#333] font-bold text-[#f39c12]'>
        <h2>Shop-Easy</h2>

        <ul className='flex list-none gap-[40px]'>
            <li className='cursor-pointer hover:text-[#e67e22]'>Home</li>
            <li className='cursor-pointer hover:text-[#e67e22]'>About</li>
            <li className='cursor-pointer hover:text-[#e67e22]'>Services</li>
            <li className='cursor-pointer hover:text-[#e67e22]'>Contact Us</li>
        </ul>
    </div>
  );
};

export default Navbar;