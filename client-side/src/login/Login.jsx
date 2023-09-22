import { useState } from "react";
import "./Login.css";

function Login() {
  const [hideLogin, setHideLogin] = useState(false);
  const [hideRegister, setHideRegister] = useState(true);

  const login = () => {
    setHideLogin(false);
    setHideRegister(true);
  };

  const register = () => {
    setHideLogin(true);
    setHideRegister(false);
  };
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
                      className="form-control form-control-sm"
                      placeholder="Email"
                      id="floatingInput"
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="floatingPassword"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="mt-3">
                    <button className="btn primaryBg text-white">Login</button>
                  </div>
                </form>
                <div className="mt-3">
                  <span>
                    Don`&apos`t have account?
                    <button
                      className="p-0 border-0 bg-transparent primaryColor signup-show"
                      onClick={register}
                    >
                      Sign Up
                    </button>
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
                    />
                    <label htmlFor="floatingInput">Full name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email"
                      id="floatingInput"
                    />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="floatingPassword"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="mt-3">
                    <button className="btn primaryBg text-white">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="mt-3">
                  <span>
                    Already have an account?
                    <button
                      className="p-0 border-0 bg-transparent primaryColor login-show"
                      onClick={login}
                    >
                      Login
                    </button>
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
