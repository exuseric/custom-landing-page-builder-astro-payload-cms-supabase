function initTestimonialCarousel() {
    const carousel = document.querySelector<HTMLElement>('.testimonial_carousel');
    const track = document.querySelector<HTMLElement>('[data-testimonial-track]');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-testimonial-card]'));
    const prevBtn = document.querySelector<HTMLButtonElement>('[data-action-type="previous"]');
    const nextBtn = document.querySelector<HTMLButtonElement>('[data-action-type="next"]');

    if (!carousel || !track || cards.length === 0) return;

    let currentIndex = 0;
    let isTransitioning = false;

    function goToSlide(index: number) {
        if (isTransitioning) return;

        isTransitioning = true;
        const card = cards[index];
        
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        
        setTimeout(() => {
            currentIndex = index;
            isTransitioning = false;
        }, 300);
    }

    function nextSlide() {
        const nextIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        goToSlide(prevIndex);
    }

    function handleKeyDown(event: KeyboardEvent) {
        switch(event.key) {
            case 'ArrowLeft':
                prevSlide();
                event.preventDefault();
                break;
            case 'ArrowRight':
                nextSlide();
                event.preventDefault();
                break;
        }
    }

    // Event Listeners
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
    carousel.addEventListener('keydown', handleKeyDown);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initTestimonialCarousel);