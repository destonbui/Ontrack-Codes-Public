import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Protected({ target, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (target === "App") {
        if (!user) {
          navigate("/login");
        }
      }
      if (target === "Login") {
        if (user) {
          navigate("/");
        }
      }
    });
  }, []);

  return children;
}

export default Protected;
