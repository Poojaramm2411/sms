import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import studyImg from "../assets/images/std_login.png";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      console.log("Login Success:", data);

      // optional: store token
      // localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={studyImg} alt="study" />
      </div>
      <div className="login-form">
        <h2>Student Management</h2>
        <form onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} /> */}
          <input type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Login</button>
          
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* <p>Don't have account? <Link to="/signup">Sginup</Link></p> */}
      </div>
    </div>
  );
}

export default Login;
