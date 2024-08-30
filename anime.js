import anime from 'animejs/lib/anime.es.js';

export default {
  mounted() {
    anime({
      targets: '.container',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeOutExpo',
    });
  },
};
