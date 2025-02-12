import assets from "../../assets/assets";

const SetPassword = ({ props }) => {
  const {
    signState,
    setSignState,
    handlePassword,
    password,
    handleSetPassword,
    onClose,
  } = props;
  return (
    <div>
      <img
        onClick={onClose}
        className="w-5 relative bottom-6 left-full cursor-pointer"
        src={assets.cross}
        alt="cross_icon"
      />
      <img
        onClick={() => {
          setSignState("New Registration");
        }}
        className="w-6 bottom-10 right-5 relative cursor-pointer"
        src={assets.back_button}
        alt="cross_icon"
      />
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        {signState}
      </h2>
      <form onSubmit={handleSetPassword} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="pass" className="font-medium text-gray-700">
            Enter Password
          </label>
          <input
            type="password"
            id="pass"
            placeholder="Enter Password"
            value={password.pass}
            name="pass"
            onChange={handlePassword}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="pass" className="font-medium text-gray-700">
            Re-enter Password
          </label>
          <input
            type="password"
            id="repass"
            placeholder="Re-enter Password"
            value={password.rePass}
            name="rePass"
            onChange={handlePassword}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        {password.pass !== password.rePass ? (
          <span className="text-red-500 text-sm">Password not matched</span>
        ) : (
          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-400 transition duration-200"
            >
              {signState}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SetPassword;
