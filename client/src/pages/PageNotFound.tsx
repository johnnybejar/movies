import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  return (
    <span className="text-2xl">
      Oops! You got here in error! Redirecting to home...
    </span>
  );
}

export default PageNotFound;
