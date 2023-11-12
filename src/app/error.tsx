"use client";
import Lottie from "lottie-react";
import somethingWentWrongAnimation from "../app/assets/SomethingWentWrongAnimation.json";

const ErrorPage = () => {
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
        animationData={somethingWentWrongAnimation}
        loop={true}
        style={animationContainerStyle}
      />
    </div>
  );
};

export default ErrorPage;
