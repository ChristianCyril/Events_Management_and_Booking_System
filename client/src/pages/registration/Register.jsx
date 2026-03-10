import { useEffect, useState } from "react";
import "./Register.css";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { firstname: "", lastname: "", email: "", password: "", conPassword: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });   //tryin to replace just that specific value the name serves as the key
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      try {
       const load = {firstname: formValues.firstname, lastname: formValues.lastname, email: formValues.email, password: formValues.password};
       const response = await api.post('/register',load);
       console.log(response.data);
       if(response.data){
        setformValues(initialValues);
        navigate('/login');
       }
       
      } catch (error) {
        console.log(error.message);
      }
    }
  }


  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (values.firstname.length < 2) {
      errors.firstname = "Name must be at least 2 characters"
    }
    else if (!/^[a-zA-Z]/.test(values.firstname)) {
      errors.firstname = "Name should not begin with Number"
    }
    if (values.lastname.length < 2) {
      errors.lastname = "Name must be at least 2 characters"
    }
    else if (!/^[a-zA-Z]/.test(values.lastname)) {
      errors.lastname = "Name should not begin with Number"
    }
    if (!regex.test(values.email)) {
      errors.email = "Please provide a valid email address"
    }

    if (values.password.length < 6 || values.conPassword.length < 6) {
      errors.password = "Passwords length must be greater than 6"
    } else if (values.password !== values.conPassword) {
      errors.password = "Passwords do not match"
    }
    return errors
  }

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label>First Name</label>
          <p className="error-message">{formErrors.firstname}</p>
          <input type="text"
            name="firstname"
            placeholder="Enter first name"
            value={formValues.firstname}
            onChange={handleChange}
            required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <p className="error-message">{formErrors.lastname}</p>
          <input type="text"
            name="lastname"
            placeholder="Enter last name"
            value={formValues.lastname}
            onChange={handleChange}
            required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <p className="error-message">{formErrors.email}</p>
          <input type="email"
            name="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleChange}
            required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <p className="error-message">{formErrors.password}</p>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <p className="error-message">{formErrors.password}</p>
          <input
            name="conPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={formValues.conPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="showPassword"
            onChange={() => setShowPassword(prev => !prev)}
          />
          <label htmlFor="showPassword">Show password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;