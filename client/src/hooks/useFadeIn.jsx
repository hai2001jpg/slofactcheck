'use client';
import { useEffect } from 'react';

export default function useFadeIn(threshold = 0.1) {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-in-hidden');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target); // stops observing once visible
          }
        });
      },
      { threshold }
    );

    fadeEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);
}
