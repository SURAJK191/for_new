// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const birthdayTimer = document.getElementById('birthday-timer');
    const mainContent = document.getElementById('main-content');
    const countdownElement = document.querySelector('.countdown');
    
    // Image slider elements
    const slider = document.querySelector('.slider');
    const slideIndicators = document.querySelector('.slider-indicators');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    
    // Birthday grid element
    const birthdayGrid = document.getElementById('birthdayGrid');
    
    // Birthday timer countdown from 5 to 0
    let countdown = 5;
    countdownElement.textContent = countdown;
    
    const timer = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown === 0) {
            clearInterval(timer);
            
            // Add final animation
            countdownElement.textContent = '🎉';
            
            // Wait 1 second then transition to main content
            setTimeout(() => {
                birthdayTimer.style.opacity = '0';
                
                setTimeout(() => {
                    birthdayTimer.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Initialize the slider and birthday grid
                    initSlider();
                    initBirthdayGrid();
                    
                    // Add decorative elements
                    addDecorations();
                }, 1000);
            }, 1000);
        }
    }, 1000);
    
    // Initialize image slider with your images
    function initSlider() {
        // Your slider images
        const sliderImages = [
            {
                src: 'new.jpeg',
                year: '',
                text: 'happy day'
            },
            {
                src: 'tt.jpeg',
                year: '',
                text: ''
            },
            {
                src: 'we.jpeg',
                year: '',
                text: ''
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 10.41.07 AM.jpeg',
                year: '',
                text: ''
            },
            {
                src: 'te.jpeg',
                year: '',
                text: ''
            }
        ];
        
        let currentSlide = 0;
        
        // Clear existing slides
        slider.innerHTML = '';
        slideIndicators.innerHTML = '';
        
        // Create slides and indicators
        sliderImages.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            // Use your image or placeholder
            const imgSrc = image.src;
            
            slide.innerHTML = `
                <img src="${imgSrc}" alt="Memory ${index + 1}" class="slide-img">
                <div class="slide-caption">
                    <div class="slide-year">${image.year}</div>
                    <div class="slide-text">${image.text}</div>
                </div>
            `;
            slider.appendChild(slide);
            
            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => goToSlide(index));
            slideIndicators.appendChild(indicator);
        });
        
        // Set total slides count
        totalSlidesElement.textContent = sliderImages.length;
        
        // Update slide position
        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update counter
            currentSlideElement.textContent = currentSlide + 1;
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderImages.length;
            updateSlider();
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
            updateSlider();
        }
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Initialize slider
        updateSlider();
    }
    
    // Initialize birthday photo grid with 9 birthday-related images
    function initBirthdayGrid() {
        // Clear the grid
        birthdayGrid.innerHTML = '';
        
        // 9 birthday-related images with captions
        const birthdayPhotos = [
            {
                src: 'WhatsApp Image 2026-02-02 at 10.41.10 AM (1).jpeg',
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 11.06.49 AM.jpeg',
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 10.40.55 AM.jpeg',
                
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 10.41.11 AM.jpeg',
            },
            {
                src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Gifts & Surprises',
                text: 'Special presents for you'
            },
            {
                src: 'new.jpeg',
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 10.41.08 AM.jpeg',
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 10.41.08 AM (1).jpeg',
            },
            {
                src: 'WhatsApp Image 2026-02-02 at 10.41.10 AM.jpeg',
            }
        ];
        
        // Create 3x3 grid (9 photos)
        birthdayPhotos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            photoItem.innerHTML = `
                <img src="${photo.src}" alt="Birthday Memory ${index + 1}" class="photo-image">
                <div class="photo-caption">
                    <div class="caption-title">${photo.title}</div>
                    <div class="caption-text">${photo.text}</div>
                </div>
            `;
            
            // Add animation
            photoItem.style.opacity = '0';
            photoItem.style.transform = 'translateY(20px)';
            
            birthdayGrid.appendChild(photoItem);
            
            // Stagger animation
            setTimeout(() => {
                photoItem.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                photoItem.style.opacity = '1';
                photoItem.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Add decorative elements
    function addDecorations() {
        const decorations = document.createElement('div');
        decorations.innerHTML = `
            <div class="decoration decoration-1"></div>
            <div class="decoration decoration-2"></div>
        `;
        mainContent.appendChild(decorations);
    }
    
    // Add subtle animation to wish cards on load
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
});