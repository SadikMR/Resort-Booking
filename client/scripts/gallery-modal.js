
(function () {
    let galleryImages = [];
    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isMobile = window.innerWidth <= 768;

    const modal = document.getElementById('gallery-modal');
    const modalBackdrop = modal.querySelector('.gallery-modal-backdrop');
    const closeBtn = modal.querySelector('.gallery-modal-close');
    const galleryContainer = document.getElementById('gallery-carousel');
    const counterCurrent = document.getElementById('gallery-current');
    const counterTotal = document.getElementById('gallery-total');
    const viewAllBtn = document.querySelector('.image-button');

    async function loadGalleryImages() {
        try {
            const response = await fetch('/api/images');
            const data = await response.json();
            galleryImages = data.images;
            counterTotal.textContent = galleryImages.length;
        } catch (error) {
            console.error('Error loading gallery images:', error);
        }
    }

    // Initialize gallery on page load
    loadGalleryImages();

    // Render all images
    function renderGalleryImages() {
        galleryContainer.innerHTML = '';
        galleryImages.forEach((image, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'gallery-image-wrapper';
            wrapper.innerHTML = `<img src="${image.src}" alt="${image.alt}" data-index="${index}" />`;
            galleryContainer.appendChild(wrapper);
        });

        // Add button container for mobile
        if (isMobile) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = `
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        z-index: 10;
        pointer-events: none;
      `;

            const prevBtn = document.createElement('button');
            prevBtn.className = 'gallery-prev-btn';
            prevBtn.setAttribute('aria-label', 'Previous image');
            prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';
            prevBtn.style.pointerEvents = 'auto';
            prevBtn.addEventListener('click', previousImage);

            const nextBtn = document.createElement('button');
            nextBtn.className = 'gallery-next-btn';
            nextBtn.setAttribute('aria-label', 'Next image');
            nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.addEventListener('click', nextImage);

            buttonContainer.appendChild(prevBtn);
            buttonContainer.appendChild(nextBtn);
            galleryContainer.parentElement.appendChild(buttonContainer);
        }

        updateCounter();
    }

    // Open gallery modal
    let savedScrollY = 0;
    function openGallery() {
        renderGalleryImages();
        currentImageIndex = 0;
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-hidden', 'false');

        // Lock background scroll while preserving position
        savedScrollY = window.scrollY;
        document.body.style.top = `-${savedScrollY}px`;
        document.body.classList.add('gallery-modal-open');

        if (isMobile) {
            scrollToImageMobile(0);
        } else {
            scrollToImageDesktop(0);
        }
    }

    // Close gallery modal
    function closeGallery() {
        modal.setAttribute('hidden', '');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('gallery-modal-open');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
    }

    // Desktop: Scroll vertically to image
    function scrollToImageDesktop(index) {
        if (index < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }

        const images = galleryContainer.querySelectorAll('.gallery-image-wrapper');
        if (images[currentImageIndex]) {
            images[currentImageIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Mobile: Scroll horizontally to image
    function scrollToImageMobile(index) {
        if (index < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }

        const images = galleryContainer.querySelectorAll('.gallery-image-wrapper');
        if (images[currentImageIndex]) {
            images[currentImageIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        updateCounter();
    }

    // Next image
    function nextImage() {
        if (isMobile) {
            scrollToImageMobile(currentImageIndex + 1);
        } else {
            scrollToImageDesktop(currentImageIndex + 1);
        }
    }

    // Previous image
    function previousImage() {
        if (isMobile) {
            scrollToImageMobile(currentImageIndex - 1);
        } else {
            scrollToImageDesktop(currentImageIndex - 1);
        }
    }

    // Update counter
    function updateCounter() {
        counterCurrent.textContent = currentImageIndex + 1;
    }

    // Touch swipe handler
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if (!isMobile) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Horizontal swipe (left/right)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextImage(); // Swipe left = next
            } else {
                previousImage(); // Swipe right = previous
            }
        }
    }

    // Keyboard navigation
    function handleKeyDown(e) {
        if (modal.hasAttribute('hidden')) return;

        if (isMobile) return; // Disable keyboard on mobile

        if (e.key === 'ArrowDown') {
            nextImage();
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            previousImage();
            e.preventDefault();
        } else if (e.key === 'Escape') {
            closeGallery();
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });

    // Event listeners
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', openGallery);
    }

    closeBtn.addEventListener('click', closeGallery);
    modalBackdrop.addEventListener('click', closeGallery);

    // Sync counter with manual scrolling (touch swipe on mobile)
    galleryContainer.addEventListener('scroll', () => {
        if (!isMobile || modal.hasAttribute('hidden')) return;

        const images = galleryContainer.querySelectorAll('.gallery-image-wrapper');
        const containerWidth = galleryContainer.clientWidth;
        const scrollLeft = galleryContainer.scrollLeft;

        // Find which image is most visible
        let closestIndex = 0;
        let closestDistance = Infinity;

        images.forEach((img, index) => {
            const imgLeft = img.offsetLeft;
            const distance = Math.abs(scrollLeft - imgLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        currentImageIndex = closestIndex;
        updateCounter();
    });

    // Touch swipe on gallery container
    document.addEventListener('touchstart', function (e) {
        if (!modal.hasAttribute('hidden')) {
            handleTouchStart(e);
        }
    }, false);

    document.addEventListener('touchend', function (e) {
        if (!modal.hasAttribute('hidden')) {
            handleTouchEnd(e);
        }
    }, false);

    document.addEventListener('keydown', handleKeyDown);
})();
