// import { useOutletContext } from "react-router-dom";
// import { useEffect, useRef } from "react";

// const Photos = () => {
//   const { restaurentDetails } = useOutletContext();
//   const bannerRef = useRef(null);

//   useEffect(() => {
//     if (bannerRef.current) {
//       bannerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//   }, []); 

//   if (!restaurentDetails) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500">Loading Photos...</p>
//       </div>
//     );
//   }

//   // Ensure we have a valid images array
//   const images = restaurentDetails.images || [];
//   const mainImage = restaurentDetails.mainRestaurentImage;
//   const allImages = [mainImage, ...images].filter(Boolean);

//   return (
//     <div ref={bannerRef} className="relative pb-8">
//       <div className="font-poppins text-[24px] mt-2 mb-4 font-medium opacity-90 leading-[43px]">
//         {restaurentDetails.restaurantName} Photos
//       </div>
      
//       <div className="flex flex-wrap gap-3">
//         {allImages.map((image, index) => (
//           <div key={index} className="relative group">
//             <img
//               className="h-48 w-52 rounded-lg object-cover transform transition-transform duration-300 hover:scale-105"
//               src={image}
//               alt={`Restaurant ${index + 1}`}
              
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
//           </div>
//         ))}
//       </div>

//       {allImages.length === 0 && (
//         <div className="text-center text-gray-500 py-8">
//           No photos available
//         </div>
//       )}
//     </div>
//   );
// };

// export default Photos;

import { useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";

const Photos = () => {
  const { restaurentDetails } = useOutletContext();
  const photosRef = useRef(null);

  useEffect(() => {
    if (photosRef.current) {
      const navHeight = 290; // Height of the sticky navigation
      const headerOffset = photosRef.current.offsetTop - navHeight;
      
      window.scrollTo({
        top: headerOffset,
        behavior: "smooth"
      });
    }
  }, [restaurentDetails]);

  if (!restaurentDetails) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading Photos...</p>
      </div>
    );
  }

  // Ensure we have a valid images array
  const images = restaurentDetails.images || [];
  const mainImage = restaurentDetails.mainRestaurentImage;
  const allImages = [mainImage, ...images].filter(Boolean);

  return (
    <div ref={photosRef} className="relative pb-8 mt-4">
      <div className="font-poppins text-[24px] mb-4 font-medium opacity-90 leading-[43px]">
        {restaurentDetails.restaurantName} Photos
      </div>
      
      <div className="flex flex-wrap gap-3">
        {allImages.map((image, index) => (
          <div key={index} className="relative group">
            <img
              className="h-48 w-52 rounded-lg object-cover transform transition-transform duration-300 hover:scale-105"
              src={image}
              alt={`Restaurant ${index + 1}`}
             
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
          </div>
        ))}
      </div>

      {allImages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No photos available
        </div>
      )}
    </div>
  );
};

export default Photos;