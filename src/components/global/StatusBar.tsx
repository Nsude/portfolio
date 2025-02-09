import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const StatusBar = () => {
  const location = useLocation();

  useEffect(() => {
    const themeColor = document.querySelector("meta[name=theme-color]");

    if (themeColor) {
      switch (location.pathname.toLowerCase()) {
        case "/junk-lab":
          themeColor.setAttribute("content", "#0A0A0A");
          break;
        default:
          themeColor.setAttribute("content", "#DDD");
      }
    }
  }, [location.pathname]);

  return null;
}

export default StatusBar;