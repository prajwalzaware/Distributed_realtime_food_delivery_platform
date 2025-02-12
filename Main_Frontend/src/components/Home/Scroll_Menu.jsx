import {  useNavigate } from "react-router-dom";
import { menu_list } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Scroll_Menu = () => {
  const {profileDetails}=useContext(AuthContext)
  const navigate=useNavigate();
  return (
    <div>
      <h1 className="mt-10 text-2xl p-2 font-poppins font-bold ">{profileDetails?.name || "Hey" }, what's on your mind?</h1>
      <div className="flex gap-6 mt-9  items-center overflow-x-auto scrollbar-hide scroll-smooth"   >
        {menu_list.map((item, index) => {
          return (
            <div key={index} className=" text-center ml-1" onClick={() => navigate(`/GetFoodRestaurents/${item.menu_name}`)} >
              <img
                className="max-w-40 w-40  rounded-full"
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p className="p-2 text-lg text-gray-700 ">{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scroll_Menu;
