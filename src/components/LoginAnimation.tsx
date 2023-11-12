"use client";
import Lottie from "lottie-react";
import loginAnimation from "../assets/LoginAnimation.json";

const LoginAnimation = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const animationContainerStyle = {
    maxWidth: "400px",
    width: "100%",
  };
  return (
   <div style={containerStyle}>
      <Lottie
        animationData={loginAnimation}
        loop={true}
        style={animationContainerStyle}
      />
    </div>
  )
 
};

export default LoginAnimation;
