// import { Route, Routes } from "react-router-dom";
// import Home from "./components/Home/Home.jsx";
// import Footer from "./components/Footer/Footer.jsx";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Model from "./components/Models/Models.jsx";
// import { lazy, Suspense, useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./app.css";

// import Photos from "./pages/Photos.jsx";
// import Overview from "./pages/overview.jsx";
// import OrderOnline from "./pages/OrderOnline.jsx";
// import Reviews from "./pages/Reviews.jsx";
// import Menus from "./pages/Menus.jsx";

// const GetFoodRestaurents = lazy(() =>
//   import("./components/Home/GetFoodRestaurents.jsx")
// );
// const GetFoodRestaurentDetails = lazy(() =>
//   import("./components/Home/GetFoodRestaurentDetails.jsx")
// );

// function App() {
//   const [isModelOpen, setIsModalOpen] = useState(false);

//   const openModel = () => setIsModalOpen(true);
//   const closeModel = () => setIsModalOpen(false);

//   return (
//     <div>
//       {/* toastconatiner always at the top */}
//       <ToastContainer />

//       <div className="wrapper_main_div mx-52">
//         {/* navbar with props passed to open the model */}
//         <Navbar clickHandle={openModel} />
//         {/* conditional rendeing on the model if the state is true so defining it on the top */}
//         {isModelOpen && <Model onClose={closeModel}></Model>}

//         {/* defining the Routes with path and element*/}
//         <Routes>
//           {/* Home Page */}
//           <Route path="/" element={<Home />} />

//           {/* dynamic path to used when we use this path in our code to route and pass the :and path it will automatically take it as a dynamic path */}
//           <Route
//             path="/GetFoodRestaurents/:item"
//             element={
//               <Suspense fallback={<div>Loading...</div>}>
//                 <GetFoodRestaurents />
//               </Suspense>
//             }
//           />

//           {/* nested routes in which if any clild path gets matched with the main path the child route will be get rendered on the page of main route  */}
//           <Route
//             path="/GetFoodRestaurentDetails/:item/:restaurentId"
//             element={
//               <Suspense fallback={<div>Loading...</div>}>
//                 <GetFoodRestaurentDetails />
//               </Suspense>
//             }
//           >
//             {/* Nested Routes */}
//             <Route path="overview" element={<Overview />} />

//             {/* created a one default route using index */}
//             <Route index element={<OrderOnline />} />
//             <Route path="order-online" element={<OrderOnline />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="photos" element={<Photos />} />
//             <Route path="menu" element={<Menus />} />
//           </Route>

//           {/* 404 - Page Not Found if no any matching route found */}
//           <Route path="*" element={<div>404 - Page Not Found</div>} />
//         </Routes>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;

// import { Route, Routes } from "react-router-dom";
// import { lazy, Suspense, useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./app.css";

// import Home from "./components/Home/Home.jsx";
// import Footer from "./components/Footer/Footer.jsx";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Model from "./components/Models/Models.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import LoadingSpinner from "./components/LoadingSpinner.jsx";

// import Photos from "./pages/Photos.jsx";
// import Overview from "./pages/overview.jsx";
// import OrderOnline from "./pages/OrderOnline.jsx";
// import Reviews from "./pages/Reviews.jsx";
// import Menus from "./pages/Menus.jsx";

// // Lazy loaded components
// const GetFoodRestaurents = lazy(() => import("./components/Home/GetFoodRestaurents.jsx"));
// const GetFoodRestaurentDetails = lazy(() => import("./components/Home/GetFoodRestaurentDetails.jsx"));

// function App() {
//   const [isModelOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       {/* Toast Notifications */}
//       <ToastContainer />

//       <div className="max-w-6xl mx-auto px-4">
//         {/* Navbar */}
//         <Navbar clickHandle={() => setIsModalOpen(true)} />

//         {/* Modal Popup */}
//         {isModelOpen && <Model onClose={() => setIsModalOpen(false)} />}

//         {/* Routes Configuration */}
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route
//             path="/GetFoodRestaurents/:item"
//             element={
//               <Suspense fallback={<LoadingSpinner />}>
//                 <GetFoodRestaurents />
//               </Suspense>
//             }
//           />

//           <Route
//             path="/GetFoodRestaurentDetails/:item/:restaurentId"
//             element={
//               <Suspense fallback={<LoadingSpinner />}>
//                 <GetFoodRestaurentDetails />
//               </Suspense>
//             }
//           >
//             <Route path="overview" element={<Overview />} />
//             <Route index element={<OrderOnline />} />
//             <Route path="order-online" element={<OrderOnline />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="photos" element={<Photos />} />
//             <Route path="menu" element={<Menus />} />
//           </Route>

//           {/* 404 Page */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;

import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";

import Home from "./components/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Model from "./components/Models/Models.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import Photos from "./pages/Photos.jsx";
import Overview from "./pages/overview.jsx";
import OrderOnline from "./pages/OrderOnline.jsx";
import Reviews from "./pages/Reviews.jsx";
import Menus from "./pages/Menus.jsx";

// Lazy loaded components
const GetFoodRestaurents = lazy(() =>
  import("./components/Home/GetFoodRestaurents.jsx")
);
const GetFoodRestaurentDetails = lazy(() =>
  import("./components/Home/GetFoodRestaurentDetails.jsx")
);

function App() {
  const [isModelOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen max-w-screen ">
      {/* Toast Notifications */}
      <ToastContainer />
      <div className="max-w-6xl mx-auto flex-grow">
        {/* Navbar */}
        <Navbar clickHandle={() => setIsModalOpen(true)} />

        {/* Modal Popup */}
        {isModelOpen && <Model onClose={() => setIsModalOpen(false)} />}

        {/* Routes Configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/GetFoodRestaurents/:item"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GetFoodRestaurents />
              </Suspense>
            }
          />
          <Route
            path="/GetFoodRestaurentDetails/:item/:restaurentId"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GetFoodRestaurentDetails />
              </Suspense>
            }
          >
            <Route path="overview" element={<Overview />} />
            <Route index element={<OrderOnline />} />
            <Route path="order-online" element={<OrderOnline />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="photos" element={<Photos />} />
            <Route path="menu" element={<Menus />} />
          </Route>
          {/* /* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* <div className="max-w-screen sm:w-[1300px] lg:w-[1500px] mx-auto "> */}
      {/* <Navbar clickHandle={() => setIsModalOpen(true)} /> */}
      <Footer />
      {/* </div> */}
    </div>
  );
}

export default App;

{
  /* <div className="max-w-full w-full mx-auto flex-grow">
      </div> */
}
