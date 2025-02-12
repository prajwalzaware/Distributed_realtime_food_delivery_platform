import assets from "../../assets/assets";

const NewRegistration = ({ props }) => {
  const { onClose, signState, setSignState, handleSubmit, handleChange, data } =
    props;
  return (
    <div>
      <img
        onClick={onClose}
        className="w-5 relative bottom-6 left-full cursor-pointer"
        src={assets.cross}
        alt="cross_icon"
      />
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        {signState}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="font-medium text-gray-700">
            Name
          </label>
          <input
            type="string"
            id="name"
            placeholder="Enter your name"
            value={props.data.name}
            name="name"
            onChange={props.handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={props.data.email}
            name="email"
            onChange={props.handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="mobileNo" className="font-medium text-gray-700">
            Mobile No
          </label>
          <input
            type="number"
            id="mobileNo"
            placeholder="Enter your mobile number"
            value={props.data.mobileNo}
            name="mobileNo"
            onChange={props.handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none  focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label htmlFor="mobileNo" className="font-medium text-gray-700 ">
            Choose Registration Type :
          </label>
        </div>
        <div className="flex items-center space-x-4 mt-4 ">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="email"
              id="Email"
              name="registrationType"
              checked={props.data.registrationType === "email"}
              onChange={props.handleChange}
              className="accent-red-500"
            />
            <span className="text-gray-700">Email</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="mobileNo"
              id="Mobile No"
              name="registrationType"
              checked={props.data.registrationType === "mobileNo"}
              onChange={props.handleChange}
              className="accent-red-500"
            />
            <span className="text-gray-700">Mobile No</span>
          </label>
        </div>

        <div className="text-center mt-5 pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-400 transition duration-200"
          >
            {props.signState}
          </button>
        </div>
      </form>
      <p className="pt-5">
        Already have account{" "}
        <span
          className="text-xl text-custom-red cursor-pointer"
          onClick={() => {
            props.setSignState("Login");
          }}
        >
          click here
        </span>{" "}
        to Login
      </p>
    </div>
  );
};

export default NewRegistration;
