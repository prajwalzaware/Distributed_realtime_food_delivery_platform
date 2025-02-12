import { useState, useEffect } from "react";
// import assets from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
// import { sign } from "jsonwebtoken";
import NewRegistration from "./newRegistration";
import VerifyOtp from "./VerifyOtp.jsx";
import SetPassword from "./SetPassword.jsx";
import VerifyEmail from "./VerifyEmail.jsx";
import Login from "./Login.jsx";
import { useAuth } from "../../context/AuthContext";

const SignInForm = ({ onClose }) => {
  const { isAuthenticated, setIsAuthenticated,addCartItemsToDb, fetchCartFromDb } = useAuth();

  const url = "http://localhost:3000";

  const [data, setData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    registrationType: "email",
  });
  const [signState, setSignState] = useState("Login");
  // const [signState, setSignState] = useState("New Registration");
  // const [signState, setSignState] = useState("Set Password");
  // const [signState, setSignState] = useState("VerifyOtp");
  // const [signState, setSignState] = useState("Verify Email");

  const handleChange = (e) => {
    const inputName = e.target.name;
    const newValue = e.target.value;
    setData((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));
  };

  const [otp, setOTP] = useState({
    otp: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        signState === "New Registration" ? "/user/registerUser" : "";
      const response = await axios.post(url + endpoint, data);
      console.log(response.data.status);
      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      console.log(response);

      if (
        response.data.status &&
        response.data.message === "Verification email sent successfully"
      ) {
        setSignState("Verify Email");
        setIsWaitingForVerification(true);
      }

      if (
        response.data.status &&
        response.data.message === "OTP sent successfully"
      ) {
        setSignState("Verify OTP");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message || "Conflict occurred.");
      } else {
        // For other errors (network issues, server errors, etc.)
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOTPchange = (e) => {
    const inputName = e.target.name;
    const newValue = e.target.value;
    setOTP((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));
  };
  console.log(otp);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        signState === "Verify OTP" ? "/verify/verify_mobileNo" : "";
      const payload = {
        otp: otp.otp,
        mobileNo: data.mobileNo,
        email: data.email,
      };
      const verificationResponse = await axios.post(url + endpoint, payload);
      console.log(verificationResponse);
      if (verificationResponse.data.success) {
        toast.success("OTP verified successfully!");
      } else {
        toast.error("OTP verification failed!");
      }
      if (
        verificationResponse.data.success &&
        verificationResponse.data.message ===
          "Mobile number verified successfully"
      ) {
        setSignState("Set Password");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message || "OTP expired or invalid");
      } else {
        // For other errors (network issues, server errors, etc.)
        toast.error("Something went wrong!");
      }
    }
  };

  const [password, setPassword] = useState({
    pass: "",
    rePass: "",
  });

  const handlePassword = (e) => {
    const inputName = e.target.name;
    const newValue = e.target.value;
    setPassword((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));
  };
  console.log(password);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      const endpoint = signState === "Set Password" ? "/user/set_password" : "";
      const payload = {
        mobileNo: data.mobileNo,
        email: data.email,
        password: password.pass,
      };
      const setPassResponse = await axios.post(url + endpoint, payload);
      console.log(setPassResponse);

      if (
        setPassResponse.data.status &&
        setPassResponse.data.message === "Password updated successfully"
      ) {
        toast.success("Password set Successfully");
        onClose();
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  const [isWaitingForVerification, setIsWaitingForVerification] =
    useState(false);

  useEffect(() => {
    let interval;
    if (isWaitingForVerification) {
      interval = setInterval(async () => {
        try {
          const verificationStatus = await axios.get(
            url + "/verify/checkEmailVerifed",
            {
              params: { email: data.email, mobileNo: data.mobileNo },
            }
          );
          if (
            verificationStatus.data.status &&
            verificationStatus.data.message === "Mail is Verified"
          ) {
            clearInterval(interval);
            setIsWaitingForVerification(false);
            toast.success("Email verified successfully!");
            setSignState("Set Password");
          }
        } catch (error) {
          console.error("Verification check failed:", error);
        }
      }, 5000); // Check every 5 seconds
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isWaitingForVerification, data.email, data.mobileNo]);

  const [loginDetails, setloginDetails] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    const inputName = e.target.name;
    const newValue = e.target.value;
    setloginDetails((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));
  };

  const handleSetLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        signState === "Login" ? "/user/loginUser" : "/user/registerUser";
      const payload = {
        username: loginDetails.username,
        password: loginDetails.password,
      };

      const loginResponse = await axios.post(url + endpoint, payload, {
        withCredentials: true,
      });

      if (
        loginResponse.data.status &&
        loginResponse.data.message === "User logged in successfully"
      ) {
        toast.success("User logged in successfully");
        setIsAuthenticated(true);
        await addCartItemsToDb();
        await fetchCartFromDb();
        onClose(); // Close modal immediately, no need to wait
      } else if (loginResponse.data.message === "Invalid credentials") {
        toast.error("Invalid credentials! Try login again");
      } else if (loginResponse.data.message === "User does not exist") {
        toast.error("User not found! Try registering first");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-auto p-5 bg-white rounded-lg ">
      {signState === "New Registration" && (
        <NewRegistration
          props={{
            onClose,
            signState,
            setSignState,
            handleSubmit,
            handleChange,
            data,
          }}
        />
      )}
      {signState === "Verify OTP" && (
        <VerifyOtp
          props={{
            signState,
            setSignState,
            otp,
            handleOTPchange,
            handleOTPSubmit,
            onClose,
          }}
        />
      )}
      {signState === "Set Password" && (
        <SetPassword
          props={{
            signState,
            setSignState,
            handlePassword,
            password,
            handleSetPassword,
            onClose,
          }}
        />
      )}
      {signState === "Verify Email" && (
        <VerifyEmail
          props={{ isWaitingForVerification, setSignState, signState, onClose }}
        />
      )}
      {signState === "Login" && (
        <Login
          props={{
            handleLogin,
            setSignState,
            loginDetails,
            handleSetLogin,
            signState,
            onClose,
          }}
        />
      )}
    </div>
  );
};

export default SignInForm;
