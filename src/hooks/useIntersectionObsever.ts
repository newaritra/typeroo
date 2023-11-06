import React, { useEffect, useState } from "react";

const useIntersectionObsever = (
  observingElement: HTMLElement | null,
  rootElement?: HTMLElement | null
) => {
  const [intersecting, setIntersecting] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const scrollElement = entries[0];
        console.log("ehey", scrollElement);
        if (scrollElement.isIntersecting) {
          console.log("ehey");
          setIntersecting(true);
        } else {
          setIntersecting(false);
        }
      },
      { root: rootElement, threshold: 1.0 ,rootMargin:"10px"}
    );
    if (observingElement) observer.observe(observingElement);
    return () => observer.disconnect();
  }, [rootElement,observingElement]);
  return intersecting;
};

export default useIntersectionObsever;
