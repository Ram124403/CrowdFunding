// Display campaign details on campaign-detail.html
function displayCampaignDetails() {
    const campaignId = parseInt(sessionStorage.getItem('selectedCampaignId'));
    
    if (!campaignId) {
        return; // No campaign selected
    }
    
    const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    const campaign = campaigns.find(c => c.id === campaignId);
    
    if (!campaign) {
        return; // Campaign not found
    }
    
    // Update campaign hero
    const heroImg = document.querySelector('.campaign-hero img');
    if (heroImg) {
        heroImg.src = campaign.image;
        heroImg.alt = campaign.projectTitle;
    }
    
    const heroTitle = document.querySelector('.campaign-hero h1');
    if (heroTitle) {
        heroTitle.textContent = campaign.projectTitle;
    }
    
    // Update page title
    document.title = `${campaign.projectTitle} - Campaign Details | FundHub`;
    
    // Update campaign stats
    const fundedAmount = campaign.currentFunding.toLocaleString();
    const goalAmount = campaign.fundingGoal.toLocaleString();
    const progressPercent = Math.min((campaign.currentFunding / campaign.fundingGoal) * 100, 100);
    
    const statValue = document.querySelector('.campaign-stats-bar .stat-value');
    if (statValue) {
        statValue.textContent = `kr ${fundedAmount}`;
    }
    
    const statLabel = document.querySelector('.campaign-stats-bar .stat-label');
    if (statLabel) {
        statLabel.textContent = `pledged of kr ${goalAmount} goal`;
    }
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = progressPercent + '%';
    }
    
    // Update backers count
    const backersMeta = document.querySelector('.meta-item:first-child .meta-number');
    if (backersMeta) {
        backersMeta.textContent = campaign.backers.toLocaleString();
    }
    
    // Update campaign duration
    const daysLeftMeta = document.querySelector('.meta-item:last-child .meta-number');
    if (daysLeftMeta) {
        daysLeftMeta.textContent = campaign.campaignDuration;
    }
    
    const daysLeftLabel = document.querySelector('.meta-item:last-child .meta-label');
    if (daysLeftLabel) {
        daysLeftLabel.textContent = `Days (Campaign Duration)`;
    }
    
    // Update About section
    const aboutSection = document.querySelector('.campaign-section');
    if (aboutSection) {
        aboutSection.innerHTML = `
            <h2>About This Project</h2>
            <p>${campaign.projectDescription}</p>
            ${campaign.creatorBio ? `<h3>About the Creator</h3><p>${campaign.creatorBio}</p>` : ''}
            <h3>Campaign Details:</h3>
            <ul class="feature-list">
                <li><strong>Creator:</strong> ${campaign.creatorName}</li>
                <li><strong>Email:</strong> ${campaign.creatorEmail}</li>
                <li><strong>Category:</strong> ${campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1).replace('-', ' ')}</li>
                <li><strong>Funding Goal:</strong> kr ${campaign.fundingGoal.toLocaleString()}</li>
                <li><strong>Campaign Duration:</strong> ${campaign.campaignDuration} days</li>
                <li><strong>Current Funding:</strong> kr ${campaign.currentFunding.toLocaleString()}</li>
                <li><strong>Backers:</strong> ${campaign.backers}</li>
                <li><strong>Created:</strong> ${new Date(campaign.createdAt).toLocaleDateString()}</li>
            </ul>
        `;
    }
    
    // Clear session storage after displaying
    sessionStorage.removeItem('selectedCampaignId');
}

// Display campaign details when page loads
document.addEventListener('DOMContentLoaded', displayCampaignDetails);
