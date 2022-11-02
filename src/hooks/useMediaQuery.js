import { useState, useEffect } from "react";

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const mq = window.matchMedia("screen and (max-width: 768px)");

    const handleResize = (e) => setIsMobile(e.matches);

    mq.addEventListener("change", handleResize);
    return () => mq.removeEventListener("change", handleResize);
  }, []);

  return { isMobile };
};

export default useMediaQuery;
