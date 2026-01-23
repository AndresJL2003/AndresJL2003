// ═══════════════════════════════════════════════════════════════
// MATRIX RAIN ANIMATION - Binary Style
// ═══════════════════════════════════════════════════════════════

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Binary characters
const binary = '01';
const chars = binary.split('');

// Column settings
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

// Initialize drops
function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}
initDrops();
window.addEventListener('resize', initDrops);

// Draw matrix rain
function drawMatrix() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Random binary character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character with varying opacity
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        ctx.fillText(char, x, y);

        // Randomly add brighter character (head of the rain)
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#ffffff';
            ctx.fillText(char, x, y);
        }

        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }
}

// Animation loop
let animationId;
function animate() {
    drawMatrix();
    animationId = requestAnimationFrame(animate);
}
animate();

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL & NAVIGATION
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from all
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked
        this.classList.add('active');

        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ═══════════════════════════════════════════════════════════════
// INTERSECTION OBSERVER - Update active nav on scroll
// ═══════════════════════════════════════════════════════════════

const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ═══════════════════════════════════════════════════════════════
// TYPING EFFECT FOR ROLE (Optional Enhancement)
// ═══════════════════════════════════════════════════════════════

const roles = ['Desarrollador Full Stack', 'Desarrollador Backend', 'Desarrollador Frontend', 'Solucionador de Problemas'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role');

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new role
    }

    setTimeout(typeRole, typeSpeed);
}

// Start typing effect after a delay
setTimeout(typeRole, 2000);

// ═══════════════════════════════════════════════════════════════
// SKILL ITEMS HOVER EFFECT
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ═══════════════════════════════════════════════════════════════
// SERVICE CARDS GLOW EFFECT
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 0, 0.1), var(--bg-dark))`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--bg-dark)';
    });
});

// ═══════════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════════════

console.log('%c Welcome to AndresJL Portfolio! ', 'background: #00ff00; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Full Stack Developer | Code is Poetry ', 'color: #00ff00; font-size: 14px;');
console.log('%c 01010100 01001000 01000001 01001110 01001011 01010011 ', 'color: #00ff00; font-size: 10px;');
