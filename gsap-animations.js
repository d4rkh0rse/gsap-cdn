// gsap-animations.js

document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with the data-gsap attribute
  const animatedElements = document.querySelectorAll('[data-gsap]');

  animatedElements.forEach(element => {
    const animationType = element.getAttribute('data-gsap');
    const duration = parseFloat(element.getAttribute('data-duration')) || 1;
    const delay = parseFloat(element.getAttribute('data-delay')) || 0;
    const easing = element.getAttribute('data-easing') || 'none';
    const repeat = parseInt(element.getAttribute('data-repeat')) || 0;
    const yoyo = element.getAttribute('data-yoyo') === 'true';

    // Define your animations here
    let animation;

    switch(animationType) {
      case 'fadeIn':
        animation = gsap.from(element, {duration: duration, delay: delay, opacity: 0, y: 20, ease: easing, repeat: repeat, yoyo: yoyo});
        break;
      case 'slideInRight':
        animation = gsap.from(element, {duration: duration, delay: delay, x: 100, opacity: 0, ease: easing, repeat: repeat, yoyo: yoyo});
        break;
      case 'bounce':
        animation = gsap.from(element, {duration: duration, delay: delay, y: -50, opacity: 0, ease: "bounce.out", repeat: repeat, yoyo: yoyo});
        break;
      case 'zoomIn':
        animation = gsap.from(element, {duration: duration, delay: delay, scale: 0, opacity: 0, ease: easing, repeat: repeat, yoyo: yoyo});
        break;
      // Add more animation types as needed
      default:
        console.log(`Unknown animation type: ${animationType}`);
    }

    // Optional: Add a callback if needed
    if (animation) {
      animation.eventCallback("onComplete", () => {
        console.log(`Animation ${animationType} completed on ${element}`);
      });
    }
  });
});
