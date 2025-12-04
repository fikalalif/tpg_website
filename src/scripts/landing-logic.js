// --- 1. CORE LOADING LOGIC ---

// Fungsi utama: Menyembunyikan loading screen & menampilkan konten
function showContent(isAnimated = true) {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  // Jika loading screen ada
  if (loadingScreen) {
    if (isAnimated) {
      // Tambahkan class untuk animasi fade-out CSS
      loadingScreen.classList.add('fade-out');
      
      // Tunggu animasi CSS selesai (1 detik), baru hapus dari layar
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000); 
    } else {
      // Jika tidak animasi (misal user kembali ke home), hilangkan langsung (instant)
      loadingScreen.style.display = 'none';
    }
  }

  // Tampilkan konten utama
  if (mainContent) {
    mainContent.classList.remove('content-hidden');
    mainContent.classList.add('content-visible');
    
    // Jalankan animasi "Stagger" (muncul satu per satu) untuk elemen halaman
    const staggerElements = document.querySelectorAll('.stagger-animation');
    staggerElements.forEach((el, index) => {
      // Jika instant, tidak perlu delay
      const delay = isAnimated ? index * 100 : 0;
      
      setTimeout(() => {
        if (isAnimated) el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('animate-fade-in-scale');
        
        // Pastikan opacity 1 jika skip animasi
        if (!isAnimated) el.style.opacity = '1';
      }, delay);
    });
  }
}

// Fungsi opsional: Membuat partikel background
function createParticles() {
  const container = document.getElementById('particles-container');
  if (container) {
    // Jumlah partikel sedikit saja biar ringan
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

// --- 2. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  
  // LOGIKA SESSION
  const hasVisited = sessionStorage.getItem('hasVisited');

  if (hasVisited) {
    // Kunjungan kedua dst -> Instant hide
    showContent(false);
  } else {
    // Kunjungan pertama -> Tunggu window load
    window.addEventListener('load', () => {
        // Beri jeda 2 detik agar animasi putar 3D terlihat dulu
        setTimeout(() => {
            showContent(true);
            sessionStorage.setItem('hasVisited', 'true');
        }, 2000); 
    });
  }
});