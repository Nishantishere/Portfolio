
        // JS for GSAP Animations, Theme Toggle, and Custom Cursor
        document.addEventListener("DOMContentLoaded", function() {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);

            // Hide loading screen after all assets are loaded
            window.addEventListener('load', () => {
                gsap.to("#loading-screen", {
                    opacity: 0,
                    duration: 1,
                    delay: 0.5,
                    onComplete: () => {
                        document.body.removeChild(document.getElementById("loading-screen"));
                    }
                });
            });

            // GSAP Scroll Animations
            const sections = document.querySelectorAll("section");
            sections.forEach(section => {
                gsap.from(section.querySelectorAll("h2, p, .about-image, .project-card"), {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                });
            });

            // Text animation for Hero section
            gsap.from(".hero-content h1 span", {
                duration: 1.5,
                y: 50,
                opacity: 0,
                ease: "power3.out",
                delay: 0.5
            });

            gsap.from(".hero-content p", {
                duration: 1.5,
                y: 50,
                opacity: 0,
                ease: "power3.out",
                delay: 1
            });
            
            // Custom Cursor Logic
            const cursorDot = document.querySelector(".cursor-dot");
            const cursorRing = document.querySelector(".cursor-ring");
            let mouseX = 0, mouseY = 0;
            
            window.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.1, opacity: 1 });
                gsap.to(cursorRing, { x: mouseX, y: mouseY, duration: 0.5, opacity: 1 });
            });
            
            // Mouse enter/leave events for elements
            const interactiveElements = document.querySelectorAll('a, button, input, textarea');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cursorRing, { scale: 1.5, opacity: 0.8 });
                    gsap.to(cursorDot, { scale: 0.5 });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(cursorRing, { scale: 1, opacity: 1 });
                    gsap.to(cursorDot, { scale: 1 });
                });
            });

            // Theme Toggle Functionality
            const themeToggleBtn = document.getElementById('theme-toggle');
            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });

            // Set initial theme from localStorage or default to dark
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.body.setAttribute('data-theme', savedTheme);
        });
