import { useEffect } from "react";
import "./GlobalStyle.scss";
import Aos from "aos";
import "aos/dist/aos.css";

export default function GlobalStyle({ children }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return children;
}
