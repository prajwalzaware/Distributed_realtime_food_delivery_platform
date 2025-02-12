// import Scroll_Menu from "./Scroll_Menu";
// import TopRestaurents from "./TopRestaurents";
// import FilterNavBar from "./FilterNavBar";
// import ShowRestaurents from "./ShowRestaurents.jsx"
// import ExploreMore from "./ExploreMore.jsx"
// import AppDownload from "./AppDownload.jsx"
// const Home = () => {
//   return (
//     <>
//       <Scroll_Menu />
//       <hr className="mt-7 bg-slate-700 " />
//       <TopRestaurents/>
//       <hr className="mt-8 bg-slate-700" />
//       <FilterNavBar />
//       <ShowRestaurents/>
//       <ExploreMore/>
//       <hr className="mt-20 bg-slate-700" />
//       <AppDownload/>
//     </>
//   );
// };

// export default Home;
import { lazy, Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner"; // Import the spinner component

const ScrollMenu = lazy(() => import("./Scroll_Menu"));
const TopRestaurants = lazy(() => import("./TopRestaurents"));
const FilterNavBar = lazy(() => import("./FilterNavBar"));
const ShowRestaurants = lazy(() => import("./ShowRestaurents.jsx"));
const ExploreMore = lazy(() => import("./ExploreMore.jsx"));
const AppDownload = lazy(() => import("./AppDownload.jsx"));

const Home = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="container mx-auto px-4 ">
        <ScrollMenu />
        <hr className="mt-7 bg-slate-700" />
        <TopRestaurants />
        <hr className="mt-8 bg-slate-700" />
        <FilterNavBar />
        <ShowRestaurants />
        <ExploreMore />
        <hr className="mt-20 bg-slate-700" />
        <AppDownload />
      </div>
    </Suspense>
  );
};

export default Home;
