// gsap-animations.js

class GSAPAnimation extends HTMLElement {
  constructor() {
    super();
    
    // Bind methods
    this.animateElement = this.animateElement.bind(this);
  }

  connectedCallback() {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      this.style.opacity = 1;
      this.style.transform = 'none';
      return;
    }

    // Get animation attributes
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

    // Initialize GSAP timeline
    this.timeline = gsap.timeline();

    // Call the animation function
    this.animateElement();
  }

  animateElement() {
    const animations = {
      fadeIn: () => {
        this.timeline.from(this, {duration: this.duration, delay: this.delay, opacity: 0, y: 20, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      fadeOut: () => {
        this.timeline.to(this, {duration: this.duration, delay: this.delay, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      slideInRight: () => {
        this.timeline.from(this, {duration: this.duration, delay: this.delay, x: 100, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      slideOutLeft: () => {
        this.timeline.to(this, {duration: this.duration, delay: this.delay, x: -100, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      bounce: () => {
        this.timeline.from(this, {duration: this.duration, delay: this.delay, y: -50, opacity: 0, ease: "bounce.out", repeat: this.repeat, yoyo: this.yoyo});
      },
      rotateIn: () => {
        this.timeline.from(this, {duration: this.duration, delay: this.delay, rotation: -360, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      scaleUp: () => {
        this.timeline.from(this, {duration: this.duration, delay: this.delay, scale: 0, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      zoomIn: () => {
        this.timeline.from(this, {duration: this.duration, delay: this.delay, scale: 0, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo});
      },
      fadeInScroll: () => {
        gsap.from(this, {
          duration: this.duration, delay: this.delay, opacity: 0, y: 20, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo,
          scrollTrigger: {
            trigger: this,
            start: this.start,
            end: this.end,
            toggleActions: this.toggleActions,
            markers: this.markers,
          },
        });
      },
      slideInRightScroll: () => {
        gsap.from(this, {
          duration: this.duration, delay: this.delay, x: 100, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo,
          scrollTrigger: {
            trigger: this,
            start: this.start,
            end: this.end,
            toggleActions: this.toggleActions,
            markers: this.markers,
          },
        });
      },
      slideOutLeftScroll: () => {
        gsap.to(this, {
          duration: this.duration, delay: this.delay, x: -100, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo,
          scrollTrigger: {
            trigger: this,
            start: this.start,
            end: this.end,
            toggleActions: this.toggleActions,
            markers: this.markers,
          },
        });
      },
      rotateInScroll: () => {
        gsap.from(this, {
          duration: this.duration, delay: this.delay, rotation: -360, opacity: 0, ease: this.easing, repeat: this.repeat, yoyo: this.yoyo,
          scrollTrigger: {
            trigger: this,
            start: this.start,
            end: this.end,
            toggleActions: this.toggleActions,
            markers: this.markers,
          },
        });
      }
    };

    if (animations[this.animationType]) {
      animations[this.animationType]();
    }
  }
}

customElements.define('gsap-animation', GSAPAnimation);
