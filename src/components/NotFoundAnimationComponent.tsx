"use client";

import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "../app/assets/Not Found Animation.json";

const NotFoundAnimationComponent = () => {
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
        animationData={notFoundAnimation}
        loop={true}
        style={animationContainerStyle}
      />
    </div>
  );
};

export default NotFoundAnimationComponent;
