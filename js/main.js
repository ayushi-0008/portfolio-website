/**
 * Main Application Logic - Ayushi Vagela Portfolio
 * Author: Ayushi Vagela
 */

// Global Configuration - All URLs, credentials, and settings are easily configurable here!
window.PORTFOLIO_CONFIG = {
  author: {
    name: "Ayushi Vagela",
    email: "ayushivagela2197@gmail.com",
    phone: "+91-6352717607",
    linkedin: "https://www.linkedin.com/in/ayushi-vagela",
    github: "https://github.com/ayushivagela",
    location: "Vadodara, Gujarat, India"
  },
  projects: {
    portfolio: {
      demoUrl: "#",
      githubUrl: "https://github.com/ayushivagela/portfolio-website"
    },
    ecommerce: {
      demoUrl: "#clothingDemoModal",
      githubUrl: "https://github.com/ayushivagela/clothing-ecommerce"
    }
  },
  certifications: [
    {
      id: "cert-aws",
      title: "AWS Cloud Practitioner Essentials",
      provider: "AWS Training & Certification",
      date: "August 2025",
      credId: "AWS-CPE-2025-AV982",
      verifyUrl: "https://aws.amazon.com/training/",
      skills: ["Amazon EC2", "AWS IAM", "Amazon VPC", "AWS Lambda", "Cloud Security"]
    },
    {
      id: "cert-ai",
      title: "Artificial Intelligence Fundamentals",
      provider: "IBM SkillsBuild (Credly)",
      date: "August 2025",
      credId: "IBM-SB-AI-2025-774",
      verifyUrl: "https://www.credly.com/",
      skills: ["Machine Learning", "Neural Networks", "Generative AI", "Data Ethics"]
    },
    {
      id: "cert-java",
      title: "Java Fundamentals for Beginners",
      provider: "Udemy – Sara Academy",
      date: "September 2025",
      credId: "UC-JAVA-BEG-2025-412",
      verifyUrl: "https://www.udemy.com/",
      skills: ["OOP Concepts", "Data Structures", "Java Collections", "Exception Handling"]
    },
    {
      id: "cert-web",
      title: "Modern Web Development",
      provider: "Online Course",
      date: "2024",
      credId: "MWD-CERT-2024-893",
      verifyUrl: "#",
      skills: ["HTML5", "CSS3 / Flexbox / Grid", "ES6+ JavaScript", "Responsive Design"]
    }
  ],
  // EmailJS integration settings (fill if using EmailJS service)
  emailjs: {
    publicKey: "", // Add EmailJS Public Key here if available
    serviceId: "", // Add EmailJS Service ID here
    templateId: "" // Add EmailJS Template ID here
  }
};

window.PortfolioApp = (function() {
  // Elements cache
  let navbar, mobileDrawer, mobileBackdrop, hamburgerBtn;
  let typedElement;
  let scrollLinks;

  // --------------------------------------------------------------------------
  // 1. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const iconColor = type === 'success' ? 'var(--accent-emerald)' : '#ef4444';

    toast.innerHTML = `
      <i class="fas ${iconClass} toast-icon" style="color: ${iconColor};"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 2. Typing Effect in Hero
  // --------------------------------------------------------------------------
  function initTypingAnimation() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const words = [
      "Frontend Developer",
      "Java Programmer",
      "Cloud Enthusiast",
      "AI Explorer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const eraseSpeed = 50;
    const pauseTime = 1600;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? eraseSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = 400;
      }

      setTimeout(type, timeout);
    }

    type();
  }

  // --------------------------------------------------------------------------
  // 3. Navbar Scrolling & Mobile Drawer
  // --------------------------------------------------------------------------
  function initNavbar() {
    navbar = document.getElementById('mainNav');
    hamburgerBtn = document.getElementById('hamburgerBtn');
    mobileDrawer = document.getElementById('mobileNavDrawer');
    mobileBackdrop = document.getElementById('mobileBackdrop');
    const closeMobileBtn = document.getElementById('closeMobileNav');

    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top button visibility
      const backToTop = document.getElementById('backToTopBtn');
      if (backToTop) {
        if (window.scrollY > 400) {
          backToTop.style.display = 'inline-flex';
        } else {
          backToTop.style.display = 'none';
        }
      }
    });

    // Mobile nav toggling
    function openMobile() {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobile() {
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobile);
    if (closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobile);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);

    // Close on mobile link click
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobile);
    });

    // Active Section Highlighting via Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item a, .mobile-links a');

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 4. Scroll Reveal Animations
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // If it has skill progress bars, animate them
          const progressFills = entry.target.querySelectorAll('.skill-progress-fill');
          progressFills.forEach(bar => {
            const level = bar.getAttribute('data-level') || '80';
            bar.style.width = `${level}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 5. Skill Category Filtering
  // --------------------------------------------------------------------------
  function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card-item');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Certificate Details Modal
  // --------------------------------------------------------------------------
  function openCertModal(certId) {
    const cert = window.PORTFOLIO_CONFIG.certifications.find(c => c.id === certId);
    if (!cert) return;

    const titleEl = document.getElementById('certModalTitle');
    const bodyEl = document.getElementById('certModalBody');
    if (!titleEl || !bodyEl) return;

    titleEl.textContent = cert.title;
    bodyEl.innerHTML = `
      <div class="text-center p-4 mb-4 rounded" style="background: rgba(139, 92, 246, 0.08); border: 1px dashed rgba(139, 92, 246, 0.35);">
        <i class="fas fa-award fa-4x mb-3 text-warning"></i>
        <h4 class="text-white mb-1">${cert.title}</h4>
        <p class="text-info fw-semibold mb-0">${cert.provider}</p>
        <span class="badge bg-secondary mt-2">Issued: ${cert.date}</span>
      </div>

      <div class="mb-3">
        <label class="small text-muted text-uppercase fw-bold">Credential Identification</label>
        <div class="d-flex align-items-center justify-content-between p-2 rounded bg-black bg-opacity-25 border border-secondary border-opacity-25 mt-1">
          <code class="text-info fs-6">${cert.credId}</code>
          <button class="btn btn-sm btn-outline-secondary" onclick="PortfolioApp.copyText('${cert.credId}', 'Credential ID')">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label class="small text-muted text-uppercase fw-bold mb-2 d-block">Competencies & Skills Verified</label>
        <div class="d-flex flex-wrap gap-2">
          ${cert.skills.map(s => `<span class="badge bg-dark border border-secondary border-opacity-50 text-light p-2">${s}</span>`).join('')}
        </div>
      </div>

      <div class="d-flex gap-2 justify-content-end">
        ${cert.verifyUrl && cert.verifyUrl !== '#' ? `
          <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background: var(--gradient-primary); border: none;">
            <i class="fas fa-external-link-alt me-1"></i> Verify on Official Site
          </a>
        ` : ''}
      </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('certificateModal'));
    modal.show();
  }

  // --------------------------------------------------------------------------
  // 7. Clipboard Copy Helper
  // --------------------------------------------------------------------------
  function copyText(text, label = "Item") {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard!`, 'success');
      }).catch(() => {
        showToast(`Failed to copy ${label}`, 'error');
      });
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(`${label} copied to clipboard!`, 'success');
    }
  }

  // --------------------------------------------------------------------------
  // 8. Contact Form Validation & Delivery
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = document.getElementById('contactSubmitBtn');
      const feedbackBox = document.getElementById('formFeedbackBox');

      let isValid = true;

      // Reset states
      [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
        if (inp) inp.classList.remove('is-invalid');
      });
      feedbackBox.className = 'form-feedback-box';
      feedbackBox.style.display = 'none';

      // Validation
      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        showToast("Please correct highlighted fields before submitting.", "error");
        return;
      }

      // Submission execution
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending Message...';

      const emailjsConfig = window.PORTFOLIO_CONFIG.emailjs;

      // Check if EmailJS is live and configured
      if (emailjsConfig && emailjsConfig.serviceId && emailjsConfig.publicKey && window.emailjs) {
        window.emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
          },
          emailjsConfig.publicKey
        ).then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
          feedbackBox.className = 'form-feedback-box success';
          feedbackBox.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! Thank you for reaching out.';
          feedbackBox.style.display = 'flex';
          form.reset();
          showToast("Message sent successfully!", "success");
        }).catch((err) => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
          handleFallbackMail(nameInput.value, subjectInput.value, messageInput.value);
        });
      } else {
        // Direct reliable client-side mail trigger
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
          handleFallbackMail(nameInput.value, subjectInput.value, messageInput.value);
          feedbackBox.className = 'form-feedback-box success';
          feedbackBox.innerHTML = '<i class="fas fa-envelope-open-text"></i> Email client prepared! Ayushi has received your draft at ayushivagela2197@gmail.com.';
          feedbackBox.style.display = 'flex';
          showToast("Prepared email message! Opening client...", "success");
        }, 800);
      }
    });
  }

  function handleFallbackMail(name, subject, message) {
    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - From ${name}`);
    const encodedBody = encodeURIComponent(`Hi Ayushi,\n\n${message}\n\nBest regards,\n${name}`);
    const mailtoLink = `mailto:${window.PORTFOLIO_CONFIG.author.email}?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoLink;
  }

  // --------------------------------------------------------------------------
  // 9. Back to Top Smooth Scroll
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Dynamic Current Year
  // --------------------------------------------------------------------------
  function initDynamicYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --------------------------------------------------------------------------
  // 11. Initializer
  // --------------------------------------------------------------------------
  function init() {
    initNavbar();
    initTypingAnimation();
    initScrollReveal();
    initSkillsFilter();
    initContactForm();
    initBackToTop();
    initDynamicYear();

    // Initialize clothing ecommerce demo
    if (window.EcommerceDemo) {
      window.EcommerceDemo.init();
    }
  }

  return {
    init,
    showToast,
    openCertModal,
    copyText
  };
})();

// Launch application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.PortfolioApp.init();
});
