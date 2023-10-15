import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { MyContext } from "../MyContext";
import "./Login.css";
import Swal from "sweetalert2";

function Login() {
  const { updateAdminEmail } = useContext(MyContext);
  const navigate = useNavigate();
  const [hideRegister, setHideRegister] = useState(true);

  const [adminFullName, setAdminFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  async function loginHandler(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.message == "Login Success!") {
      navigate("/");
      handleEmailUpdate(email);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Success!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Incorrect email or password!",
        showConfirmButton: true,
        timer: 15000,
      });
      setPassword("");
    }

    // data.message == "Login Success!" ? navigate("/") : alert("Login Failed!");
  }

  async function registrationHandler(event) {
    event.preventDefault();
    if (!adminFullName || !email || !password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please input Full name, Email, and Password!",
        showConfirmButton: true,
        timer: 15000,
      });
      return;
    }
    if (!emailHandler(email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid Email!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        inputRef.current.focus();
      }, 1800);
      return;
    }
    const response = await fetch("http://localhost:8080/addAdmin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        fullName: adminFullName,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registered Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setAdminFullName("");
    setEmail("");
    setPassword("");
  }

  const handleEmailUpdate = (email) => {
    updateAdminEmail(email);
  };

  const clickHandler = () => {
    setHideRegister(!hideRegister);
    setEmail("");
    setPassword("");
    setAdminFullName("");
  };

  function emailHandler(input) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input)) {
      setEmail(input);
      return true;
    }
    return false;
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row justify-content-center align-items-center inner-row">
          <div className="col-lg-5 col-md-7">
            {hideRegister ? (
              <div className="form-box login-form p-md-5 p-3">
                <div className="form-title">
                  <h2 className="fw-bold mb-3">Login</h2>
                </div>
                <form action="">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control form-control-md"
                      placeholder="Email"
                      id="floatingInput"
                      value={email}
                      onInput={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-md"
                      placeholder="Password"
                      id="floatingPassword"
                      value={password}
                      onInput={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Password</label>
                  </div>
                  <div className="mt-3">
                    <button
                      className="form-button button1"
                      onClick={loginHandler}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="mt-3 form-nav">
                  <span>
                    Don&apos;t have an account?
                    <a
                      className="p-0 border-0 bg-transparent signup-show"
                      onClick={clickHandler}
                    >
                      &nbsp;Sign Up
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <div className="form-box registration-form p-md-5 p-3">
                <div className="form-title">
                  <h2 className="fw-bold mb-3">Create your account</h2>
                </div>
                <form action="">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Full name"
                      id="floatingInput"
                      value={adminFullName}
                      onInput={(e) => setAdminFullName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Full name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      ref={inputRef}
                      placeholder="Email"
                      id="floatingInput"
                      value={email}
                      onInput={(e) => setEmail(e.target.value)}
                      // onBlur={(e) => emailHandler(e.target.value, false)}
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="floatingPassword"
                      value={password}
                      onInput={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Password</label>
                  </div>
                  <div className="mt-3">
                    <button
                      className="form-button button1"
                      onClick={registrationHandler}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="mt-3 register-nav">
                  <span>
                    Already have an account?
                    <a
                      className="p-0 border-0 bg-transparent login-show"
                      onClick={clickHandler}
                    >
                      &nbsp;Login
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
