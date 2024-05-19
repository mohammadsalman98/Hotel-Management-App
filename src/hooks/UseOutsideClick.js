import { useEffect, useRef } from "react";

export default function UseOutsideClick(close, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("the modal window is closed ");
        close();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing); // for handling bubble up behaviour and replace it with capture
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [close]);
  return ref;
}
