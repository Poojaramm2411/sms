import { useState } from "react";
import { useNavigate } from "react-router-dom";
import studyImg from "../assets/images/std_login.png";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [passwordHint, setPasswordHint] = useState("");

  // PASSWORD VALIDATION
  const validatePassword = (password) => {
    const rules = [];

    if (password.length < 8) rules.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) rules.push("One uppercase letter");
    if (!/[a-z]/.test(password)) rules.push("One lowercase letter");
    if (!/[!@#$%^&*]/.test(password)) rules.push("One special character");

    return rules;
  };

  //  HANDLE PASSWORD CHANGE
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, password: value });

    const errors = validatePassword(value);
    setPasswordHint(errors.join(", "));

    //  Show warning toast only if invalid
    if (value && errors.length > 0) {
      toast.dismiss();
      toast.warning("Weak Password ");
    }
  };

  //  HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      console.log("LOGIN RESPONSE:", JSON.stringify(data)); 

      const token = data.token || data.data?.token || data.data;

      if (token && typeof token === "string") {
        localStorage.setItem("token", token);

        toast.success("Login Successful ");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      toast.error(err.message || "Login failed ❌");
      
    }
  };

  return (
    <div className="login-container">
      
      {/* LEFT IMAGE */}
      <div className="login-image">
        <img src={studyImg} alt="study" />
      </div>

      {/* RIGHT FORM */}
      <div className="login-form">
        <div className="login-card">
          
          <h2>Student Management</h2>

          <form onSubmit={handleSubmit}>
            
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={handlePasswordChange}
            />

            {/* PASSWORD RULE MESSAGE */}
            {form.password && passwordHint && (
              <p className="password-hint">{passwordHint}</p>
            )}

            <button type="submit">Login</button>

            {/* FORGOT PASSWORD */}
            <div className="extra-links">
              <span className="forgot">Forgot Password?</span>
            </div>

          </form>

          {/* ERROR TEXT */}
          {/* {error && <p className="error-text">{error}</p>} */}
        </div>
      </div>
    </div>
  );
}

export default Login;