document.addEventListener('DOMContentLoaded', function() {
  const tracks = document.querySelectorAll('.track');
  const nowPlayingTrack = document.querySelector('.now-playing-track');
  const nowPlayingArtist = document.querySelector('.now-playing-artist');
  const playPauseBtn = document.querySelector('.play-pause-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const progressBar = document.querySelector('.progress-bar');
  const progressFill = document.querySelector('.progress-fill');
  const progressTimeStart = document.querySelector('.progress-time-start');
  const progressTimeEnd = document.querySelector('.progress-time-end');
  
  let currentAudio = null;
  let currentTrack = null;
  let isPlaying = false;
  let progressInterval = null;

  // Load audio metadata and update track duration
  function loadAudioMetadata(audio, trackElement) {
    audio.addEventListener('loadedmetadata', function() {
      const duration = formatTime(audio.duration);
      const trackTimeElement = trackElement.querySelector('.track-time');
      if (trackTimeElement) {
        trackTimeElement.textContent = duration;
      }
    });
  }

  // Initialize all tracks metadata
  function initializeTracksMetadata() {
    tracks.forEach(track => {
      const audio = track.querySelector('.audio-player');
      if (audio) {
        loadAudioMetadata(audio, track);
      }
    });
  }

  // Initialize first track
  function initFirstTrack() {
    if (tracks.length > 0) {
      const firstTrack = tracks[0];
      const trackName = firstTrack.querySelector('.track-name').textContent;
      const trackArtist = firstTrack.querySelector('.track-artist').textContent;
      updateNowPlaying(trackName, trackArtist);
    }
  }

  // Update now playing display
  function updateNowPlaying(trackName, trackArtist) {
    nowPlayingTrack.textContent = trackName;
    nowPlayingArtist.textContent = trackArtist;
  }

  // Format time
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Update progress
  function updateProgress() {
    if (currentAudio) {
      const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
      progressFill.style.width = progress + '%';
      progressTimeStart.textContent = formatTime(currentAudio.currentTime);
      progressTimeEnd.textContent = formatTime(currentAudio.duration);
    }
  }

  // Start progress tracking
  function startProgressTracking() {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(updateProgress, 100);
  }

  // Stop progress tracking
  function stopProgressTracking() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  // Play track
  function playTrack(track) {
    const audio = track.querySelector('.audio-player');
    const trackName = track.querySelector('.track-name').textContent;
    const trackArtist = track.querySelector('.track-artist').textContent;
    
    // Stop current track
    if (currentAudio && currentTrack) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentTrack.classList.remove('playing');
    }
    
    // Play new track
    currentAudio = audio;
    currentTrack = track;
    isPlaying = true;
    
    updateNowPlaying(trackName, trackArtist);
    track.classList.add('playing');
    playPauseBtn.textContent = '❚❚';
    
    audio.play().then(() => {
      startProgressTracking();
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
    
    // Handle audio end
    audio.addEventListener('ended', function() {
      playNext();
    });
  }

  // Pause current track
  function pauseTrack() {
    if (currentAudio && isPlaying) {
      currentAudio.pause();
      isPlaying = false;
      playPauseBtn.textContent = '▶';
      if (currentTrack) {
        currentTrack.classList.remove('playing');
      }
      stopProgressTracking();
    }
  }

  // Play/pause toggle
  function togglePlayPause() {
    if (!currentAudio) {
      // Play first track
      if (tracks.length > 0) {
        playTrack(tracks[0]);
      }
    } else if (isPlaying) {
      pauseTrack();
    } else {
      // Resume current track
      isPlaying = true;
      playPauseBtn.textContent = '❚❚';
      if (currentTrack) {
        currentTrack.classList.add('playing');
      }
      currentAudio.play();
      startProgressTracking();
    }
  }

  // Play next track
  function playNext() {
    if (!currentTrack || !tracks.length) return;
    
    const currentIndex = Array.from(tracks).indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    const nextTrack = tracks[nextIndex];
    
    playTrack(nextTrack);
  }

  // Play previous track
  function playPrev() {
    if (!currentTrack || !tracks.length) return;
    
    const currentIndex = Array.from(tracks).indexOf(currentTrack);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    const prevTrack = tracks[prevIndex];
    
    playTrack(prevTrack);
  }

  // Track click handlers
  tracks.forEach(track => {
    const playBtn = track.querySelector('.track-play');
    
    playBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      if (currentTrack === track && isPlaying) {
        pauseTrack();
        playBtn.textContent = '▶';
      } else {
        playTrack(track);
        // Update all play buttons
        document.querySelectorAll('.track-play').forEach(btn => {
          btn.textContent = '▶';
        });
        playBtn.textContent = '❚❚';
      }
    });
    
    track.addEventListener('click', function(e) {
      if (e.target !== playBtn) {
        playBtn.click();
      }
    });
  });

  // Control button handlers
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', playNext);
  prevBtn.addEventListener('click', playPrev);

  // Progress bar click
  progressBar.addEventListener('click', function(e) {
    if (currentAudio && currentAudio.duration) {
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      currentAudio.currentTime = percent * currentAudio.duration;
      updateProgress();
    }
  });

  // Initialize
  initFirstTrack();
  initializeTracksMetadata();
});

















// Header Navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeHeaderNavigation();
});

function initializeHeaderNavigation() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.header-nav-item');
    
    // Add click handlers to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get target section
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav item based on scroll position
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('hero, description, playlist, backstory, relations, moodboard');
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.tagName.toLowerCase();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const activeItem = document.querySelector(`.header-nav-item[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                }
            }
        });
    }
    
    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Update active nav item on load
    updateActiveNavItem();
}




// ==========================================================================================




// Header Navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeHeaderNavigation();
});

function initializeHeaderNavigation() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.header-nav-item');
    
    // Add click handlers to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get target section
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav item based on scroll position
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('hero, description, playlist, backstory, relations, moodboard');
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.tagName.toLowerCase();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const activeItem = document.querySelector(`.header-nav-item[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                }
            }
        });
    }
    
    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Update active nav item on load
    updateActiveNavItem();
}














