const Login = ({ props }) => {
  const { handleLogin, loginDetails, handleSetLogin, signState } = props;
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        {signState}
      </h2>
      <form onSubmit={handleSetLogin} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="mobileNo" className="font-medium text-gray-700">
            Username
          </label>
          <input
            type="string"
            id="username"
            placeholder="Enter username"
            value={loginDetails.username}
            name="username"
            onChange={handleLogin}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none  focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="mobileNo" className="font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your mobile number"
            value={loginDetails.password}
            name="password"
            onChange={handleLogin}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none  focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="text-center mt-5 pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-400 transition duration-200"
          >
            {signState}
          </button>
        </div>
        <p className="pt-2">
          Don't have existing account{" "}
          <span
            className="text-xl text-custom-red cursor-pointer"
            onClick={() => {
              props.setSignState("New Registration");
            }}
          >
            click here
          </span>{" "}
          to Register
        </p>
      </form>
    </div>
  );
};

export default Login;
