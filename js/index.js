

  (function () {
    const header = document.getElementById('tsHeader');
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    function onScroll() {
      const currentY = window.pageYOffset;

      if (currentY > 10) {
        header.classList.add('ts-header-scrolled');
      } else {
        header.classList.remove('ts-header-scrolled');
      }

      
      if (currentY > lastScrollY && currentY > 150) {
        header.classList.add('ts-header-hidden');
      } else {
        header.classList.remove('ts-header-hidden');
      }

      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    });
  })();

document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById('tsHero');
  if (!el) return;
  new bootstrap.Carousel(el, {
    interval: 7000,
    pause: 'hover',
    wrap: true,
    touch: true
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".hero-section");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          hero.classList.add("hero-visible");
          observer.unobserve(hero);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(hero);
  });


//  TESTIMONIYAL =========

(function(){
  const wrap = document.getElementById('tsCarousel');
  if (!wrap) return;

  const slidesWrap = wrap.querySelector('.ts-slides');
  const slides = Array.from(wrap.querySelectorAll('.ts-slide'));
  const prevBtn = wrap.querySelector('.ts-prev');
  const nextBtn = wrap.querySelector('.ts-next');
  const dotsContainer = wrap.querySelector('.ts-dots');

  let current = 0;
  const total = slides.length;
  const autoplayInterval = 6000;
  let timer = null;

  
  for (let i=0;i<total;i++){
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to testimonial ${i+1}`);
    btn.dataset.index = i;
    btn.addEventListener('click', ()=> goTo(parseInt(btn.dataset.index,10)));
    dotsContainer.appendChild(btn);
  }
  const dots = Array.from(dotsContainer.children);





  function update(){
    const x = -current * 100;
    slidesWrap.style.transform = `translateX(${x}%)`;
    dots.forEach((d,i)=> {
      d.classList.toggle('ts-active', i===current);
      d.setAttribute('aria-selected', i===current ? 'true' : 'false');
    });
  }

  function goTo(i){
    current = (i + total) % total;
    update();
    restartTimer();
  }

  prevBtn && prevBtn.addEventListener('click', ()=> goTo(current-1));
  nextBtn && nextBtn.addEventListener('click', ()=> goTo(current+1));

  
  wrap.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowLeft') goTo(current-1);
    if (e.key === 'ArrowRight') goTo(current+1);
  });


  function startTimer(){ stopTimer(); timer = setInterval(()=> goTo(current+1), autoplayInterval); }
  function stopTimer(){ if (timer){ clearInterval(timer); timer = null; } }
  function restartTimer(){ stopTimer(); startTimer(); }

  wrap.addEventListener('mouseenter', stopTimer);
  wrap.addEventListener('mouseleave', startTimer);
  wrap.addEventListener('focusin', stopTimer);
  wrap.addEventListener('focusout', startTimer);


  let touchStartX = 0;
  slidesWrap.addEventListener('touchstart', (e)=> { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
  slidesWrap.addEventListener('touchend', (e)=> {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 40) goTo(current-1);
    else if (touchStartX - touchEndX > 40) goTo(current+1);
  }, {passive:true});

 
  update();
  startTimer();


  window.tsTestimonialCarousel = { goTo, startTimer, stopTimer };
})();



(function(){

  const wrapper = document.querySelector('.tscta-wrapper');
  if (!wrapper) return;


  const cards = Array.from(wrapper.querySelectorAll('.tscta-card'));
 
  cards.forEach((c, idx) => c.setAttribute('data-stagger', (idx+1)));

  const ioOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', 
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
     
        cards.forEach((card, i) => {
          setTimeout(()=> card.classList.add('is-visible'), i * 90);
        });
        
        obs.unobserve(entry.target);
      }
    });
  }, ioOptions);

  observer.observe(wrapper);

  wrapper.style.setProperty('--tscta-parallax-y', '0px');

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(()=> {
        const rect = wrapper.getBoundingClientRect();
      
        const viewportCenter = window.innerHeight / 2;
        const wrapperCenter = rect.top + rect.height / 2;
    
        const dist = wrapperCenter - viewportCenter;
        
        const move = -(dist * 0.03); 
       
        const clamped = Math.max(Math.min(move, 30), -30);
        wrapper.style.setProperty('--tscta-parallax-y', clamped + 'px');
        ticking = false;
      });
      ticking = true;
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);

})();


document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
  );

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("active");
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
})

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
