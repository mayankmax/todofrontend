import axios from "axios";

const loginService = async (userEmail, password) =>
  await axios.get(`http://localhost:8080/api/login`, {
    params:{
      userEmail,
      userPassword: password
    }
  });

const signupService = async (userName, email, password,confirmPassword) =>
  await axios.post("http://localhost:8080/api/signup", {
    userEmail: email,
    password: password,
   userName:userName,
    confirmPassword : confirmPassword
  });

export { loginService, signupService };
