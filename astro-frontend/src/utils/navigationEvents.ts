const toggleActive = (el: HTMLElement) => {
    el.dataset.isActive = String(!(el.dataset.isActive === "true"));
};

const toggleScroll = (el: HTMLElement) => {
    if (window.scrollY > el.getBoundingClientRect().height * 0.5) {
        el.dataset.isActive = "true";
    } else {
        el.dataset.isActive = "false";
    }
};

const toggleAria = (el: HTMLElement) => {
    el.ariaExpanded = String(!(el.ariaExpanded === "true"));
};

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("[data-nav-bar]") as HTMLElement;
    const topbar = document.querySelector("[data-topbar]") as HTMLElement;
    const toggle = document.querySelector(
        "[data-menu-toggle]",
    ) as HTMLButtonElement;
    const toggleIcons = document.querySelectorAll(
        "[data-toggle-icon]",
    ) as NodeListOf<HTMLElement>;
    const menu = document.querySelector("[data-menu]") as HTMLMenuElement;

    // Scroll direction tracking variables
    let lastScrollY = window.scrollY;
    let isScrollingUp = false;
    let scrollThreshold = nav.getBoundingClientRect().height;

    // Click Listener
    toggle.addEventListener("click", function () {
        toggleActive(menu); // Toggle Menu
        toggleAria(menu); // Toggle Aria
        toggleActive(this); // Toggle Active
        nav.dataset.menuToggled = String(!(nav.dataset.menuToggled === "true")); // Toggle Nav Bar

        for (const icon of toggleIcons) {
            toggleActive(icon); // Toggle Icons
        }
    });

    toggleScroll(nav);

    // Enhanced Scroll Listener with hide/show functionality
    document.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        
        // Determine scroll direction
        isScrollingUp = currentScrollY < lastScrollY;
        
        // Update scroll-based active state (existing functionality)
        toggleScroll(nav);
        
        // Hide/show navigation based on scroll direction and position
        if (currentScrollY > scrollThreshold) {
            if (isScrollingUp) {
                // Scrolling up - show nav
                topbar.dataset.scrollHidden = "false";
            } else {
                // Scrolling down - hide nav
                topbar.dataset.scrollHidden = "true";
            }
        } else {
            // At top of page - always show nav
            topbar.dataset.scrollHidden = "false";
        }
        
        lastScrollY = currentScrollY;
    });
});