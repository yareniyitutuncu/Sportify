import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router'dan useNavigate hook'unu ekleyin
import "./AuthPage.css";
import { registerUser, loginUser, resetPassword } from "../authService";

const AuthPage = () => {
  const navigate = useNavigate(); // navigate fonksiyonunu tanımlıyoruz
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Parola görünürlük kontrolü için state ekliyoruz

  // E-posta doğrulama fonksiyonu
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit bir e-posta formatı kontrolü
    return emailRegex.test(email);
  };

  const handleAuth = async () => {
    setMessage("");

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (isForgotPassword) {
      try {
        await resetPassword(email);
        setMessage("Password reset email sent! Check your inbox.");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setMessage("No account found with this email.");
        } else {
          setMessage(`Error: ${error.message}`);
        }
      }
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      try {
        await registerUser(email, password);
        setMessage("Account created successfully! You can now sign in.");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setMessage("Email already in use. Please try signing in.");
        } else if (error.code === "auth/weak-password") {
          setMessage("Password is too weak. Use at least 6 characters.");
        } else {
          setMessage(`Error: ${error.message}`);
        }
      }
    } else {
      try {
        await loginUser(email, password);
        setMessage("Sign in successful! Welcome back.");
        
        // Yönlendirme işlemi burada yapılacak
        navigate("/onboarding"); // Giriş başarılı olduğunda /onboarding sayfasına yönlendiriyoruz
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          setMessage("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setMessage("No account found with this email.");
        } else {
          setMessage(`Error: ${error.message}`);
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2 className="auth-title">
          {isForgotPassword
            ? "Reset Password"
            : isSignUp
            ? "Sign Up"
            : "Sign In"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        {!isForgotPassword && (
          <>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}  // showPassword state'ine göre parola tipi değişiyor
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)} // Parola görünürlük kontrolü
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {isSignUp && (
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            )}
          </>
        )}
        <button onClick={handleAuth} className="auth-button">
          {isForgotPassword
            ? "Send Reset Email"
            : isSignUp
            ? "Sign Up"
            : "Sign In"}
        </button>
        {!isForgotPassword && (
          <p className="auth-toggle">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account yet?"}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        )}
        {!isSignUp && !isForgotPassword && (
          <p
            className="auth-forgot-password"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot Password?
          </p>
        )}
        {isForgotPassword && (
          <p
            className="auth-back"
            onClick={() => {
              setIsForgotPassword(false);
              setMessage("");
            }}
          >
            Back to Sign In
          </p>
        )}
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
