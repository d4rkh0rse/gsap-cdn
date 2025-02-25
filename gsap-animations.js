class GSAPAnimation extends HTMLElement {
  constructor() {
    super();
    this.animateElement = this.animateElement.bind(this);
  }

  connectedCallback() {
    // Ensure GSAP & ScrollTrigger are available
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.error("GSAP or ScrollTrigger not found. Make sure they are loaded.");
      return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      this.style.opacity = 1;
      this.style.transform = 'none';
      return;
    }

    // Get attributes from Webflow elements
    this.animationType = this.getAttribute('data-gsap');
    this.duration = parseFloat(this.getAttribute('data-duration')) || 1;
    this.delay = parseFloat(this.getAttribute('data-delay')) || 0;
    this.easing = this.getAttribute('data-easing') || 'power1.out';
    this.repeat = parseInt(this.getAttribute('data-repeat')) || 0;
    this.yoyo = this.getAttribute('data-yoyo') === 'true';
    this.trigger = this.getAttribute('data-trigger') || null;
    this.start = this.getAttribute('data-start') || 'top 80%';
    this.end = this.getAttribute('data-end') || 'bottom 20%';
    this.toggleActions = this.getAttribute('data-toggle-actions') || 'play none none none';
    this.markers = this.getAttribute('data-markers') === 'true';

    // Initialize GSAP animation
    this.animateElement();
  }

  animateElement() {
    if (!this.animationType) {
      console.error("No animation type provided for", this);
      return;
    }

    const animations = {
      fadeIn: () => gsap.from(this, { duration: this.duration, delay: this.delay, opacity: 0, y: 20, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo }),
      slideInRight: () => gsap.from(this, { duration: this.duration, delay: this.delay, x: 100, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo }),
      rotateIn: () => gsap.from(this, { duration: this.duration, delay: this.delay, rotation: -360, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo }),
      scaleUp: () => gsap.from(this, { duration: this.duration, delay: this.delay, scale: 0, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo }),

      fadeInScroll: () => {
        gsap.from(this, {
          duration: this.duration,
          delay: this.delay,
          opacity: 0,
          y: 20,
          ease: this.easing,
          scrollTrigger: {
            trigger: this,
            start: this.start,
            end: this.end,
            toggleActions: this.toggleActions,
            markers: this.markers,
          }
        });
      },

      slideInRightScroll: () => {
        gsap.from(this, {
          duration: this.duration,
          delay: this.delay,
          x: 100,
          opacity: 0,
          ease: this.easing,
          scrollTrigger: {
            trigger: this,
            start: this.start,
            end: this.end,
            toggleActions: this.toggleActions,
            markers: this.markers,
          }
        });
      },
    };

    if (animations[this.animationType]) {
      animations[this.animationType]();
    } else {
      console.error(`Unknown GSAP animation type: ${this.animationType}`);
    }
  }
}

// Define the custom element
customElements.define("gsap-animation", GSAPAnimation);
