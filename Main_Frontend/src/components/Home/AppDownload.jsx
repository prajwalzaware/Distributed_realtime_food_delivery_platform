// import assets from "../../assets/assets"

// const AppDownload = () => {
//     return (
//         <div className="AppDownload mx-auto my-auto mt-10 text-4xl text-center font-medium" id='mobileApp'>
//             <p>For Better Experience Download <br /> Tomato App</p>
//             <div className="AppDownload-platforms flex justify-center space-x-6 mt-8 cursor-pointer">
//                 <img className="transform transition-transform duration-300 hover:scale-105" src={assets.playStore} alt="Play Store" />
//                 <img className="transform transition-transform duration-300 hover:scale-105" src={assets.appStore} alt="App Store" />
//             </div>
//         </div>

//     )
// }

// export default AppDownload
import assets from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="mx-auto text-center mt-10 max-w-xl px-4" id="mobileApp">
      <p className="text-2xl sm:text-3xl font-semibold leading-tight">
        For a Better Experience, Download <br className="hidden sm:block" /> the EazyEat App
      </p>
      
      <div className="flex justify-center space-x-6 mt-6">
        <a
          href="https://play.google.com/store" // Replace with actual URL
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105"
        >
          <img 
            src={assets.playStore} 
            alt="Download Tomato App on Play Store" 
            className="w-36 sm:w-40"
          />
        </a>
        
        <a
          href="https://www.apple.com/app-store/" // Replace with actual URL
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-105"
        >
          <img 
            src={assets.appStore} 
            alt="Download Tomato App on App Store" 
            className="w-36 sm:w-40"
          />
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
