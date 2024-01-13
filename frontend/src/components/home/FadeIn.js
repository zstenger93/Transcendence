import { useRef, useState, useEffect } from 'react';

// THIS IS A CUSTOM HOOK TO FADE IN ELEMENTS ON THE HOME PAGE
export function useOnScreen() {
  const ref = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  const checkIntersect = ([entry], observer) => {
    setIntersecting(entry.isIntersecting);
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(checkIntersect, {
      threshold: 0.1,
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting];
}