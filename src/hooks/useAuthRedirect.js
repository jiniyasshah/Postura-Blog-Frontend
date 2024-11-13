// src/hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuthRedirect = (redirectPath = "/dashboard", loadingTime = 1000) => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is authenticated
    if (!loading && user) {
      setTimeout(() => navigate(redirectPath), loadingTime);
    }
  }, [user, loading, navigate, redirectPath]);

  return { user, loading };
};

export default useAuthRedirect;
