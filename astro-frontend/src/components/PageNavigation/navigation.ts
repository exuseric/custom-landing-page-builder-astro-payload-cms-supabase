export default function navigationActions() {
    const toggleAttribute = (element: HTMLElement) => {
        element.getAttribute("data-is-active") === "false"
            ? element.setAttribute("data-is-active", "true")
            : element.setAttribute("data-is-active", "false");
    };

    document.addEventListener("DOMContentLoaded", () => {
        const nav = document.querySelector(".nav");
        const menu = document.querySelector(".nav__menu");
        const navToggle = document.querySelector(".nav__toggle");

        if (navToggle) {
            navToggle.addEventListener("click", () => {
                toggleAttribute(navToggle as HTMLElement);
                toggleAttribute(menu as HTMLElement);
            });
        }

        if (nav) {
            document.addEventListener("scroll", () => {
                const scrollPosition = window.scrollY;
                if (scrollPosition > nav.getBoundingClientRect().height * 0.5) {
                    nav.setAttribute("data-is-active", "true");
                } else {
                    nav.setAttribute("data-is-active", "false");
                }
            });
        }
    });
}