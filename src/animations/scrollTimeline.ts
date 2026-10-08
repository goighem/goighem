import gsap from 'gsap';

export function animateReveal(element: HTMLElement | null, delay = 0) {
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(element, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay, ease: 'power3.out' });
}
