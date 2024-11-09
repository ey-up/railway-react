import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoPage.css";

const NoPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="no-page-container">
      <h1 className="no-page-title">404</h1>
      <p className="no-page-subtitle">Oops! Page Not Found</p>
      <button className="go-home-button" onClick={handleGoHome}>
        Go Home
      </button>
    </div>
  );
};

export default NoPage;
