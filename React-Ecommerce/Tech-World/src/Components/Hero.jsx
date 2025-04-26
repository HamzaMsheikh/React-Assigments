import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Array of background images (you can replace these URLs with your own)
const backgroundImages = [
  "https://thepihut.com/cdn/shop/products/full-size-wireless-keyboard-with-trackpad-the-pi-hut-103118-13724465201214_970x.jpg?v=1646539216",
  "https://www.sfbags.com/cdn/shop/products/Open-Contents-zipper.jpg?v=1700253989&width=1080",
  "https://ae01.alicdn.com/kf/Se54b25c7abbf4bfd8733a490fc2dddeeS.jpg",
  "https://img.freepik.com/premium-photo/hightech-devices-yellow-surface-vibrant-product-photography_976564-6663.jpg",
  "https://images.stockcake.com/public/d/f/0/df024079-3301-4564-bb7a-edd9e7625cb3_large/tech-gadget-assortment-stockcake.jpg",
  "https://cdn.mos.cms.futurecdn.net/kozYSnTqFesN34Q4PHcc56.jpg"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section
      className="relative bg-cover mt-10 bg-center text-white py-12 sm:py-16 md:py-20 h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center"
      style={{
        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Your Tech-World
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 drop-shadow-md">
          Discover Amazing Deals Every Day!
        </p>
        <Link
          to="/products"
          className="inline-block bg-green-500 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}