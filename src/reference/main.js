// Nigeria Political Transparency Platform - Main JavaScript
// Comprehensive interactive functionality for democratic accountability

class TransparencyPlatform {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.officialsData = this.generateOfficialsData();
        this.statesData = this.generateStatesData();
        this.communityIdeas = this.generateCommunityIdeas();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('officials.html')) return 'officials';
        if (path.includes('forum.html')) return 'forum';
        if (path.includes('leaderboard.html')) return 'leaderboard';
        return 'dashboard';
    }

    init() {
        this.initializeAnimations();
        this.initializeScrollReveal();
        
        switch(this.currentPage) {
            case 'dashboard':
                this.initDashboard();
                break;
            case 'officials':
                this.initOfficialsPage();
                break;
            case 'forum':
                this.initForumPage();
                break;
            case 'leaderboard':
                this.initLeaderboardPage();
                break;
        }
        
        this.initializeNavigation();
        this.initializeModals();
    }

    // Dashboard Initialization
    initDashboard() {
        this.initTypedText();
        this.initCounterAnimations();
        this.initInteractiveMap();
        this.initLiveStats();
    }

    initTypedText() {
        if (document.getElementById('typed-text')) {
            new Typed('#typed-text', {
                strings: [
                    'Accountability',
                    'Transparency', 
                    'Citizen Power',
                    'Good Governance'
                ],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    initCounterAnimations() {
        const counters = [
            { id: 'officials-count', target: 469, suffix: '' },
            { id: 'promises-kept', target: 1247, suffix: '' },
            { id: 'citizen-rating', target: 3.7, suffix: '' },
            { id: 'community-ideas', target: 892, suffix: '' }
        ];

        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (element) {
                this.animateCounter(element, counter.target, counter.suffix);
            }
        });
    }

    animateCounter(element, target, suffix) {
        anime({
            targets: { count: 0 },
            count: target,
            duration: 2000,
            easing: 'easeOutExpo',
            update: function(anim) {
                const value = suffix === '' ? Math.floor(anim.animatables[0].target.count) : 
                              anim.animatables[0].target.count.toFixed(1);
                element.textContent = value + suffix;
            }
        });
    }

    initInteractiveMap() {
        const statePaths = document.querySelectorAll('.state-path');
        const modal = document.getElementById('state-modal');
        const modalStateName = document.getElementById('modal-state-name');
        const modalContent = document.getElementById('modal-content');

        statePaths.forEach(path => {
            path.addEventListener('click', (e) => {
                const stateName = e.target.getAttribute('data-state');
                if (stateName) {
                    this.openStateModal(stateName);
                }
            });

            path.addEventListener('mouseenter', (e) => {
                anime({
                    targets: e.target,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            path.addEventListener('mouseleave', (e) => {
                anime({
                    targets: e.target,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    openStateModal(stateName) {
        const modal = document.getElementById('state-modal');
        const modalStateName = document.getElementById('modal-state-name');
        const modalContent = document.getElementById('modal-content');
        
        const stateData = this.statesData[stateName];
        if (!stateData) return;

        modalStateName.textContent = stateName + ' State';
        modalContent.innerHTML = this.generateStateModalContent(stateData);
        modal.classList.remove('hidden');

        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }

    generateStateModalContent(stateData) {
        return `
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold text-forest mb-3">Governor Information</h4>
                    <div class="bg-gray-50 p-4 rounded-lg mb-4">
                        <div class="flex items-center space-x-3 mb-2">
                            <img src="resources/transparency-concept.jpg" alt="${stateData.governor}" class="w-12 h-12 rounded-full object-cover">
                            <div>
                                <div class="font-semibold">${stateData.governor}</div>
                                <div class="text-sm text-gray-600">${stateData.party}</div>
                            </div>
                        </div>
                        <div class="text-sm text-gray-700">
                            <div>Took Office: ${stateData.tookOffice}</div>
                            <div>Term Ends: ${stateData.termEnd}</div>
                        </div>
                    </div>
                    
                    <h4 class="font-semibold text-forest mb-3">Security Status</h4>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-4 h-4 ${this.getSecurityColor(stateData.securityStatus)} rounded"></div>
                        <span class="font-medium">${stateData.securityStatus}</span>
                    </div>
                    
                    <h4 class="font-semibold text-forest mb-3">Key Statistics</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Population:</span>
                            <span class="font-medium">${stateData.population}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>2024 Budget:</span>
                            <span class="font-medium">₦${stateData.budget2024}B</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Citizen Rating:</span>
                            <span class="font-medium">${stateData.citizenRating}/5</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-forest mb-3">Recent Projects</h4>
                    <div class="space-y-3">
                        ${stateData.recentProjects.map(project => `
                            <div class="bg-gray-50 p-3 rounded-lg">
                                <div class="font-medium text-sm">${project.name}</div>
                                <div class="text-xs text-gray-600">${project.status} - ${project.completion}% complete</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-forest h-2 rounded-full" style="width: ${project.completion}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="mt-6">
                        <button class="w-full bg-forest text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getSecurityColor(status) {
        const colors = {
            'Safe': 'bg-green-500',
            'Moderate': 'bg-yellow-500',
            'High Risk': 'bg-red-500',
            'Critical': 'bg-red-600'
        };
        return colors[status] || 'bg-gray-500';
    }

    initLiveStats() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateLiveStats();
        }, 30000); // Update every 30 seconds
    }

    updateLiveStats() {
        // Add subtle animations to stat cards to simulate live updates
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            anime({
                targets: card,
                scale: [1, 1.02, 1],
                duration: 300,
                delay: index * 100,
                easing: 'easeInOutQuad'
            });
        });
    }

    // Officials Page Initialization
    initOfficialsPage() {
        this.renderOfficialsGrid();
        this.initOfficialSearch();
        this.initOfficialFilters();
        this.initRatingSystem();
    }

    renderOfficialsGrid() {
        const container = document.getElementById('officials-grid');
        if (!container) return;

        container.innerHTML = this.officialsData.map(official => this.generateOfficialCard(official)).join('');
        this.initOfficialCardAnimations();
    }

    generateOfficialCard(official) {
        return `
            <div class="official-card bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" data-official-id="${official.id}">
                <div class="flex items-start space-x-4 mb-4">
                    <img src="resources/transparency-concept.jpg" alt="${official.name}" class="w-16 h-16 rounded-full object-cover">
                    <div class="flex-1">
                        <h3 class="font-semibold text-forest text-lg">${official.name}</h3>
                        <p class="text-gray-600">${official.position}</p>
                        <p class="text-sm text-gray-500">${official.state}</p>
                        <span class="inline-block bg-${official.party === 'APC' ? 'green' : official.party === 'PDP' ? 'red' : 'blue'}-100 text-${official.party === 'APC' ? 'green' : official.party === 'PDP' ? 'red' : 'blue'}-800 px-2 py-1 rounded-full text-xs mt-1">${official.party}</span>
                    </div>
                </div>
                
                <div class="space-y-3 mb-4">
                    <div class="flex justify-between text-sm">
                        <span>Promises Kept:</span>
                        <span class="font-medium">${official.promisesKept}/${official.totalPromises}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-forest h-2 rounded-full" style="width: ${(official.promisesKept / official.totalPromises) * 100}%"></div>
                    </div>
                    
                    <div class="flex justify-between text-sm">
                        <span>Citizen Rating:</span>
                        <span class="font-medium">${official.citizenRating}/5</span>
                    </div>
                    <div class="flex space-x-1">
                        ${this.generateStarRating(official.citizenRating)}
                    </div>
                </div>
                
                <div class="flex space-x-2">
                    <button class="flex-1 bg-forest text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                        View Details
                    </button>
                    <button class="rate-official-btn bg-earth text-forest py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm" data-official-id="${official.id}">
                        Rate
                    </button>
                </div>
            </div>
        `;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<svg class="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>';
        }
        
        if (hasHalfStar) {
            stars += '<svg class="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" opacity="0.5"/></svg>';
        }
        
        return stars;
    }

    initOfficialCardAnimations() {
        const cards = document.querySelectorAll('.official-card');
        cards.forEach((card, index) => {
            anime({
                targets: card,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                delay: index * 100,
                easing: 'easeOutExpo'
            });
        });
    }

    initRatingSystem() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('rate-official-btn')) {
                const officialId = e.target.getAttribute('data-official-id');
                this.openRatingModal(officialId);
            }
        });
    }

    openRatingModal(officialId) {
        const official = this.officialsData.find(o => o.id === officialId);
        if (!official) return;

        // Create rating modal (simplified for demo)
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-md w-full mx-4 p-6">
                <h3 class="font-display text-xl font-bold text-forest mb-4">Rate ${official.name}</h3>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <div class="flex space-x-1 mb-4">
                        ${[1,2,3,4,5].map(star => `
                            <button class="rating-star w-8 h-8 text-gray-300 hover:text-yellow-500 transition-colors" data-rating="${star}">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Your Review (Required for ratings below 3)</label>
                    <textarea class="w-full p-3 border border-gray-300 rounded-lg" rows="4" placeholder="Share your experience with this official..."></textarea>
                </div>
                <div class="flex space-x-3">
                    <button class="cancel-rating flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button class="submit-rating flex-1 bg-forest text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                        Submit Rating
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.initRatingModalEvents(modal, officialId);
    }

    initRatingModalEvents(modal, officialId) {
        let selectedRating = 0;
        
        // Star rating interaction
        modal.querySelectorAll('.rating-star').forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-rating'));
                this.updateStarDisplay(modal, selectedRating);
            });
        });

        // Modal actions
        modal.querySelector('.cancel-rating').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.submit-rating').addEventListener('click', () => {
            if (selectedRating > 0) {
                this.submitRating(officialId, selectedRating);
                document.body.removeChild(modal);
            } else {
                alert('Please select a rating');
            }
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    updateStarDisplay(modal, rating) {
        const stars = modal.querySelectorAll('.rating-star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-yellow-500');
            } else {
                star.classList.remove('text-yellow-500');
                star.classList.add('text-gray-300');
            }
        });
    }

    submitRating(officialId, rating) {
        // Simulate rating submission
        console.log(`Submitted rating ${rating} for official ${officialId}`);
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50';
        toast.textContent = 'Rating submitted successfully!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }

    // Forum Page Initialization
    initForumPage() {
        this.renderCommunityIdeas();
        this.initIdeaSubmission();
        this.initVotingSystem();
        this.initCategoryFilters();
    }

    renderCommunityIdeas() {
        const container = document.getElementById('ideas-container');
        if (!container) return;

        container.innerHTML = this.communityIdeas.map(idea => this.generateIdeaCard(idea)).join('');
        this.initIdeaCardAnimations();
    }

    generateIdeaCard(idea) {
        return `
            <div class="idea-card bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="font-semibold text-forest text-lg mb-2">${idea.title}</h3>
                        <p class="text-gray-700 mb-3">${idea.description}</p>
                        <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>${idea.author}</span>
                            <span>${idea.state}</span>
                            <span>${idea.category}</span>
                        </div>
                    </div>
                    <div class="text-center ml-4">
                        <div class="text-2xl font-bold text-forest">${idea.votes}</div>
                        <div class="text-xs text-gray-500">votes</div>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex space-x-2">
                        <button class="vote-btn upvote bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors" data-idea-id="${idea.id}" data-vote="up">
                            👍 Upvote
                        </button>
                        <button class="vote-btn downvote bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm hover:bg-red-200 transition-colors" data-idea-id="${idea.id}" data-vote="down">
                            👎 Downvote
                        </button>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                        <span>${idea.comments} comments</span>
                        <span>•</span>
                        <span>${idea.timeAgo}</span>
                    </div>
                </div>
            </div>
        `;
    }

    initVotingSystem() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('vote-btn')) {
                const ideaId = e.target.getAttribute('data-idea-id');
                const voteType = e.target.getAttribute('data-vote');
                this.handleVote(ideaId, voteType, e.target);
            }
        });
    }

    handleVote(ideaId, voteType, button) {
        // Simulate vote processing
        const idea = this.communityIdeas.find(i => i.id === ideaId);
        if (!idea) return;

        if (voteType === 'up') {
            idea.votes += 1;
        } else {
            idea.votes -= 1;
        }

        // Update UI
        const voteCountElement = button.closest('.idea-card').querySelector('.text-2xl');
        if (voteCountElement) {
            anime({
                targets: voteCountElement,
                scale: [1, 1.2, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: () => {
                    voteCountElement.textContent = idea.votes;
                }
            });
        }

        // Visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    // Leaderboard Page Initialization
    initLeaderboardPage() {
        this.renderLeaderboards();
        this.initLeaderboardAnimations();
    }

    renderLeaderboards() {
        this.renderOfficialLeaderboard();
        this.renderIdeasLeaderboard();
        this.renderStateLeaderboard();
    }

    renderOfficialLeaderboard() {
        const container = document.getElementById('officials-leaderboard');
        if (!container) return;

        const sortedOfficials = [...this.officialsData]
            .sort((a, b) => b.citizenRating - a.citizenRating)
            .slice(0, 10);

        container.innerHTML = sortedOfficials.map((official, index) => `
            <div class="leaderboard-item flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index < 3 ? 
                    (index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600') : 'bg-gray-300'}">
                    ${index + 1}
                </div>
                <img src="resources/transparency-concept.jpg" alt="${official.name}" class="w-12 h-12 rounded-full object-cover">
                <div class="flex-1">
                    <div class="font-semibold text-forest">${official.name}</div>
                    <div class="text-sm text-gray-600">${official.position} • ${official.state}</div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-lg text-forest">${official.citizenRating}/5</div>
                    <div class="text-xs text-gray-500">${official.promisesKept}/${official.totalPromises} promises</div>
                </div>
            </div>
        `).join('');
    }

    // Scroll Reveal Animation
    initializeScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(el => {
            observer.observe(el);
        });
    }

    // Animation Initialization
    initializeAnimations() {
        // Add smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Navigation
    initializeNavigation() {
        // Mobile menu toggle (if needed)
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.id === 'close-modal' || e.target.classList.contains('fixed')) {
                const modal = document.getElementById('state-modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            }
        });
    }

    initializeModals() {
        // Initialize any additional modal functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.fixed.inset-0');
                modals.forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        modal.classList.add('hidden');
                    }
                });
            }
        });
    }

    // Data Generation Methods
    generateOfficialsData() {
        const officials = [
            { id: '1', name: 'Babajide Sanwo-Olu', position: 'Governor', state: 'Lagos', party: 'APC', tookOffice: '2019', termEnd: '2027', promisesKept: 78, totalPromises: 95, citizenRating: 4.2 },
            { id: '2', name: 'Charles Soludo', position: 'Governor', state: 'Anambra', party: 'APGA', tookOffice: '2022', termEnd: '2026', promisesKept: 65, totalPromises: 80, citizenRating: 4.5 },
            { id: '3', name: 'Godswill Akpabio', position: 'Senate President', state: 'Akwa Ibom', party: 'APC', tookOffice: '2023', termEnd: '2027', promisesKept: 45, totalPromises: 60, citizenRating: 3.8 },
            { id: '4', name: 'Alex Otti', position: 'Governor', state: 'Abia', party: 'LP', tookOffice: '2023', termEnd: '2027', promisesKept: 52, totalPromises: 70, citizenRating: 4.1 },
            { id: '5', name: 'Ahmadu Umaru Fintiri', position: 'Governor', state: 'Adamawa', party: 'PDP', tookOffice: '2019', termEnd: '2027', promisesKept: 58, totalPromises: 85, citizenRating: 3.9 },
            { id: '6', name: 'Umo Eno', position: 'Governor', state: 'Akwa Ibom', party: 'PDP', tookOffice: '2023', termEnd: '2027', promisesKept: 41, totalPromises: 65, citizenRating: 4.0 },
            { id: '7', name: 'Bala Mohammed', position: 'Governor', state: 'Bauchi', party: 'PDP', tookOffice: '2019', termEnd: '2027', promisesKept: 49, totalPromises: 75, citizenRating: 3.7 },
            { id: '8', name: 'Douye Diri', position: 'Governor', state: 'Bayelsa', party: 'PDP', tookOffice: '2020', termEnd: '2028', promisesKept: 38, totalPromises: 55, citizenRating: 3.6 },
            { id: '9', name: 'Hyacinth Alia', position: 'Governor', state: 'Benue', party: 'APC', tookOffice: '2023', termEnd: '2027', promisesKept: 44, totalPromises: 70, citizenRating: 3.8 },
            { id: '10', name: 'Babagana Zulum', position: 'Governor', state: 'Borno', party: 'APC', tookOffice: '2019', termEnd: '2027', promisesKept: 72, totalPromises: 90, citizenRating: 4.3 }
        ];
        return officials;
    }

    generateStatesData() {
        return {
            'Lagos': {
                governor: 'Babajide Sanwo-Olu',
                party: 'APC',
                tookOffice: 'May 2019',
                termEnd: 'May 2027',
                securityStatus: 'Safe',
                population: '15.4M',
                budget2024: 2.2,
                citizenRating: 4.2,
                recentProjects: [
                    { name: 'Lagos Blue Line Rail', status: 'Completed', completion: 100 },
                    { name: 'Lekki Deep Sea Port', status: 'In Progress', completion: 85 },
                    { name: 'Fourth Mainland Bridge', status: 'Planning', completion: 25 }
                ]
            },
            'Kaduna': {
                governor: 'Uba Sani',
                party: 'APC',
                tookOffice: 'May 2023',
                termEnd: 'May 2027',
                securityStatus: 'Moderate',
                population: '8.5M',
                budget2024: 0.8,
                citizenRating: 3.8,
                recentProjects: [
                    { name: 'Kaduna ICT Hub', status: 'In Progress', completion: 60 },
                    { name: 'Agricultural Processing Zone', status: 'Completed', completion: 90 },
                    { name: 'Security Infrastructure', status: 'In Progress', completion: 70 }
                ]
            },
            'Borno': {
                governor: 'Babagana Zulum',
                party: 'APC',
                tookOffice: 'May 2019',
                termEnd: 'May 2027',
                securityStatus: 'High Risk',
                population: '5.9M',
                budget2024: 0.4,
                citizenRating: 4.3,
                recentProjects: [
                    { name: 'Reconstruction Initiative', status: 'In Progress', completion: 75 },
                    { name: 'IDP Resettlement Program', status: 'Ongoing', completion: 65 },
                    { name: 'Agricultural Recovery', status: 'In Progress', completion: 55 }
                ]
            }
        };
    }

    generateCommunityIdeas() {
        return [
            {
                id: '1',
                title: 'Digital Skills Training Centers in Rural Areas',
                description: 'Establish community-based digital literacy centers to bridge the technology gap between urban and rural areas, focusing on youth and women empowerment.',
                author: 'Adebayo Oluwaseun',
                state: 'Oyo',
                category: 'Education',
                votes: 245,
                comments: 32,
                timeAgo: '2 days ago'
            },
            {
                id: '2',
                title: 'Solar-Powered Irrigation Systems for Small Farmers',
                description: 'Implement affordable solar irrigation solutions to help small-scale farmers increase crop yields and reduce dependence on seasonal rainfall.',
                author: 'Fatima Abdullahi',
                state: 'Kano',
                category: 'Agriculture',
                votes: 189,
                comments: 28,
                timeAgo: '4 days ago'
            },
            {
                id: '3',
                title: 'Community Health Insurance Scheme',
                description: 'Create a sustainable community-based health insurance program to provide affordable healthcare access for informal sector workers.',
                author: 'Dr. Chinyere Nwosu',
                state: 'Anambra',
                category: 'Healthcare',
                votes: 312,
                comments: 45,
                timeAgo: '1 week ago'
            }
        ];
    }
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TransparencyPlatform();
});

// Handle page visibility changes for real-time updates
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible, refresh data if needed
        console.log('Page visible - refreshing data');
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Trigger any responsive adjustments needed
    console.log('Window resized - adjusting layout');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TransparencyPlatform;
}