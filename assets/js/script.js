// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.project-card, .step, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
// Load and Display Submitted Campaigns
function displaySubmittedCampaigns() {
    const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    
    if (campaigns.length === 0) {
        return; // No campaigns to display
    }
    
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        return;
    }
    
    // Add submitted campaigns to the beginning of the grid
    campaigns.forEach(campaign => {
        const progressPercent = (campaign.currentFunding / campaign.fundingGoal) * 100;
        
        const campaignCard = document.createElement('div');
        campaignCard.className = 'project-card';
        campaignCard.setAttribute('data-campaign-id', campaign.id);
        campaignCard.innerHTML = `
            <div class="project-image">
                <img src="${campaign.image}" alt="${campaign.projectTitle}">
                <span style="position: absolute; top: 10px; right: 10px; background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: 600;">NEW</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${campaign.projectTitle}</h3>
                <p class="project-description">${campaign.projectDescription.substring(0, 80)}...</p>
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-label">Funded</span>
                        <span class="stat-value">kr ${campaign.currentFunding.toLocaleString()}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Goal</span>
                        <span class="stat-value">kr ${campaign.fundingGoal.toLocaleString()}</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${Math.min(progressPercent, 100)}%"></div>
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #666;">
                    By <strong>${campaign.creatorName}</strong> | Category: <strong>${campaign.category}</strong>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <a href="#" class="project-link view-details-btn" data-campaign-id="${campaign.id}" style="pointer-events: auto; flex: 1; cursor: pointer;">View Details →</a>
                    <button class="btn-delete-campaign" data-campaign-id="${campaign.id}" style="background-color: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: 600;">Delete</button>
                </div>
            </div>
        `;
        
        projectsGrid.insertBefore(campaignCard, projectsGrid.firstChild);
    });
    
    // Add delete functionality
    document.querySelectorAll('.btn-delete-campaign').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const campaignId = parseInt(this.getAttribute('data-campaign-id'));
            deleteCampaign(campaignId);
        });
    });

    // Add view details functionality
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const campaignId = parseInt(this.getAttribute('data-campaign-id'));
            sessionStorage.setItem('selectedCampaignId', campaignId);
            window.location.href = 'pages/campaign-detail.html';
        });
    });
    
    // Re-observe new cards for animation
    document.querySelectorAll('.project-card').forEach(el => {
        if (el.style.opacity === '') {
            el.style.opacity = '0';
            observer.observe(el);
        }
    });
}

function deleteCampaign(campaignId) {
    if (confirm('Are you sure you want to delete this campaign?')) {
        let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        campaigns = campaigns.filter(c => c.id !== campaignId);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        
        // Remove the card from DOM
        const card = document.querySelector(`[data-campaign-id="${campaignId}"]`);
        if (card) {
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                card.remove();
            }, 300);
        }
        
        console.log('Campaign deleted:', campaignId);
    }
}

// Display campaigns when page loads
document.addEventListener('DOMContentLoaded', displaySubmittedCampaigns);