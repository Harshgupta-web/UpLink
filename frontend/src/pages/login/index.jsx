import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'
import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';

function index() {
  const authState = useSelector((state) => state.auth)
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLoginMethod, setUserLoginMethod] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push('/dashboard')
    }
  }, [authState.loggedIn])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    dispatch(emptyMessage());
  }, [userLoginMethod])

  useEffect(() => {
    if (
      authState.isSuccess &&
      authState.message?.message === "Registration is successfull, Please Login now."
    ) {
      setUserLoginMethod(true);
      setPassword("");
      setUsername("");
      setName("");
    }
  }, [authState.isSuccess, authState.message]);

  const handleRegister = () => {
    console.log("Registering...");
    dispatch(registerUser({ username, password, email, name }));
  }

  const handleLogin = () => {
    console.log("Login User");
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.gridOverlay}></div>
      <div className={styles.glowTop}></div>
      <div className={styles.glowLeft}></div>
      <div className={styles.glowBottom}></div>

      <div className={styles.authShell}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <span className={styles.badge}>
              {userLoginMethod ? "Welcome back" : "Start here"}
            </span>

            <h1 className={styles.title}>
              {userLoginMethod ? "Sign in" : "Create account"}
            </h1>

            <p className={styles.subtitle}>
              {userLoginMethod
                ? "Access your network and continue where you left off."
                : "Join the platform and start building meaningful connections."}
            </p>

            {authState?.message?.message && (
              <p
                className={styles.message}
                style={{ color: authState.isError ? "#ef4444" : "#22c55e" }}
              >
                {authState.message.message}
              </p>
            )}
          </div>

          <div className={styles.formArea}>
            {!userLoginMethod && (
              <div className={styles.doubleRow}>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Username"
                />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              type="email"
              placeholder="Email address"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              type="password"
              placeholder="Password"
            />

            <button
              type="button"
              onClick={() => {
                if (userLoginMethod) {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }}
              className={styles.primaryBtn}
            >
              {userLoginMethod ? "Sign In" : "Create Account"}
            </button>
          </div>

          <div className={styles.switchRow}>
            <p className={styles.switchText}>
              {userLoginMethod
                ? "Don’t have an account?"
                : "Already have an account?"}
            </p>

            <button
              type="button"
              onClick={() => setUserLoginMethod(!userLoginMethod)}
              className={styles.switchBtn}
            >
              {userLoginMethod ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index