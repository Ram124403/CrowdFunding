// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const subscribe = document.getElementById('subscribe').checked;
        
        // Validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        console.log({
            name,
            email,
            phone,
            subject,
            message,
            subscribe,
            timestamp: new Date().toLocaleString()
        });
        
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });
}

// Campaign Form Handler
const campaignForm = document.getElementById('campaignForm');
const campaignMessage = document.getElementById('campaignMessage');

if (campaignForm) {
    campaignForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const creatorName = document.getElementById('creator-name').value.trim();
        const creatorEmail = document.getElementById('creator-email').value.trim();
        const projectTitle = document.getElementById('project-title').value.trim();
        const category = document.getElementById('category').value;
        const fundingGoal = parseInt(document.getElementById('funding-goal').value);
        const campaignDuration = parseInt(document.getElementById('campaign-duration').value);
        const projectDescription = document.getElementById('project-description').value.trim();
        const creatorBio = document.getElementById('creator-bio').value.trim();
        const termsAgreed = document.getElementById('terms').checked;
        
        // Validation
        if (!creatorName || !creatorEmail || !projectTitle || !category || !fundingGoal || !campaignDuration || !projectDescription) {
            showCampaignMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!termsAgreed) {
            showCampaignMessage('You must agree to the Terms of Service.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(creatorEmail)) {
            showCampaignMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Funding goal validation
        if (fundingGoal < 100000) {
            showCampaignMessage('Minimum funding goal is kr 50,000.', 'error');
            return;
        }
        
        // Campaign duration validation
        if (campaignDuration < 15 || campaignDuration > 365) {
            showCampaignMessage('Campaign duration must be between 15-365 days.', 'error');
            return;
        }
        
        // Create campaign object
        const newCampaign = {
            id: Date.now(),
            creatorName,
            creatorEmail,
            projectTitle,
            category,
            fundingGoal,
            campaignDuration,
            projectDescription,
            creatorBio,
            termsAgreed,
            currentFunding: 0,
            backers: 0,
            createdAt: new Date().toISOString(),
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
        };
        
        // Save to localStorage
        let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        campaigns.push(newCampaign);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        
        // Log the campaign
        console.log('Campaign submitted:', newCampaign);
        
        // Show success message
        showCampaignMessage('🎉 Campaign submitted successfully! Check the Projects section on the home page.', 'success');
        
        // Reset form
        campaignForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            campaignMessage.textContent = '';
        }, 5000);
    });
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.color = type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)';
    formMessage.style.display = 'block';
}

function showCampaignMessage(text, type) {
    if (campaignMessage) {
        campaignMessage.textContent = text;
        campaignMessage.style.color = type === 'success' ? 'var(--primary-color)' : (type === 'error' ? 'var(--secondary-color)' : '#FF9500');
        campaignMessage.style.display = 'block';
        campaignMessage.style.marginTop = '20px';
        campaignMessage.style.padding = '15px';
        campaignMessage.style.borderRadius = '8px';
        campaignMessage.style.fontWeight = '500';
    }
}

// Back This Project Button
const backButtons = document.querySelectorAll('.btn-back');
backButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Thank you for your interest! In a real application, this would open the backing flow.');
    });
});

// Reward Selection
const selectRewardButtons = document.querySelectorAll('.reward-tier button');
selectRewardButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const rewardTier = this.closest('.reward-tier');
        const rewardTitle = rewardTier.querySelector('h4').textContent;
        const rewardPrice = rewardTier.querySelector('.reward-price').textContent;
        
        alert(`You selected: ${rewardTitle} (${rewardPrice})\n\nIn a real application, this would proceed to checkout.`);
    });
});

// Share Button Functionality
const shareButtons = document.querySelectorAll('.share-btn');
shareButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const url = window.location.href;
        const title = document.querySelector('h1').textContent;
        
        if (this.title.includes('Copy')) {
            // Copy link to clipboard
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        } else {
            alert(`Share on ${this.title}: ${title}\n${url}`);
        }
    });
});
