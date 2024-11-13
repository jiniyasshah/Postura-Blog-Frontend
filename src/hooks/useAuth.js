// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Only fetch user data if it hasn't been fetched yet and user is null
    if (!hasFetched && !user) {
      dispatch(getCurrentUser()).then(() => setHasFetched(true));
    }
  }, [dispatch, user, hasFetched]);

  return { user, loading };
};

export default useAuth;
