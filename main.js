// Main JavaScript file for LaFaries Mortimer LLC website

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('show');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.remove('show');
        });
    });
});

// Cookie banner functionality
function acceptCookies() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        // Store cookie preference
        localStorage.setItem('cookiesAccepted', 'true');
    }
}

// Show cookie banner on page load if not already accepted
window.addEventListener('load', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (cookieBanner && !cookiesAccepted) {
        // Small delay before showing the banner
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
});

// FAQ toggle functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');
    
    // Close all other FAQ items
    const allFAQs = document.querySelectorAll('.faq-item');
    allFAQs.forEach(item => {
        const otherAnswer = item.querySelector('.faq-answer');
        const otherToggle = item.querySelector('.faq-toggle');
        if (otherAnswer !== answer) {
            otherAnswer.classList.remove('show');
            otherToggle.classList.remove('open');
            otherToggle.textContent = '+';
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('show');
    toggle.classList.toggle('open');
    
    if (toggle.classList.contains('open')) {
        toggle.textContent = '×';
    } else {
        toggle.textContent = '+';
    }
}

// Tutorial filtering functionality
function filterTutorials(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tutorialItems = document.querySelectorAll('.tutorial-item');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide tutorial items based on category
    tutorialItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.add('show');
        } else {
            item.classList.remove('show');
        }
    });
}

// Download file functionality (placeholder)
function downloadFile(filename, format) {
    // In a real implementation, this would trigger an actual file download
    alert(`Downloading ${filename}.${format}...\\n\\nNote: This is a demo. In a real implementation, this would download the actual file.`);
}

// Play video functionality (placeholder)
function playVideo(videoId) {
    // In a real implementation, this would open a video player
    alert(`Playing video: ${videoId}\\n\\nNote: This is a demo. In a real implementation, this would open the video player.`);
}

// Open template functionality (placeholder)
function openTemplate(templateType) {
    // In a real implementation, this would open the template
    alert(`Opening ${templateType} template...\\n\\nNote: This is a demo. In a real implementation, this would open the actual template.`);
}

// Submit inquiry form
function submitInquiry(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const successMessage = document.getElementById('successMessage');
    
    // In a real implementation, this would send the form data to a server
    console.log('Form submitted with data:', Object.fromEntries(formData));
    
    // Show success message
    if (successMessage) {
        successMessage.classList.add('show');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        form.reset();
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 10000);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Add validation styling
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                if (this.classList.contains('error') && this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    });
});

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, button[type="submit"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.onclick || this.href) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Reset after 2 seconds (adjust as needed)
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.pointerEvents = '';
                }, 2000);
            }
        });
    });
});

// Scroll animations (optional enhancement)
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .service-card, .audience-card, .tutorial-card, .value-card, .process-step'
    );

    elementsToObserve.forEach(el => observer.observe(el));
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', observeElements);
}

// Print functionality for tutorials
function printTutorial(tutorialName) {
    // Create a printable version of the tutorial
    const printWindow = window.open('', '_blank');
    const tutorialContent = `
        <html>
            <head>
                <title>${tutorialName} - LaFaries Mortimer LLC</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #2c3e50; }
                    .content { line-height: 1.6; }
                </style>
            </head>
            <body>
                <h1>${tutorialName}</h1>
                <div class="content">
                    <p>This is a printable version of the ${tutorialName} tutorial.</p>
                    <p>In a real implementation, this would contain the actual tutorial content.</p>
                </div>
            </body>
        </html>
    `;
    printWindow.document.write(tutorialContent);
    printWindow.document.close();
    printWindow.print();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            mobileNav.classList.remove('show');
        }
    }
}, 250));

// Handle scroll events (for performance)
let ticking = false;

function updateScrollPosition() {
    // Add scroll-based animations or effects here if needed
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});

// Console welcome message
console.log(`
🏢 Welcome to LaFaries Mortimer LLC
💼 Professional Administrative & IT Services
📞 (305) 859-1279
🌐 https://www.lafariesmortimerllc.com

Built with ❤️ using modern web technologies.
`);

// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        acceptCookies,
        toggleFAQ,
        filterTutorials,
        downloadFile,
        playVideo,
        openTemplate,
        submitInquiry
    };
}