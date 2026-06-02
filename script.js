// --- PORTFOLIO ENGINE ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA STORE FOR PROJECTS (Rich Modal Content)
    const projectsData = {
        'document-tracking-system': {
            title: 'Document Tracking System',
            category: 'Web Application',
            desc: 'A full-featured workflow and document tracking application designed to streamline administrative operations. Built with a Flask backend and role-based permissions, it provides complete audit logs, leave tracking, automatic email alerts, and dynamic dashboards for visual analytics.',
            features: [
                'Implemented secure role-based access control (RBAC) with account approval workflows',
                'Developed full document history and movement tracking with comprehensive audit logs',
                'Engineered automated notification dispatch for pending leaves and EWP actions',
                'Configured business-hour delta trackers localized to Manila timezone'
            ],
            tech: ['Flask', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'SQLite'],
            img: 'assets/document_tracking.png',
            github: 'https://github.com/z0diax/document-tracking-system',
            live: '#'
        },
        'kees-desz': {
            title: 'Kees & Desz Wedding RSVP',
            category: 'Web Application',
            desc: 'A bespoke, romantic wedding invitation and RSVP portal. Built as a high-performance single page application, it features a custom countdown timeline, responsive touch gallery, interactive location mapping, and a functional guest registry and RSVP form.',
            features: [
                'Designed a responsive countdown timer to the wedding date using vanilla JS',
                'Integrated full RSVP capture form saving guest list details directly',
                'Styled with an elegant custom gold-and-floral visual theme with smooth scroll animations',
                'Optimized web assets for 100% mobile readiness and fast asset delivery'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'Responsive Design'],
            img: 'assets/wedding_rsvp.png',
            github: 'https://github.com/z0diax/kees-desz',
            live: 'https://kees-desz.vercel.app'
        },
        'fantastic-octo-potato': {
            title: 'Katitirok Art Gallery',
            category: 'Web Application',
            desc: 'Katitirok is a modern, highly interactive digital art and media archive. Using a clean grid layout with glassmorphic elements, it displays high-fidelity graphics with smooth touch support and modern styling, creating a premium virtual viewing experience.',
            features: [
                'Designed responsive masonry-style grids using CSS Grid and flex models',
                'Implemented Intersection Observer lazy-loading to optimize render performance',
                'Created a custom image lightbox for distraction-free art exploration',
                'Designed a premium dark mode layout with glowing gradient background blobs'
            ],
            tech: ['JavaScript', 'CSS Grid', 'HTML5', 'Intersection Observer', 'Responsive Design'],
            img: 'assets/katitirok_gallery.png',
            github: 'https://github.com/z0diax/fantastic-octo-potato',
            live: 'https://katitirok-gallery.vercel.app'
        },
        'crosswordpuzzle': {
            title: 'Interactive Crossword Challenge',
            category: 'Web Application',
            desc: 'A specialized web crossword game built for National Women’s Month. Solvers register, solve clues highlighting Filipina history and women\'s equality, and submit their completion stats in a smooth, mobile-friendly interface.',
            features: [
                'Engineered interactive cell focus-navigation and automatic clue highlights',
                'Implemented accurate solve-time stopwatch utilizing high-precision intervals',
                'Created registration and submission flows saving solver metrics in local storage',
                'Designed a colorful, responsive theme keeping accessibility guidelines in check'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Mobile Friendly'],
            img: 'assets/crossword_puzzle.png',
            github: 'https://github.com/z0diax/crosswordpuzzle',
            live: 'https://project-rt2qx.vercel.app'
        },
        'qr-scanner': {
            title: 'QR Scanner & Generator',
            category: 'Desktop Utility',
            desc: 'A lightweight and modular desktop tool written in Python. It integrates OpenCV and Pyzbar to read QR codes from real-time webcam streams, decode data immediately, and generate high-resolution custom QR codes from text input.',
            features: [
                'Integrated OpenCV video capture pipeline for real-time webcam processing',
                'Leveraged Pyzbar decoders for instantaneous barcode and QR reading',
                'Designed user-friendly desktop GUI utilizing Tkinter layout libraries',
                'Built instant custom QR code creator saving high-res PNG outputs'
            ],
            tech: ['Python', 'OpenCV', 'Pyzbar', 'Tkinter', 'Pillow'],
            img: 'assets/qr_scanner.png',
            github: 'https://github.com/z0diax/qr-scanner',
            live: '#'
        }
    };

    // 2. THEME SWITCHER (Dark/Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        htmlElement.classList.add('light');
    } else {
        htmlElement.classList.remove('light');
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('light');
        const activeTheme = htmlElement.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', activeTheme);
    });

    // 3. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 600) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'all';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
            backToTopBtn.style.transform = 'translateY(15px)';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. MOBILE MENU TOGGLE
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // 5. INTERACTIVE TABS (About Section)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active classes
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 6. PORTFOLIO FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active btn
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Card fade-out animation then show/hide
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // 7. PROJECT DETAILS MODAL
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalFeatures = document.getElementById('modal-features');
    const modalCategory = document.getElementById('modal-category');
    const modalTech = document.getElementById('modal-tech');
    const modalGithub = document.getElementById('modal-github');
    const modalLive = document.getElementById('modal-live');

    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        // Inject content
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalCategory.textContent = data.category;
        modalImg.src = data.img;
        modalImg.alt = data.title;
        
        // Features list
        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            modalFeatures.appendChild(li);
        });

        // Tech stack
        modalTech.innerHTML = '';
        data.tech.forEach(t => {
            const span = document.createElement('span');
            span.className = 'modal-tech-badge';
            span.textContent = t;
            modalTech.appendChild(span);
        });

        // Link overrides
        if (data.github && data.github !== '#') {
            modalGithub.href = data.github;
            modalGithub.style.display = 'inline-flex';
        } else {
            modalGithub.style.display = 'none';
        }

        if (data.live && data.live !== '#') {
            modalLive.href = data.live;
            modalLive.style.display = 'inline-flex';
        } else {
            modalLive.style.display = 'none';
        }

        // Open modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock body scroll
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto'; // Unlock scroll
    };

    // Attach click listeners to cards
    projectCards.forEach(card => {
        const id = card.getAttribute('data-id');
        const triggerBtn = card.querySelector('.project-btn');
        const overlay = card.querySelector('.project-overlay');

        triggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(id);
        });

        overlay.addEventListener('click', () => {
            openModal(id);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // 8. REVEAL-ON-SCROLL & NAVIGATION TRACKER
    const revealElements = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const scrollObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, scrollObserverOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

    // Monitor section viewing to highlight nav links
    const sectionObserverOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '-80px 0px -20% 0px' // adjust for headers/footers
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    // 9. PREMIUM CONTACT FORM VALIDATION & INTERACTIVE STATE
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Simple validation
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showStatus('Please fill in all the fields.', 'error');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulating submission loader state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            // Success status
            showStatus('<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1500);
    });

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const showStatus = (msg, type) => {
        formStatus.innerHTML = msg;
        formStatus.className = 'form-status ' + type;
        
        // Fade in status
        formStatus.style.display = 'flex';
        formStatus.style.opacity = '0';
        setTimeout(() => {
            formStatus.style.opacity = '1';
        }, 50);

        // Auto hide on success after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.opacity = '0';
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 300);
            }, 5000);
        }
    };
});
