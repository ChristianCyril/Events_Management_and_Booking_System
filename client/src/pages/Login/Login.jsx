import { useEffect, useState } from "react";
import "./Login.css";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const innitialValue = {email:"",password:""}
  const [formValues, setFormValues] = useState(innitialValue);
  const [formErrors, setFormErrors] = useState({});
  const [invalidCred, setInvalidCred] = useState(false);
  const [somethingWrong, setSomethingWrong] = useState(false);
  const {setAuth, auth} = useAuth();
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormValues({...formValues,[name]:value});
  }

  const validate=(values)=>{
    const error = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if(!regex.test(values.email)){
      error.email = "Please provide a valid email address"
    }
    if(values.password.length<6){
      error.password = "Password must be more than 6 characters"
    }
    return error;
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    if(Object.keys(formErrors).length === 0){
      try{
        const response = await api.post('/login',formValues);
        if(response.data){
          setAuth(response.data);
        }
        navigate('/bookings');
      }catch(error){
        if(error.response?.status === 401){
          setInvalidCred(true);
          setTimeout(()=>{
            setInvalidCred(false);
          },2000)
        }
        setSomethingWrong(true);
        setTimeout(()=>{
            setSomethingWrong(false);
          },2000)
      }
    }
  }
  useEffect(()=>{console.log(auth)},[auth])
  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <p className="error-message">{formErrors.email}</p>
          <input
            name= "email"
            value={formValues.email}
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <p className="error-message">{formErrors.password}</p>
          <input
            name="password"
            value={formValues.password}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
          {invalidCred?<p className="error-message">Wrong Credentials Please try again</p>:<></>}
          {somethingWrong?<p className="error-message">Something went wrong please try again later</p>:<></>}
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="showPassword"
            onChange={() => setShowPassword(prev => !prev)}
          />
          <label htmlFor="showPassword">Show password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;