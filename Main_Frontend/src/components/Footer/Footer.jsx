// import assets from "../../assets/assets";

// const Footer = () => {
//   return (
//     <div className=" mt-10 bg-zinc-100 flex-1 ">
//       <div className="flex gap-32 ml-52  justify-between mr-52 py-10">
//         <div>
//           <img className="w-36" src={assets.EazyEat_logo} alt="" />
//           <div className="max-w-44 flex flex-row items-center">
//             <img className="w-3 mb-4 mr-1 opacity-60" src={assets.c} alt="" />
//             <p className="mt-2 font-sans text-gray-600">EasyEat Technologies Pvt. Ltd</p>
//           </div>
//         </div>

//         <div>
//           <h2 className="font-poppins font-bold text-xl mb-3">Company</h2>
//           <div className="space-y-2"> {/* Added vertical spacing */}
//             <p className="font-sans text-gray-600">About</p>
//             <p className="font-sans text-gray-600">Careers</p>
//             <p className="font-sans text-gray-600">Team</p>
//           </div>
//         </div>

//         <div className="">
//           <div className="mb-5">
//             <h2 className="font-poppins font-bold text-xl mb-3">Contact us</h2>
//             <div className="space-y-2"> {/* Added vertical spacing */}
//               <p className="font-sans text-gray-600">Help & Support</p>
//               <p className="font-sans text-gray-600">Partner with us</p>
//               <p className="font-sans text-gray-600">Ride with us</p>
//             </div>
//           </div>

//           <div>
//             <h2 className="font-poppins font-bold text-xl mb-3">Legal</h2>
//             <div className="space-y-2"> {/* Added vertical spacing */}
//               <p className="font-sans text-gray-600">Terms & Conditions</p>
//               <p className="font-sans text-gray-600">Cookie Policy</p>
//               <p className="font-sans text-gray-600">Privacy Policy</p>
//               <p className="font-sans text-gray-600">Investor Relations</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h2 className="font-poppins font-bold text-xl mb-3">We deliver to:</h2>
//           <div className="space-y-2"> {/* Added vertical spacing */}
//             <p className="font-sans text-gray-600">Bangalore</p>
//             <p className="font-sans text-gray-600">Gurgaon</p>
//             <p className="font-sans text-gray-600">Hyderabad</p>
//             <p className="font-sans text-gray-600">Delhi</p>
//             <p className="font-sans text-gray-600">Mumbai</p>
//             <p className="font-sans text-gray-600">Pune</p>
//           </div>
//         </div>
     
//       </div>
//       <div className="ml-52 mr-52 bg-zinc-100">
//       <hr className="mb-6 bg-gray-800 border no-border" />
//       <p className="pb-6 font-thin text-sm">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © Zomato™ Ltd. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default Footer;




import assets from "../../assets/assets";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-100 w-full mt-10 ">
      {/* Wrapper to Keep Content Centered */}
      <div className="max-w-7xl mx-auto px-6 justify-items-center sm:px-12 sm:w-full py-10 grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 lg:w-full  gap-6 ">
     
        <div>
          <img className="w-32" src={assets.EazyEat_logo} alt="EazyEat Logo" />
          <div className="flex items-center mt-2">
            <img className="w-3 opacity-60" src={assets.c} alt="Copyright Symbol" />
            <p className="ml-1 text-gray-700 text-sm">EasyEat Technologies Pvt. Ltd</p>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-blue-500"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-pink-500"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700"><FaLinkedinIn size={20} /></a>
          </div>
        </div>

        {/* Company Section */}
        <div>
          <h2 className="font-bold text-lg mb-3">Company</h2>
          <div className="space-y-2">
            {["About", "Careers", "Team"].map((item) => (
              <a key={item} href="#" className="text-gray-700 block hover:text-custom-red transition-all">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Contact & Legal Section */}
        <div>
          <div className="mb-5">
            <h2 className="font-bold text-lg mb-3">Contact us</h2>
            <div className="space-y-2">
              {["Help & Support", "Partner with us", "Ride with us"].map((item) => (
                <a key={item} href="#" className="text-gray-700 block hover:text-custom-red transition-all">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3">Legal</h2>
            <div className="space-y-2">
              {["Terms & Conditions", "Cookie Policy", "Privacy Policy", "Investor Relations"].map((item) => (
                <a key={item} href="#" className="text-gray-700 block hover:text-custom-red transition-all">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Locations */}
        <div>
          <h2 className="font-bold text-lg mb-3">We deliver to:</h2>
          <div className="space-y-2">
            {["Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune"].map((city) => (
              <p key={city} className="text-gray-700">{city}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription - Background Fixed to Full Width */}
      <div className="bg-gray-200 w-full py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <h2 className="font-bold text-xl mb-3">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 mb-4">Get the latest updates on our services and offers.</p>
          <form className="flex flex-col sm:flex-row justify-center items-center max-w-md mx-auto space-y-3 sm:space-y-0">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 w-full sm:w-auto rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-custom-red text-white rounded-md hover:bg-custom-red transition-all w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 py-6 text-center">
        <hr className="mb-6 border-gray-300" />
        <p className="text-gray-600 text-sm">
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © EazyEat™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;



// import assets from "../../assets/assets";

// const Footer = () => {
//   return (
//     <div className="mt-10 bg-zinc-100 w-full">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Logo Section */}
//           <div>
//             <img className="w-36" src={assets.EazyEat_logo} alt="EasyEat Logo" />
//             <div className="max-w-44 flex flex-row items-center mt-2">
//               <img className="w-3 mb-4 mr-1 opacity-60" src={assets.c} alt="Copyright" />
//               <p className="text-gray-600 text-sm">EasyEat Technologies Pvt. Ltd</p>
//             </div>
//           </div>

//           {/* Company Section */}
//           <div>
//             <h2 className="font-poppins font-bold text-xl mb-3">Company</h2>
//             <div className="space-y-2">
//               <p className="text-gray-600">About</p>
//               <p className="text-gray-600">Careers</p>
//               <p className="text-gray-600">Team</p>
//             </div>
//           </div>

//           {/* Contact and Legal Section */}
//           <div>
//             <div className="mb-5">
//               <h2 className="font-poppins font-bold text-xl mb-3">Contact us</h2>
//               <div className="space-y-2">
//                 <p className="text-gray-600">Help & Support</p>
//                 <p className="text-gray-600">Partner with us</p>
//                 <p className="text-gray-600">Ride with us</p>
//               </div>
//             </div>

//             <div>
//               <h2 className="font-poppins font-bold text-xl mb-3">Legal</h2>
//               <div className="space-y-2">
//                 <p className="text-gray-600">Terms & Conditions</p>
//                 <p className="text-gray-600">Cookie Policy</p>
//                 <p className="text-gray-600">Privacy Policy</p>
//                 <p className="text-gray-600">Investor Relations</p>
//               </div>
//             </div>
//           </div>

//           {/* Delivery Locations Section */}
//           <div>
//             <h2 className="font-poppins font-bold text-xl mb-3">We deliver to:</h2>
//             <div className="space-y-2">
//               <p className="text-gray-600">Bangalore</p>
//               <p className="text-gray-600">Gurgaon</p>
//               <p className="text-gray-600">Hyderabad</p>
//               <p className="text-gray-600">Delhi</p>
//               <p className="text-gray-600">Mumbai</p>
//               <p className="text-gray-600">Pune</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom Section */}
//         <div className="mt-8 border-t border-gray-300 pt-6">
//           <p className="text-sm text-gray-600 text-center">
//             By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © EasyEat™ Ltd. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;