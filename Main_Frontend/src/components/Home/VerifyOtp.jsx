import assets from "../../assets/assets";

const VerifyOtp = ({props}) => {
  const {signState,otp,handleOTPchange,handleOTPSubmit,onClose}=props;
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

      <form onSubmit={handleOTPSubmit} className="flex flex-col space-y-2">
        <label htmlFor="name" className="font-medium text-gray-700">
          Enter OTP here
        </label>
        <input
          type="number"
          id="otp"
          placeholder="Enter OTP here"
          value={otp.otp}
          name="otp"
          onChange={handleOTPchange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-400"
        />
        <div className="text-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-400 transition duration-200"
          >
            {signState}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
