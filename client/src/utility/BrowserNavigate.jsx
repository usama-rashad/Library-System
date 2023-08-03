import { Navigate } from "react-router-dom";

import React, { useEffect } from "react";

// Hooks
import useLoginState from "../hooks/useLoginState";

function BrowserNavigate({ children }) {
  const { isAdmin } = useLoginState();

  useEffect(() => {
    console.log("Admin state " + isAdmin);
  }, [isAdmin]);

  if (isAdmin) {
    return children;
  } else {
    <Navigate to="/" replace={true} />;
  }
}

export default BrowserNavigate;
