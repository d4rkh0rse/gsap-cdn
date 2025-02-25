document.addEventListener("DOMContentLoaded", function() {
  // Ensure GSAP & ScrollTrigger are available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP or ScrollTrigger not loaded. Check CDN.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

  // Select all elements with data-gsap attribute
  const animatedElements = document.querySelectorAll('[data-gsap]');

  animatedElements.forEach(element => {
    const animationType = element.getAttribute('data-gsap');
    const duration = parseFloat(element.getAttribute('data-duration')) || 1;
    const delay = parseFloat(element.getAttribute('data-delay')) || 0;
    const easing = element.getAttribute('data-easing') || 'power2.out';
    const repeat = parseInt(element.getAttribute('data-repeat')) || 0;
    const yoyo = element.getAttribute('data-yoyo') === 'true';

    const trigger = element.getAttribute('data-trigger') || element;
    const start = element.getAttribute('data-start') || 'top 85%';
    const end = element.getAttribute('data-end') || 'bottom 10%';
    const toggleActions = element.getAttribute('data-toggle-actions') || 'play none none none';
    const markers = element.getAttribute('data-markers') === 'true';

    let animation;

    // Standard GSAP animations
    switch(animationType) {
      case 'fadeIn':
        animation = gsap.from(element, { duration, delay, opacity: 0, y: 20, ease: easing, repeat, yoyo });
        break;
      case 'slideInRight':
        animation = gsap.from(element, { duration, delay, x: 100, opacity: 0, ease: easing, repeat, yoyo });
        break;
      case 'bounce':
        animation = gsap.from(element, { duration, delay, y: -50, opacity: 0, ease: "bounce.out", repeat, yoyo });
        break;
      case 'zoomIn':
        animation = gsap.from(element, { duration, delay, scale: 0, opacity: 0, ease: easing, repeat, yoyo });
        break;
      
      // Scroll-triggered animations
      case 'fadeInScroll':
        animation = gsap.from(element, {
          duration, delay, opacity: 0, y: 20, ease: easing,
          scrollTrigger: { trigger, start, end, toggleActions, markers }
        });
        break;
      case 'slideInRightScroll':
        animation = gsap.from(element, {
          duration, delay, x: 100, opacity: 0, ease: easing,
          scrollTrigger: { trigger, start, end, toggleActions, markers }
        });
        break;
      case 'zoomInScroll':
        animation = gsap.from(element, {
          duration, delay, scale: 0, opacity: 0, ease: easing,
          scrollTrigger: { trigger, start, end, toggleActions, markers }
        });
        break;
      default:
        console.warn(`Unknown animation type: ${animationType}`);
    }

    // Debugging logs
    if (animation) {
      console.log(`GSAP animation '${animationType}' applied to`, element);
    }
  });
});
