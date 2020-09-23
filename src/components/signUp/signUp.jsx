import React, { useState, useEffect } from "react";
import { BoxLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import "./signUp.scss";
const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (_usr) => {
      if (_usr) {
        history.push("/dashboard");
      } else {
        setLoading(false);
      }
    });
  }, [history]);
  const SignUpWithEmail = (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    if (email.length > 0 && password.length > 0 && fullName.length > 0) {
      setLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const id = res.user.uid;

          const data = {
            userid: id,
            email,
            password,
            fullName,
          };
          db.collection("users")
            .doc(email)
            .set(data)
            .then(() => {
              history.push("/dashboard");
              setLoading(false);
            })
            .catch((dbErr) => {
              setError(dbErr.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError("something went wrong ");
    }
  };

  return (
    <>
      {!loading ? (
        <main className="SignUpContainer">
          <div className="SignUpWrapper">
            <h1>Sign Up</h1>

            <form>
              {error ? (
                <div>
                  <span className="danger">{error}</span>
                </div>
              ) : null}

              <div className="InputContainer">
                <label>FullName:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="InputContainer">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="InputContainer">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>

            <button type="submit" onClick={(e) => SignUpWithEmail(e)}>
              Sign Up
            </button>
            <span>
              if you have account <Link to="/signin">Sign In</Link>
            </span>
          </div>
        </main>
      ) : (
        <BoxLoading CircleToBlockLoading color="#0f4c75" />
      )}
    </>
  );
};
export default SignUp;
