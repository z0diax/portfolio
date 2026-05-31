// --- PORTFOLIO ENGINE ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA STORE FOR PROJECTS (Rich Modal Content)
    const projectsData = {
        '1': {
            title: 'Apex Analytics Suite',
            category: 'Web Application',
            desc: 'Apex Analytics is a high-performance web dashboard providing real-time stream analysis and visual telemetry configurations for enterprise operations. Built to handle massive datasets with ease, it features custom WebSockets integrations, customizable widgets, and responsive layouts.',
            features: [
                'Designed custom canvas-based charting engine for smooth 60fps renders',
                'Integrated secure JWT and RBAC systems for multi-tier user profiles',
                'Reduced data polling overhead by 40% using optimized GraphQL subscriptions',
                'Implemented automatic dark/light synchronization based on device preferences'
            ],
            tech: ['Next.js', 'TypeScript', 'GraphQL', 'Chart.js', 'WebSockets', 'TailwindCSS'],
            img: 'assets/hero-bg.png',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        '2': {
            title: 'Velo Crypto Wallet',
            category: 'Mobile Application',
            desc: 'Velo is a secure, decentralized crypto wallet application built for managing multi-chain digital assets. It simplifies complex Web3 operations with an elegant, intuitive UI/UX, biometric security triggers, and high-performance cross-chain swapping protocols.',
            features: [
                'Created responsive, lag-free list views rendering 1000+ token histories',
                'Utilized Keychain/Keystore wrappers for enterprise-grade biometric security',
                'Developed local SQL database caching for offline portfolio tracking',
                'Connected with Uniswap and 1inch routers for instant asset swaps'
            ],
            tech: ['React Native', 'TypeScript', 'Web3.js', 'Ethers.js', 'SQLite', 'Reanimated'],
            img: 'assets/hero-bg.png',
            github: 'https://github.com',
            live: 'https://example.com'
        },
        '3': {
            title: 'Nove Smart Home',
            category: 'UI/UX Design Case Study',
            desc: 'Nove is a comprehensive visual layout and system design project for a modern IoT home management application. The project focuses on user-centric layouts, dark mode optimizations, customizable widget interfaces, and simplified device-pairing micro-interactions.',
            features: [
                'Conducted extensive user research interviews and usability testing with 15 participants',
                'Designed 40+ high-fidelity frames covering device setups and configuration flows',
                'Developed micro-interaction prototypes showing seamless switch and dial triggers',
                'Created a reusable typography and color system based on W3C accessibility specs'
            ],
            tech: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Illustrator'],
            img: 'assets/hero-bg.png',
            github: 'https://github.com',
            live: 'https://example.com'
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
        modalGithub.href = data.github;
        modalLive.href = data.live;

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
