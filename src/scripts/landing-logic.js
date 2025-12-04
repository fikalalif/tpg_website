// --- 1. CORE LOADING LOGIC ---

function showContent(isAnimated = true) {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  if (loadingScreen) {
    if (isAnimated) {
      loadingScreen.classList.add('fade-out');
      // Pastikan display none dipanggil setelah animasi selesai
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000); 
    } else {
      loadingScreen.style.display = 'none';
    }
  }

  if (mainContent) {
    mainContent.classList.remove('content-hidden');
    mainContent.classList.add('content-visible');
    
    const staggerElements = document.querySelectorAll('.stagger-animation');
    staggerElements.forEach((el, index) => {
      const delay = isAnimated ? index * 100 : 0;
      setTimeout(() => {
        if (isAnimated) el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('animate-fade-in-scale');
        if (!isAnimated) el.style.opacity = '1';
      }, delay);
    });
  }
}

function createParticles() {
  const container = document.getElementById('particles-container');
  if (container) {
    const particleCount = 25; 
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      container.appendChild(particle);
    }
  }
}

// --- 2. FUNGSI UTAMA (MAIN INIT) ---

function initApp() {
  // A. Setup Partikel & Loading Logic
  createParticles();
  
  const hasVisited = sessionStorage.getItem('hasVisited');
  if (hasVisited) {
    showContent(false);
  } else {
    // Gunakan window.load untuk memastikan semua gambar termuat (hanya untuk loading screen)
    if (document.readyState === 'complete') {
        setTimeout(() => {
            showContent(true);
            sessionStorage.setItem('hasVisited', 'true');
        }, 2000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                showContent(true);
                sessionStorage.setItem('hasVisited', 'true');
            }, 2000); 
        });
    }
  }

  // B. NAVIGATION LOGIC (Mobile Menu & Navbar Scroll)
  initNavigation();
}

// --- 3. LOGIKA NAVIGASI ---
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuContent = mobileMenu?.querySelector('.mobile-menu-content');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');
  const navbar = document.getElementById('navbar');
  const parallaxBg = document.getElementById('parallax-bg');

  if (hamburgerBtn && mobileMenu) {
    // Hapus event listener lama (jika ada) dengan cloning node (opsional, tapi aman)
    // hamburgerBtn.replaceWith(hamburgerBtn.cloneNode(true)); 
    // ^ Kita skip cloning agar simple, pastikan logic ini hanya jalan sekali.

    hamburgerBtn.onclick = function(e) {
      e.stopPropagation(); // Mencegah klik tembus

      const isHidden = mobileMenu.classList.contains('hidden');

      if (isHidden) {
        // --- BUKA MENU ---
        mobileMenu.classList.remove('hidden');
        
        // Animasi Hamburger -> X
        if(hamburgerLines.length >= 3) {
            hamburgerLines[0].classList.add('rotate-45', 'translate-y-1.5');
            hamburgerLines[1].classList.add('opacity-0');
            hamburgerLines[2].classList.add('-rotate-45', '-translate-y-1.5');
        }

        // Animasi Konten Turun
        // Gunakan requestAnimationFrame agar browser sempat merender 'display: block' sebelum transisi
        requestAnimationFrame(() => {
            mobileMenu.classList.remove('max-h-0');
            mobileMenu.classList.add('max-h-screen');
            mobileMenuContent?.classList.remove('opacity-0', 'translate-y-4');
            mobileMenuContent?.classList.add('opacity-100', 'translate-y-0');
        });

      } else {
        // --- TUTUP MENU ---
        mobileMenuContent?.classList.remove('opacity-100', 'translate-y-0');
        mobileMenuContent?.classList.add('opacity-0', 'translate-y-4');
        mobileMenu.classList.remove('max-h-screen');
        mobileMenu.classList.add('max-h-0');

        // Kembalikan Hamburger
        if(hamburgerLines.length >= 3) {
            hamburgerLines[0].classList.remove('rotate-45', 'translate-y-1.5');
            hamburgerLines[1].classList.remove('opacity-0');
            hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-1.5');
        }

        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 500);
      }
    };

    // Tutup menu saat link diklik
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) {
             hamburgerBtn.click();
        }
      });
    });
  }

  // --- NAVBAR SCROLL EFFECT ---
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar?.classList.add('-translate-y-full');
    } else {
      navbar?.classList.remove('-translate-y-full');
    }
    
    if (parallaxBg) {
      const parallaxSpeed = currentScrollY * 0.5;
      parallaxBg.style.transform = `translateY(${parallaxSpeed}px) translateZ(0)`;
    }
    
    lastScrollY = currentScrollY;
  });

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '/#') return;
      
      // Handle link seperti /#brands jika di halaman home
      const elementId = targetId.replace(/^\//, ''); // hapus slash depan
      const targetElement = document.querySelector(elementId);

      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// --- 4. EKSEKUSI YANG ROBUST (PENTING) ---
// Cek apakah dokumen sudah siap. Jika ya, jalankan langsung. Jika belum, tunggu.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // Jika script dimuat belakangan (module), DOMContentLoaded mungkin sudah lewat.
  // Maka jalankan initApp() langsung.
  initApp();
}