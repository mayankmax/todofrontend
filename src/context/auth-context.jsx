import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { loginService, signupService } from "../services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
  const [token, setToken] = useState(localStorageToken?.token || "");
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user);

  const signupHandler = async ({ userName, userEmail, password, confirmPassword }) => {
    try {
      const response = await signupService(
        userName,
        userEmail,
        password,
        confirmPassword
      );

      if (response.data.status === "success") {
        const { data } = response.data;

        console.log(data);

        localStorage.setItem("loginDetails", JSON.stringify({ user: data }));
        setToken(data.id);
        setCurrentUser(data);

        // Display a success toast notification
        toast.success(`Hi, ${data.userName}!`, {
          icon: "👋",
        });

        // Navigate to the homepage
        navigate("/", { replace: true });
      } else {
        // Handle unexpected status codes
        console.error(`Unexpected status code: ${response.data.message}`);

        // Display an error toast notification
        toast.error("An unexpected error occurred while signing you up.");
      }
    } catch (error) {
      // Handle network or other errors
     
      console.error(error);

      // Display an error toast notification
      toast.error("There was an error signing you up.");
    }
  };

  const loginHandler = async ({ userEmail, password }) => {
    try {
      const response = await loginService(userEmail, password);

      const{data} = response.data;
      console.log(response.data.status);
      
      if(response.data.status === "success"){
        localStorage.setItem("loginDetails",JSON.stringify({user:data}));
      
        setToken(data.id);
        setCurrentUser(data);

        // Display a success toast notification
        toast.success(`Welcome back, 'mayank'!`, {
          icon: "👋",
        });

        console.log(`Hello ${data.userName}`);

        // Navigate to the homepage
        //navigate(location?.state?.from?.pathname || "/", { replace: true });
      }
    } catch (error) {
      console.error(error);

      // Display an error toast notification
      toast.error("User does not exist! Please sign up.");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginDetails");
    setToken(null);
    setCurrentUser(null);

    // Display a success toast notification
    toast.success("Logged out successfully!");

    // Navigate to the logout page
    navigate("/logout");
  };

  return (
    <AuthContext.Provider
      value={{
        signupHandler,
        token,
        currentUser,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
