"use client";
import Lottie from "lottie-react";
import LoadingCarAnimation from "../assets/LoadingCarAnimation.json";

const LoadingAnimation = () => {
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
        animationData={LoadingCarAnimation}
        loop={true}
        style={animationContainerStyle}
      />
    </div>
  );
};

export default LoadingAnimation;
