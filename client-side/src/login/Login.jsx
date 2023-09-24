import { useState } from "react";
import "./Login.css";

function Login() {
  const [hideRegister, setHideRegister] = useState(true);

  const [adminFullName, setAdminFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        // "X-Api-Key": "54/p8rt+p9QhgeN9G/Z5Sg==wrJ1tX7OT2EAdJcR",
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
    // const answerGuide = showLetters(data[0]);
    // let numberOfWords = countNumberOfWords(answerGuide);
    // questionsText.innerHTML = `<p class="display-questions">${
    //   data[0].question
    // }</p>
    //   <p class="answer-length">Answer is ${numberOfWords} ${
    //   numberOfWords == 1 ? "word" : "words"
    // } with ${data[0].answer.length} letters.</p>
    //   <p class="answer-length">${answerGuide.split("").join(",")}</p>`;
    console.log(data);
  }

  const clickHandler = () => {
    setHideRegister(!hideRegister);
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
                      onInput={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="floatingPassword"
                      onInput={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="form-button btn text-white"
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
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email"
                      id="floatingInput"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      id="floatingPassword"
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="form-button btn text-white"
                      // onClick={registrationHandler}
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
