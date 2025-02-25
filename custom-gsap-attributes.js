// custom-gsap-attributes.js
const GSAPAttributes = (() => {
  const presets = {
    fadeIn: { opacity: 0, yPercent: 20, ease: "power2.out" },
    slideUp: { y: 100, opacity: 0, ease: "power4.out" }
  };

  // Webflow-specific DOM observer
  function observeDOM() {
    new MutationObserver(() => {
      setTimeout(initAnimations, 100); // Wait for Webflow rebind
    }).observe(document.body, { subtree: true, childList: true });
  }

  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('[data-gsap]').forEach(el => {
      if (el._gsap) return; // Prevent duplicates
      el._gsap = true;

      const type = el.dataset.gsap;
      const duration = el.dataset.duration || 1;
      const trigger = el.dataset.trigger || "top 80%";
      const stagger = parseStagger(el.dataset.stagger);
      const vars = parseVars(el.dataset.vars);

      // Webflow fix: Force opacity:0 initially
      if (type === 'fadeIn' && !el.style.opacity) {
        gsap.set(el, { opacity: 0 });
      }

      const animation = gsap.from(el.dataset.stagger ? el.children : el, {
        ...presets[type],
        ...vars,
        duration,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: trigger,
          toggleActions: "play none none reverse"
        }
      });

      // Timeline handler
      if (el.dataset.timeline) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: trigger
          }
        });
        
        Array.from(el.children).forEach((child, i) => {
          const position = child.dataset.position || i * 0.3;
          tl.from(child, {
            ...presets[child.dataset.gsap],
            duration: child.dataset.duration || duration
          }, position);
        });
      }
    });
  }

  // Helpers
  function parseStagger(val) {
    try { return JSON.parse(val); } 
    catch { return val ? parseFloat(val) : undefined; }
  }

  function parseVars(val) {
    try { return val ? JSON.parse(val.replace(/'/g, '"')) : {}; } 
    catch(e) { console.error('GSAP Vars Error:', e); return {}; }
  }

  return {
    init() {
      initAnimations();
      observeDOM(); // Critical for Webflow CMS
    }
  };
})();

// Webflow DOM fix
window.Webflow && window.Webflow.push(() => GSAPAttributes.init());
