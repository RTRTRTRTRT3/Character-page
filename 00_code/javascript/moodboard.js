// Moodboard Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
  const moodGrid = document.querySelector('.mood-grid');
  
  if (!moodGrid) return;
  
  const images = Array.from(moodGrid.querySelectorAll('img'));
  
  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'moodboard-lightbox';
  modal.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
      <img class="lightbox-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(modal);
  
  const lightboxImage = modal.querySelector('.lightbox-image');
  const overlay = modal.querySelector('.lightbox-overlay');
  const closeBtn = modal.querySelector('.lightbox-close');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  
  // Open lightbox
  function openLightbox(index) {
    if (index < 0 || index >= images.length) return;
    
    currentImageIndex = index;
    const img = images[index];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons visibility
    prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
    nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
  }
  
  // Close lightbox
  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Navigate to previous image
  function showPrevious() {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    openLightbox(prevIndex);
  }
  
  // Navigate to next image
  function showNext() {
    const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    openLightbox(nextIndex);
  }
  
  // Add click handlers to all moodboard images
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      e.preventDefault();
      openLightbox(index);
    });
  });
  
  // Close on overlay click
  overlay.addEventListener('click', closeLightbox);
  
  // Close on close button click
  closeBtn.addEventListener('click', closeLightbox);
  
  // Navigation buttons
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrevious();
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showNext();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevious();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });
  
  // Prevent closing when clicking on image
  lightboxImage.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

