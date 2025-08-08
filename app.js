// Sales Coach AI - Main Application JavaScript (FIXED VERSION)

class SalesCoachApp {
    constructor() {
        this.currentUser = null;
        this.currentSession = null;
        this.currentFramework = null;
        this.isRecording = false;
        this.sessionTimer = null;
        this.sessionStartTime = null;
        
        // Initialize app data
        this.frameworks = [
            {
                id: "values-based-sales",
                name: "Values-Based Sales Path",
                description: "Build trust through shared values and authentic connection",
                steps: [
                    {id: "connect", title: "Connect", description: "Establish rapport and trust", weight: 0.15, tips: ["Use active listening", "Find common ground", "Show genuine interest"]},
                    {id: "explore", title: "Explore", description: "Discover needs and challenges", weight: 0.20, tips: ["Ask open-ended questions", "Listen for pain points", "Understand context"]},
                    {id: "match", title: "Match Solutions", description: "Align offerings with needs", weight: 0.20, tips: ["Connect features to benefits", "Use specific examples", "Address key concerns"]},
                    {id: "confirm", title: "Confirm Fit", description: "Validate solution alignment", weight: 0.15, tips: ["Summarize understanding", "Get explicit agreement", "Confirm next steps"]},
                    {id: "resolve", title: "Resolve Concerns", description: "Address objections and hesitations", weight: 0.15, tips: ["Acknowledge concerns", "Provide evidence", "Reframe objections"]},
                    {id: "support", title: "Support Success", description: "Ensure implementation success", weight: 0.15, tips: ["Plan implementation", "Provide ongoing support", "Measure results"]}
                ]
            },
            {
                id: "four-dimensional-questions",
                name: "4-Dimensional Question Model",
                description: "Systematic questioning approach for deep discovery",
                steps: [
                    {id: "context", title: "Context", description: "Understand current situation", weight: 0.25, tips: ["Map current process", "Identify stakeholders", "Understand timeline"]},
                    {id: "challenge", title: "Challenge", description: "Identify pain points", weight: 0.25, tips: ["Dig deeper into problems", "Quantify impact", "Find root causes"]},
                    {id: "impact", title: "Impact", description: "Quantify consequences", weight: 0.25, tips: ["Calculate costs", "Measure lost opportunities", "Assess risks"]},
                    {id: "benefit", title: "Benefit", description: "Envision positive outcomes", weight: 0.25, tips: ["Paint future state", "Quantify benefits", "Create urgency"]}
                ]
            },
            {
                id: "insight-driven-selling",
                name: "Insight-Driven Selling",
                description: "Lead with insights to challenge customer thinking",
                steps: [
                    {id: "perspective", title: "Offer New Perspective", description: "Share valuable insights", weight: 0.4, tips: ["Use industry data", "Challenge assumptions", "Provide fresh viewpoint"]},
                    {id: "tailor", title: "Tailor to Buyer", description: "Customize message to audience", weight: 0.3, tips: ["Adapt communication style", "Use relevant examples", "Match buyer preferences"]},
                    {id: "guide", title: "Guide Decision", description: "Lead toward optimal choice", weight: 0.3, tips: ["Recommend best path", "Support with evidence", "Make decision easy"]}
                ]
            },
            {
                id: "mutual-commitment-selling",
                name: "Mutual Commitment Selling",
                description: "Build partnership through shared commitments",
                steps: [
                    {id: "expectations", title: "Set Expectations", description: "Align on process and outcomes", weight: 0.25, tips: ["Define success criteria", "Agree on timeline", "Set mutual goals"]},
                    {id: "pain", title: "Identify Pain", description: "Discover critical challenges", weight: 0.25, tips: ["Find urgent problems", "Understand impact", "Prioritize issues"]},
                    {id: "qualify", title: "Qualify Fit", description: "Assess mutual compatibility", weight: 0.25, tips: ["Evaluate match", "Check capabilities", "Assess commitment"]},
                    {id: "path", title: "Propose Path", description: "Suggest next steps together", weight: 0.25, tips: ["Collaborate on solution", "Share responsibilities", "Plan together"]}
                ]
            },
            {
                id: "roi-alignment-method",
                name: "ROI Alignment Method",
                description: "Focus on measurable business impact and return",
                steps: [
                    {id: "current", title: "Current State", description: "Baseline current performance", weight: 0.25, tips: ["Measure existing metrics", "Document current costs", "Assess performance"]},
                    {id: "desired", title: "Desired Outcome", description: "Define success metrics", weight: 0.25, tips: ["Set clear targets", "Define KPIs", "Establish timeline"]},
                    {id: "value", title: "Quantify Value", description: "Calculate potential ROI", weight: 0.25, tips: ["Build business case", "Show financial impact", "Compare alternatives"]},
                    {id: "align", title: "Align Proposal", description: "Match solution to value", weight: 0.25, tips: ["Connect features to ROI", "Justify investment", "Show payback period"]}
                ]
            },
            {
                id: "deal-qualification-framework",
                name: "Deal Qualification Framework",
                description: "Comprehensive opportunity assessment methodology",
                steps: [
                    {id: "metrics", title: "Metrics", description: "Establish success measurements", weight: 0.17, tips: ["Define KPIs", "Set benchmarks", "Agree on measurement"]},
                    {id: "contact", title: "Buyer Contact", description: "Identify decision makers", weight: 0.17, tips: ["Map decision makers", "Understand influence", "Build relationships"]},
                    {id: "process", title: "Decision Process", description: "Map buying journey", weight: 0.16, tips: ["Understand process", "Identify gates", "Map timeline"]},
                    {id: "criteria", title: "Decision Criteria", description: "Understand evaluation factors", weight: 0.16, tips: ["Learn evaluation criteria", "Understand priorities", "Influence factors"]},
                    {id: "champion", title: "Identify Champion", description: "Find internal advocate", weight: 0.17, tips: ["Build internal support", "Develop champions", "Enable advocates"]},
                    {id: "competition", title: "Anticipate Competition", description: "Assess competitive landscape", weight: 0.17, tips: ["Map competitors", "Understand strengths", "Differentiate value"]}
                ]
            }
        ];

        this.coachingTips = [
            {type: "positive", message: "Great use of open-ended questions!", category: "questioning"},
            {type: "warning", message: "Try to avoid leading questions", category: "questioning"},
            {type: "suggestion", message: "Consider asking about budget at this stage", category: "qualification"},
            {type: "positive", message: "Excellent active listening demonstration", category: "listening"},
            {type: "warning", message: "Pause to confirm understanding", category: "confirmation"},
            {type: "positive", message: "Good job identifying the pain point", category: "discovery"},
            {type: "suggestion", message: "Ask about the impact of this problem", category: "impact"},
            {type: "positive", message: "Nice transition to the next step", category: "flow"},
            {type: "warning", message: "Watch your speaking pace", category: "delivery"},
            {type: "suggestion", message: "Try to quantify the value proposition", category: "value"}
        ];

        this.aiResponses = [
            "That's an interesting point. Can you tell me more about how this would work in our specific situation?",
            "I'm concerned about the implementation timeline. How long would this typically take?",
            "What kind of ROI have other companies similar to ours seen?",
            "I need to discuss this with my team before making any decisions.",
            "The price seems quite high compared to other solutions we've looked at.",
            "How does this integrate with our existing systems?",
            "What kind of support do you provide during the implementation?",
            "Can you show me some case studies from companies in our industry?",
            "What happens if we're not satisfied with the results?",
            "I'm not sure this addresses our main concern about scalability."
        ];

        // Initialize the application
        this.init();
    }

    init() {
        console.log('Initializing Sales Coach AI...');
        this.showLoadingScreen();
        
        // Wait for loading screen, then setup event listeners and show auth
        setTimeout(() => {
            this.hideLoadingScreen();
            this.setupEventListeners();
            this.showAuthScreen();
            console.log('Application initialized');
        }, 2000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    showAuthScreen() {
        console.log('Showing auth screen');
        const authScreen = document.getElementById('auth-screen');
        const mainApp = document.getElementById('main-app');
        
        if (authScreen) authScreen.classList.add('active');
        if (mainApp) mainApp.classList.remove('active');
        
        // Ensure login form is shown by default
        this.showLoginForm();
    }

    showMainApp() {
        console.log('Showing main app');
        const authScreen = document.getElementById('auth-screen');
        const mainApp = document.getElementById('main-app');
        
        if (authScreen) authScreen.classList.remove('active');
        if (mainApp) mainApp.classList.add('active');
        
        this.showScreen('frameworks');
        this.renderFrameworks();
        this.setActiveNavigation('frameworks');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Authentication form switching - Use more specific event handling
        this.setupAuthenticationEvents();
        this.setupNavigationEvents();
        this.setupFrameworkEvents();
        this.setupSessionEvents();
        this.setupModalEvents();
        this.setupSettingsEvents();
        
        console.log('Event listeners setup complete');
    }

    setupAuthenticationEvents() {
        // Form switching
        const showSignupBtn = document.getElementById('show-signup');
        const showLoginBtn = document.getElementById('show-login');
        
        if (showSignupBtn) {
            showSignupBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Switching to signup form');
                this.showSignupForm();
                return false;
            };
        }

        if (showLoginBtn) {
            showLoginBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Switching to login form');
                this.showLoginForm();
                return false;
            };
        }

        // Authentication buttons - Use onclick for better compatibility
        const loginBtn = document.getElementById('login-submit');
        const signupBtn = document.getElementById('signup-submit');
        const magicLinkBtn = document.getElementById('magic-link-btn');
        const signOutBtn = document.getElementById('sign-out-btn');

        if (loginBtn) {
            loginBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Login button clicked');
                this.handleLogin();
                return false;
            };
        }

        if (signupBtn) {
            signupBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Signup button clicked');
                this.handleSignup();
                return false;
            };
        }

        if (magicLinkBtn) {
            magicLinkBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Magic link button clicked');
                this.handleMagicLink();
                return false;
            };
        }

        if (signOutBtn) {
            signOutBtn.onclick = () => {
                this.handleSignOut();
            };
        }

        // Enter key support
        const loginPassword = document.getElementById('login-password');
        const signupPassword = document.getElementById('signup-password');
        
        if (loginPassword) {
            loginPassword.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleLogin();
                }
            };
        }

        if (signupPassword) {
            signupPassword.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSignup();
                }
            };
        }

        // Fix input focus issues by ensuring inputs are properly focusable
        const inputs = document.querySelectorAll('#auth-screen input, #auth-screen textarea, #auth-screen select');
        inputs.forEach(input => {
            input.onclick = () => {
                input.focus();
            };
            // Ensure inputs are not readonly or disabled
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
        });
    }

    setupNavigationEvents() {
        // Bottom navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.onclick = () => {
                const screen = item.getAttribute('data-screen');
                console.log('Navigation to:', screen);
                this.showScreen(screen);
                this.setActiveNavItem(item);
            };
        });
    }

    setupFrameworkEvents() {
        // Framework search
        const searchInput = document.getElementById('framework-search');
        if (searchInput) {
            searchInput.oninput = (e) => {
                this.searchFrameworks(e.target.value);
            };
        }

        // Create framework button
        const createBtn = document.getElementById('create-framework-btn');
        if (createBtn) {
            createBtn.onclick = () => {
                this.showCustomFrameworkModal();
            };
        }
    }

    setupSessionEvents() {
        // Session controls
        const sessionBack = document.getElementById('session-back');
        if (sessionBack) {
            sessionBack.onclick = () => {
                this.endCurrentSession();
                this.showScreen('frameworks');
            };
        }

        const endSessionBtn = document.getElementById('end-session-btn');
        if (endSessionBtn) {
            endSessionBtn.onclick = () => {
                this.endSession();
            };
        }

        const micButton = document.getElementById('mic-button');
        if (micButton) {
            micButton.onclick = () => {
                this.toggleRecording();
            };
        }

        // Coaching and step tracker toggles
        const coachingToggle = document.getElementById('coaching-toggle');
        if (coachingToggle) {
            coachingToggle.onclick = () => {
                this.toggleCoachingDrawer();
            };
        }

        const stepTrackerToggle = document.getElementById('step-tracker-toggle');
        if (stepTrackerToggle) {
            stepTrackerToggle.onclick = () => {
                this.toggleStepTracker();
            };
        }

        // Results actions
        const resultsBack = document.getElementById('results-back');
        if (resultsBack) {
            resultsBack.onclick = () => {
                this.showScreen('frameworks');
            };
        }

        const newSessionBtn = document.getElementById('new-session-btn');
        if (newSessionBtn) {
            newSessionBtn.onclick = () => {
                this.showScreen('frameworks');
            };
        }

        const shareResultsBtn = document.getElementById('share-results-btn');
        if (shareResultsBtn) {
            shareResultsBtn.onclick = () => {
                this.shareResults();
            };
        }

        const exportPdfBtn = document.getElementById('export-pdf-btn');
        if (exportPdfBtn) {
            exportPdfBtn.onclick = () => {
                this.exportPDF();
            };
        }

        const exportTranscriptBtn = document.getElementById('export-transcript');
        if (exportTranscriptBtn) {
            exportTranscriptBtn.onclick = () => {
                this.exportTranscript();
            };
        }

        // Session list
        const viewAllSessionsBtn = document.getElementById('view-all-sessions');
        if (viewAllSessionsBtn) {
            viewAllSessionsBtn.onclick = () => {
                this.showScreen('sessions');
            };
        }
    }

    setupModalEvents() {
        // Framework modal
        const frameworkModalClose = document.getElementById('framework-modal-close');
        if (frameworkModalClose) {
            frameworkModalClose.onclick = () => this.hideModal('framework-modal');
        }

        const frameworkModalOverlay = document.getElementById('framework-modal-overlay');
        if (frameworkModalOverlay) {
            frameworkModalOverlay.onclick = () => this.hideModal('framework-modal');
        }

        const frameworkModalCancel = document.getElementById('framework-modal-cancel');
        if (frameworkModalCancel) {
            frameworkModalCancel.onclick = () => this.hideModal('framework-modal');
        }

        const frameworkModalStart = document.getElementById('framework-modal-start');
        if (frameworkModalStart) {
            frameworkModalStart.onclick = () => this.startSession();
        }

        // Custom framework modal
        const customFrameworkClose = document.getElementById('custom-framework-close');
        if (customFrameworkClose) {
            customFrameworkClose.onclick = () => this.hideModal('custom-framework-modal');
        }

        const customFrameworkOverlay = document.getElementById('custom-framework-overlay');
        if (customFrameworkOverlay) {
            customFrameworkOverlay.onclick = () => this.hideModal('custom-framework-modal');
        }

        const customFrameworkCancel = document.getElementById('custom-framework-cancel');
        if (customFrameworkCancel) {
            customFrameworkCancel.onclick = () => this.hideModal('custom-framework-modal');
        }

        const customFrameworkSave = document.getElementById('custom-framework-save');
        if (customFrameworkSave) {
            customFrameworkSave.onclick = () => this.saveCustomFramework();
        }

        const addStepBtn = document.getElementById('add-step');
        if (addStepBtn) {
            addStepBtn.onclick = () => this.addCustomStep();
        }
    }

    setupSettingsEvents() {
        const voiceProviderSelect = document.getElementById('voice-provider');
        if (voiceProviderSelect) {
            voiceProviderSelect.onchange = (e) => {
                this.updateVoiceProvider(e.target.value);
            };
        }
    }

    showSignupForm() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        
        console.log('Showing signup form');
        
        if (loginForm) {
            loginForm.classList.remove('active');
            loginForm.style.display = 'none';
        }
        if (signupForm) {
            signupForm.classList.add('active');
            signupForm.style.display = 'block';
        }
    }

    showLoginForm() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        
        console.log('Showing login form');
        
        if (signupForm) {
            signupForm.classList.remove('active');
            signupForm.style.display = 'none';
        }
        if (loginForm) {
            loginForm.classList.add('active');
            loginForm.style.display = 'block';
        }
    }

    handleLogin() {
        console.log('Handling login...');
        
        const emailField = document.getElementById('login-email');
        const passwordField = document.getElementById('login-password');
        
        if (!emailField || !passwordField) {
            console.error('Login form fields not found');
            this.showToast('Form fields not found', 'error');
            return;
        }

        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        console.log('Login attempt with email:', email);

        if (!email || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate successful authentication for demo
        this.currentUser = {
            id: 'user-' + Date.now(),
            name: this.extractNameFromEmail(email),
            email: email,
            role: 'rep'
        };

        console.log('Login successful, user:', this.currentUser);
        this.showToast('Welcome back!', 'success');
        
        // Ensure navigation happens
        setTimeout(() => {
            this.showMainApp();
            this.updateUserProfile();
        }, 1000);
    }

    handleSignup() {
        console.log('Handling signup...');
        
        const nameField = document.getElementById('signup-name');
        const emailField = document.getElementById('signup-email');
        const passwordField = document.getElementById('signup-password');
        const roleField = document.getElementById('signup-role');

        if (!nameField || !emailField || !passwordField || !roleField) {
            console.error('Signup form fields not found');
            this.showToast('Form fields not found', 'error');
            return;
        }

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const password = passwordField.value.trim();
        const role = roleField.value;

        console.log('Signup attempt with email:', email);

        if (!name || !email || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            this.showToast('Password must be at least 6 characters', 'error');
            return;
        }

        // Simulate account creation
        this.currentUser = {
            id: 'user-' + Date.now(),
            name: name,
            email: email,
            role: role
        };

        console.log('Signup successful, user:', this.currentUser);
        this.showToast('Account created successfully!', 'success');
        
        // Ensure navigation happens
        setTimeout(() => {
            this.showMainApp();
            this.updateUserProfile();
        }, 1000);
    }

    handleMagicLink() {
        console.log('Handling magic link...');
        
        const emailField = document.getElementById('login-email');
        
        if (!emailField) {
            this.showToast('Email field not found', 'error');
            return;
        }
        
        const email = emailField.value.trim();
        
        if (!email) {
            this.showToast('Please enter your email address', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        this.showToast('Magic link sent to your email!', 'success');
        
        // For demo purposes, automatically log them in after 2 seconds
        setTimeout(() => {
            this.currentUser = {
                id: 'user-' + Date.now(),
                name: this.extractNameFromEmail(email),
                email: email,
                role: 'rep'
            };
            this.showToast('Magic link authentication successful!', 'success');
            setTimeout(() => {
                this.showMainApp();
                this.updateUserProfile();
            }, 1000);
        }, 2000);
    }

    handleSignOut() {
        this.currentUser = null;
        this.currentSession = null;
        
        // Clear forms
        const loginEmail = document.getElementById('login-email');
        const loginPassword = document.getElementById('login-password');
        if (loginEmail) loginEmail.value = '';
        if (loginPassword) loginPassword.value = '';
        
        this.showAuthScreen();
        this.showToast('Signed out successfully', 'success');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    extractNameFromEmail(email) {
        const username = email.split('@')[0];
        return username.split('.').map(part => 
            part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
    }

    updateUserProfile() {
        if (!this.currentUser) return;

        const userNameEl = document.getElementById('user-name');
        const userEmailEl = document.getElementById('user-email');
        const userRoleEl = document.getElementById('user-role');
        const userInitialsEl = document.getElementById('user-initials');

        if (userNameEl) userNameEl.textContent = this.currentUser.name;
        if (userEmailEl) userEmailEl.textContent = this.currentUser.email;
        if (userRoleEl) userRoleEl.textContent = this.formatRole(this.currentUser.role);
        if (userInitialsEl) userInitialsEl.textContent = this.getInitials(this.currentUser.name);
    }

    formatRole(role) {
        const roleMap = {
            'rep': 'Sales Representative',
            'manager': 'Sales Manager',
            'admin': 'Administrator'
        };
        return roleMap[role] || role;
    }

    getInitials(name) {
        return name.split(' ').map(part => part[0]).join('').toUpperCase();
    }

    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenId}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Load screen-specific data
        switch(screenId) {
            case 'frameworks':
                this.renderFrameworks();
                break;
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'sessions':
                this.renderSessions();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    setActiveNavigation(screenId) {
        // Set active nav item based on screen
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === screenId) {
                item.classList.add('active');
            }
        });
    }

    setActiveNavItem(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    renderFrameworks() {
        console.log('Rendering frameworks...');
        const grid = document.getElementById('frameworks-grid');
        if (!grid) {
            console.error('Frameworks grid not found');
            return;
        }
        
        grid.innerHTML = '';

        this.frameworks.forEach(framework => {
            const card = this.createFrameworkCard(framework);
            grid.appendChild(card);
        });
        
        console.log('Frameworks rendered:', this.frameworks.length);
    }

    createFrameworkCard(framework) {
        const card = document.createElement('div');
        card.className = 'framework-card';
        card.innerHTML = `
            <div class="framework-card-header">
                <h3 class="framework-card-title">${framework.name}</h3>
                <div class="framework-card-steps">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/>
                    </svg>
                    ${framework.steps.length} steps
                </div>
            </div>
            <p class="framework-card-description">${framework.description}</p>
            <div class="framework-card-actions">
                <button class="btn btn--primary btn--sm framework-start-btn">Start Session</button>
                <button class="framework-card-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2ZM13,19H11V17H13V19ZM15.07,11.25L14.17,12.17C13.45,12.9 13,13.5 13,15H11V14.5C11,13.4 11.45,12.4 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.9 13.1,7 12,7C10.9,7 10,7.9 10,9H8C8,6.79 9.79,5 12,5C14.21,5 16,6.79 16,9C16,9.88 15.64,10.68 15.07,11.25Z"/>
                    </svg>
                </button>
            </div>
        `;

        // Use onclick for better compatibility
        const startBtn = card.querySelector('.framework-start-btn');
        const infoBtn = card.querySelector('.framework-card-info');
        
        startBtn.onclick = () => {
            console.log('Starting session with framework:', framework.name);
            this.currentFramework = framework;
            this.showFrameworkModal(framework);
        };

        infoBtn.onclick = (e) => {
            e.stopPropagation();
            console.log('Showing framework info:', framework.name);
            this.showFrameworkModal(framework);
        };

        return card;
    }

    showFrameworkModal(framework) {
        console.log('Showing framework modal:', framework.name);
        
        const modalTitle = document.getElementById('modal-framework-title');
        const modalDescription = document.getElementById('modal-framework-description');
        const stepsContainer = document.getElementById('modal-framework-steps');
        
        if (modalTitle) modalTitle.textContent = framework.name;
        if (modalDescription) modalDescription.textContent = framework.description;
        
        if (stepsContainer) {
            stepsContainer.innerHTML = '';
            
            framework.steps.forEach((step, index) => {
                const stepElement = document.createElement('div');
                stepElement.className = 'framework-step';
                stepElement.innerHTML = `
                    <div class="framework-step-title">${index + 1}. ${step.title}</div>
                    <div class="framework-step-description">${step.description}</div>
                `;
                stepsContainer.appendChild(stepElement);
            });
        }

        this.currentFramework = framework;
        this.showModal('framework-modal');
    }

    showCustomFrameworkModal() {
        this.showModal('custom-framework-modal');
        this.resetCustomFrameworkForm();
    }

    resetCustomFrameworkForm() {
        const frameworkName = document.getElementById('framework-name');
        const frameworkDesc = document.getElementById('framework-desc');
        
        if (frameworkName) frameworkName.value = '';
        if (frameworkDesc) frameworkDesc.value = '';
        
        const stepsContainer = document.getElementById('custom-steps');
        if (stepsContainer) {
            stepsContainer.innerHTML = `
                <div class="custom-step">
                    <input type="text" placeholder="Step title" class="form-control step-title" required>
                    <textarea placeholder="Step description" class="form-control step-description" rows="2" required></textarea>
                    <input type="number" placeholder="Weight (0-1)" class="form-control step-weight" min="0" max="1" step="0.1" value="0.2" required>
                </div>
            `;
        }
    }

    addCustomStep() {
        const stepsContainer = document.getElementById('custom-steps');
        if (!stepsContainer) return;
        
        const stepElement = document.createElement('div');
        stepElement.className = 'custom-step';
        stepElement.innerHTML = `
            <input type="text" placeholder="Step title" class="form-control step-title" required>
            <textarea placeholder="Step description" class="form-control step-description" rows="2" required></textarea>
            <input type="number" placeholder="Weight (0-1)" class="form-control step-weight" min="0" max="1" step="0.1" value="0.2" required>
            <button type="button" class="btn btn--outline btn--sm remove-step">Remove</button>
        `;
        
        const removeBtn = stepElement.querySelector('.remove-step');
        if (removeBtn) {
            removeBtn.onclick = () => {
                stepElement.remove();
            };
        }
        
        stepsContainer.appendChild(stepElement);
    }

    saveCustomFramework() {
        const frameworkName = document.getElementById('framework-name');
        const frameworkDesc = document.getElementById('framework-desc');
        const stepElements = document.querySelectorAll('.custom-step');
        
        if (!frameworkName || !frameworkDesc || !stepElements.length) {
            this.showToast('Form fields not found', 'error');
            return;
        }

        const name = frameworkName.value.trim();
        const description = frameworkDesc.value.trim();
        
        if (!name || !description || stepElements.length === 0) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        try {
            const steps = Array.from(stepElements).map((element, index) => {
                const titleInput = element.querySelector('.step-title');
                const descInput = element.querySelector('.step-description');
                const weightInput = element.querySelector('.step-weight');
                
                if (!titleInput || !descInput || !weightInput) {
                    throw new Error('Step inputs not found');
                }
                
                const title = titleInput.value.trim();
                const desc = descInput.value.trim();
                const weight = parseFloat(weightInput.value);
                
                if (!title || !desc || isNaN(weight)) {
                    throw new Error('Invalid step data');
                }
                
                return {
                    id: `step-${index + 1}`,
                    title,
                    description: desc,
                    weight,
                    tips: []
                };
            });

            const customFramework = {
                id: `custom-${Date.now()}`,
                name,
                description,
                steps,
                custom: true
            };

            this.frameworks.push(customFramework);
            this.hideModal('custom-framework-modal');
            this.renderFrameworks();
            this.showToast('Custom framework created!', 'success');
        } catch (error) {
            this.showToast('Error creating framework: ' + error.message, 'error');
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    startSession() {
        if (!this.currentFramework) {
            console.error('No framework selected');
            return;
        }

        console.log('Starting session with framework:', this.currentFramework.name);
        this.hideModal('framework-modal');
        this.showScreen('session');
        
        this.currentSession = {
            id: `session-${Date.now()}`,
            frameworkId: this.currentFramework.id,
            framework: this.currentFramework,
            startTime: new Date(),
            messages: [],
            stepProgress: {},
            coachingTips: [],
            currentStep: 0
        };

        this.initializeSession();
    }

    initializeSession() {
        console.log('Initializing session...');
        
        const frameworkNameEl = document.getElementById('session-framework-name');
        if (frameworkNameEl) {
            frameworkNameEl.textContent = this.currentFramework.name;
        }
        
        this.startSessionTimer();
        this.renderStepTracker();
        this.setupInitialMessage();
        this.resetVoiceControls();
        this.expandDrawersInitially();
    }

    expandDrawersInitially() {
        // Auto-expand coaching drawer and step tracker for better UX
        const coachingContent = document.getElementById('coaching-content');
        const coachingToggle = document.getElementById('coaching-toggle');
        const stepTrackerContent = document.getElementById('step-tracker-content');
        const stepTrackerToggle = document.getElementById('step-tracker-toggle');
        
        if (coachingContent && coachingToggle) {
            coachingContent.classList.add('expanded');
            coachingToggle.classList.add('expanded');
        }
        
        if (stepTrackerContent && stepTrackerToggle) {
            stepTrackerContent.classList.add('expanded');
            stepTrackerToggle.classList.add('expanded');
        }
    }

    startSessionTimer() {
        this.sessionStartTime = Date.now();
        this.sessionTimer = setInterval(() => {
            this.updateSessionTimer();
        }, 1000);
    }

    updateSessionTimer() {
        if (!this.sessionStartTime) return;
        
        const elapsed = Date.now() - this.sessionStartTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const timerEl = document.getElementById('session-timer');
        if (timerEl) {
            timerEl.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    renderStepTracker() {
        const stepsContainer = document.getElementById('steps-list');
        if (!stepsContainer || !this.currentFramework) return;
        
        stepsContainer.innerHTML = '';

        this.currentFramework.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step-item';
            
            if (index < this.currentSession.currentStep) {
                stepElement.classList.add('completed');
            } else if (index === this.currentSession.currentStep) {
                stepElement.classList.add('current');
            } else {
                stepElement.classList.add('pending');
            }

            stepElement.innerHTML = `
                <div class="step-indicator">${index + 1}</div>
                <div class="step-details">
                    <div class="step-title">${step.title}</div>
                    <div class="step-description">${step.description}</div>
                </div>
            `;
            
            stepsContainer.appendChild(stepElement);
        });
    }

    setupInitialMessage() {
        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="message ai-message">
                    <div class="message-content">
                        Hello! I'm your AI prospect for today's training session using the ${this.currentFramework.name} framework. I'll be playing the role of a potential customer interested in your solutions. Ready to get started?
                    </div>
                    <div class="message-timestamp">${this.formatTime(new Date())}</div>
                </div>
            </div>
        `;
        
        this.addMessage('ai', `Hello! I'm your AI prospect for today's training session using the ${this.currentFramework.name} framework. I'll be playing the role of a potential customer interested in your solutions. Ready to get started?`);
    }

    resetVoiceControls() {
        const micButton = document.getElementById('mic-button');
        const voiceStatus = document.getElementById('voice-status');
        
        if (micButton) micButton.classList.remove('recording');
        if (voiceStatus) voiceStatus.textContent = 'Tap to speak';
        this.isRecording = false;
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        if (!this.currentSession) return;

        console.log('Starting recording...');
        this.isRecording = true;
        const micButton = document.getElementById('mic-button');
        const voiceStatus = document.getElementById('voice-status');
        
        if (micButton) micButton.classList.add('recording');
        if (voiceStatus) voiceStatus.textContent = 'Listening...';
        
        // Simulate recording for 3-5 seconds
        const recordingTime = Math.random() * 2000 + 3000;
        setTimeout(() => {
            this.stopRecording();
        }, recordingTime);
    }

    stopRecording() {
        if (!this.isRecording) return;

        console.log('Stopping recording...');
        this.isRecording = false;
        const micButton = document.getElementById('mic-button');
        const voiceStatus = document.getElementById('voice-status');
        
        if (micButton) micButton.classList.remove('recording');
        if (voiceStatus) voiceStatus.textContent = 'Processing...';
        
        // Simulate speech processing
        setTimeout(() => {
            this.simulateUserResponse();
            if (voiceStatus) voiceStatus.textContent = 'Tap to speak';
        }, 1000);
    }

    simulateUserResponse() {
        const responses = [
            "Thank you for the introduction. I'm interested in learning more about your solutions for our growing company.",
            "That sounds interesting. Can you tell me more about how this would work for a company our size?",
            "I see. What kind of results have you seen with other clients in our industry?",
            "The pricing seems reasonable, but I need to understand the implementation process better.",
            "That addresses one concern, but what about integration with our existing systems?",
            "I appreciate the information. What would be the next steps if we decided to move forward?",
            "This looks promising. Can you provide some references from similar companies?",
            "I need to discuss this with my team. What timeline are we looking at?"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage('user', response);
        
        // Progress through framework steps
        if (this.currentSession.currentStep < this.currentFramework.steps.length - 1) {
            setTimeout(() => {
                this.currentSession.currentStep++;
                this.renderStepTracker();
            }, 1500);
        }
        
        // Trigger coaching tips
        setTimeout(() => {
            this.generateCoachingTip();
        }, 1000);
        
        // Simulate AI response
        setTimeout(() => {
            this.generateAIResponse();
        }, 2000);
    }

    addMessage(speaker, text) {
        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${speaker}-message`;
        messageElement.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-timestamp">${this.formatTime(new Date())}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store in session
        if (this.currentSession) {
            this.currentSession.messages.push({
                speaker,
                text,
                timestamp: new Date()
            });
        }
    }

    generateAIResponse() {
        const response = this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
        
        // Show typing indicator
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage('ai', response);
            this.animateAIAvatar();
        }, 1500);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    animateAIAvatar() {
        const avatar = document.getElementById('ai-avatar');
        if (avatar) {
            avatar.classList.add('speaking');
            
            setTimeout(() => {
                avatar.classList.remove('speaking');
            }, 2000);
        }
    }

    generateCoachingTip() {
        const tip = this.coachingTips[Math.floor(Math.random() * this.coachingTips.length)];
        this.addCoachingTip(tip);
    }

    addCoachingTip(tip) {
        const coachingTips = document.getElementById('coaching-tips');
        if (!coachingTips) return;
        
        const tipElement = document.createElement('div');
        tipElement.className = `coaching-tip ${tip.type}`;
        
        let icon = '';
        switch(tip.type) {
            case 'positive':
                icon = '<svg class="coaching-tip-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/></svg>';
                break;
            case 'warning':
                icon = '<svg class="coaching-tip-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/></svg>';
                break;
            case 'suggestion':
                icon = '<svg class="coaching-tip-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"/></svg>';
                break;
        }
        
        tipElement.innerHTML = `
            ${icon}
            <span>${tip.message}</span>
        `;
        
        coachingTips.appendChild(tipElement);
        
        // Remove old tips if too many
        const tips = coachingTips.querySelectorAll('.coaching-tip');
        if (tips.length > 5) {
            tips[0].remove();
        }
    }

    toggleCoachingDrawer() {
        const toggle = document.getElementById('coaching-toggle');
        const content = document.getElementById('coaching-content');
        
        if (toggle && content) {
            toggle.classList.toggle('expanded');
            content.classList.toggle('expanded');
        }
    }

    toggleStepTracker() {
        const toggle = document.getElementById('step-tracker-toggle');
        const content = document.getElementById('step-tracker-content');
        
        if (toggle && content) {
            toggle.classList.toggle('expanded');
            content.classList.toggle('expanded');
        }
    }

    endSession() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        
        if (this.currentSession) {
            this.currentSession.endTime = new Date();
            this.currentSession.duration = this.currentSession.endTime - this.currentSession.startTime;
            
            // Generate results
            this.generateSessionResults();
            this.showScreen('results');
            this.renderResults();
        }
    }

    endCurrentSession() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        this.currentSession = null;
    }

    generateSessionResults() {
        if (!this.currentSession) return;

        // Generate overall score (70-95 range for demo)
        const overallScore = Math.floor(Math.random() * 25) + 70;
        
        // Generate step scores
        const stepScores = this.currentSession.framework.steps.map(step => {
            const score = Math.floor(Math.random() * 30) + 70;
            const feedback = this.generateStepFeedback(step, score);
            return {
                stepId: step.id,
                stepTitle: step.title,
                score,
                feedback
            };
        });
        
        // Generate insights
        const strengths = this.generateStrengths();
        const improvements = this.generateImprovements();
        
        this.currentSession.results = {
            overallScore,
            stepScores,
            strengths,
            improvements,
            level: this.getScoreLevel(overallScore)
        };
    }

    generateStepFeedback(step, score) {
        const feedbackMap = {
            90: ['Excellent execution', 'Outstanding performance', 'Masterful approach'],
            80: ['Good work', 'Solid performance', 'Well executed'],
            70: ['Room for improvement', 'Could be stronger', 'Needs refinement'],
            60: ['Significant improvement needed', 'Requires attention', 'Needs work']
        };
        
        let range = 60;
        if (score >= 90) range = 90;
        else if (score >= 80) range = 80;
        else if (score >= 70) range = 70;
        
        const feedbacks = feedbackMap[range];
        return feedbacks[Math.floor(Math.random() * feedbacks.length)];
    }

    generateStrengths() {
        const allStrengths = [
            'Excellent rapport building skills',
            'Strong active listening demonstrated',
            'Good use of open-ended questions',
            'Effective objection handling',
            'Clear value proposition presentation',
            'Natural conversation flow',
            'Professional tone throughout',
            'Good pace and timing'
        ];
        
        return allStrengths
            .sort(() => Math.random() - 0.5)
            .slice(0, 3 + Math.floor(Math.random() * 2));
    }

    generateImprovements() {
        const allImprovements = [
            'Ask more discovery questions about pain points',
            'Quantify value propositions with specific metrics',
            'Pause more frequently to confirm understanding',
            'Use more industry-specific examples',
            'Address budget concerns earlier in conversation',
            'Summarize key points more frequently',
            'Ask for commitment at appropriate stages'
        ];
        
        return allImprovements
            .sort(() => Math.random() - 0.5)
            .slice(0, 2 + Math.floor(Math.random() * 2));
    }

    getScoreLevel(score) {
        if (score >= 90) return 'Advanced';
        if (score >= 80) return 'Proficient';
        if (score >= 70) return 'Developing';
        return 'Beginner';
    }

    renderResults() {
        if (!this.currentSession?.results) return;

        const results = this.currentSession.results;
        
        // Update header
        const resultsFramework = document.getElementById('results-framework');
        if (resultsFramework) {
            resultsFramework.textContent = this.currentSession.framework.name;
        }
        
        // Update overall score
        const overallScoreEl = document.getElementById('overall-score');
        const scoreLevelEl = document.getElementById('score-level');
        if (overallScoreEl) overallScoreEl.textContent = results.overallScore;
        if (scoreLevelEl) scoreLevelEl.textContent = results.level;
        
        // Update score circle
        const scoreCircle = document.getElementById('score-circle');
        if (scoreCircle) {
            const angle = (results.overallScore / 100) * 360;
            scoreCircle.style.setProperty('--score-angle', `${angle}deg`);
        }
        
        // Update step breakdown
        this.renderStepBreakdown(results.stepScores);
        
        // Update insights
        this.renderInsights(results.strengths, results.improvements);
        
        // Update transcript
        this.renderTranscript();
    }

    renderStepBreakdown(stepScores) {
        const container = document.getElementById('step-breakdown');
        if (!container) return;
        
        container.innerHTML = '';
        
        stepScores.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step-breakdown-item';
            
            let badgeClass = 'needs-improvement';
            if (step.score >= 90) badgeClass = 'excellent';
            else if (step.score >= 80) badgeClass = 'good';
            
            stepElement.innerHTML = `
                <div class="step-breakdown-info">
                    <div class="step-breakdown-title">${step.stepTitle}</div>
                    <div class="step-breakdown-feedback">${step.feedback}</div>
                </div>
                <div class="step-breakdown-score">
                    <span class="score-badge ${badgeClass}">${step.score}</span>
                </div>
            `;
            
            container.appendChild(stepElement);
        });
    }

    renderInsights(strengths, improvements) {
        const strengthsList = document.getElementById('strengths-list');
        const improvementsList = document.getElementById('improvements-list');
        
        if (strengthsList) {
            strengthsList.innerHTML = '';
            strengths.forEach(strength => {
                const li = document.createElement('li');
                li.textContent = strength;
                strengthsList.appendChild(li);
            });
        }
        
        if (improvementsList) {
            improvementsList.innerHTML = '';
            improvements.forEach(improvement => {
                const li = document.createElement('li');
                li.textContent = improvement;
                improvementsList.appendChild(li);
            });
        }
    }

    renderTranscript() {
        const container = document.getElementById('transcript-content');
        if (!container || !this.currentSession?.messages) return;
        
        container.innerHTML = '';
        
        this.currentSession.messages.forEach(message => {
            const entry = document.createElement('div');
            entry.className = `transcript-entry ${message.speaker}`;
            entry.innerHTML = `
                <div class="transcript-speaker">${message.speaker === 'ai' ? 'AI Prospect' : 'You'}</div>
                <div class="transcript-text">${message.text}</div>
            `;
            container.appendChild(entry);
        });
    }

    renderDashboard() {
        this.renderRecentSessions();
    }

    renderRecentSessions() {
        const container = document.getElementById('recent-sessions');
        if (!container) return;
        
        // Mock recent sessions data
        const recentSessions = [
            {
                id: 'session-1',
                framework: 'Values-Based Sales Path',
                date: new Date(Date.now() - 86400000),
                score: 87
            },
            {
                id: 'session-2',
                framework: '4-Dimensional Question Model',
                date: new Date(Date.now() - 172800000),
                score: 82
            },
            {
                id: 'session-3',
                framework: 'ROI Alignment Method',
                date: new Date(Date.now() - 259200000),
                score: 91
            }
        ];
        
        container.innerHTML = '';
        
        recentSessions.forEach(session => {
            const sessionElement = document.createElement('div');
            sessionElement.className = 'session-item';
            sessionElement.innerHTML = `
                <div class="session-info">
                    <div class="session-framework">${session.framework}</div>
                    <div class="session-date">${this.formatDate(session.date)}</div>
                </div>
                <div class="session-score">${session.score}</div>
            `;
            container.appendChild(sessionElement);
        });
    }

    renderSessions() {
        const container = document.getElementById('sessions-list');
        if (!container) return;
        
        // Mock sessions data with more detailed information
        const sessions = [
            {
                id: 'session-1',
                framework: 'Values-Based Sales Path',
                date: new Date(Date.now() - 86400000),
                duration: 1247,
                score: 87
            },
            {
                id: 'session-2',
                framework: '4-Dimensional Question Model',
                date: new Date(Date.now() - 172800000),
                duration: 892,
                score: 82
            },
            {
                id: 'session-3',
                framework: 'ROI Alignment Method',
                date: new Date(Date.now() - 259200000),
                duration: 1156,
                score: 91
            },
            {
                id: 'session-4',
                framework: 'Insight-Driven Selling',
                date: new Date(Date.now() - 345600000),
                duration: 934,
                score: 78
            }
        ];
        
        container.innerHTML = '';
        
        sessions.forEach(session => {
            const sessionCard = document.createElement('div');
            sessionCard.className = 'session-card';
            sessionCard.innerHTML = `
                <div class="session-card-header">
                    <div>
                        <div class="session-card-title">${session.framework}</div>
                        <div class="session-card-date">${this.formatDate(session.date)}</div>
                    </div>
                    <div class="session-card-score">${session.score}</div>
                </div>
                <div class="session-card-meta">
                    <span>Duration: ${this.formatDuration(session.duration)}</span>
                    <span>View Results</span>
                </div>
            `;
            
            // Add click handler to view session results
            sessionCard.onclick = () => {
                // In a real app, this would load the specific session data
                this.showToast('Session details would load here', 'info');
            };
            
            container.appendChild(sessionCard);
        });
    }

    renderSettings() {
        // Settings are mostly static, just update dynamic elements
        this.updateUserProfile();
    }

    searchFrameworks(query) {
        const filteredFrameworks = this.frameworks.filter(framework =>
            framework.name.toLowerCase().includes(query.toLowerCase()) ||
            framework.description.toLowerCase().includes(query.toLowerCase())
        );
        
        const grid = document.getElementById('frameworks-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        filteredFrameworks.forEach(framework => {
            const card = this.createFrameworkCard(framework);
            grid.appendChild(card);
        });
    }

    shareResults() {
        if (navigator.share && this.currentSession?.results) {
            navigator.share({
                title: 'Sales Coach AI - Session Results',
                text: `I scored ${this.currentSession.results.overallScore} on my latest sales training session!`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without Web Share API
            this.showToast('Results link copied to clipboard!', 'success');
        }
    }

    exportPDF() {
        this.showToast('PDF export started...', 'info');
        
        // Simulate PDF generation
        setTimeout(() => {
            this.showToast('PDF ready for download!', 'success');
        }, 2000);
    }

    exportTranscript() {
        if (!this.currentSession?.messages) {
            this.showToast('No transcript available', 'warning');
            return;
        }
        
        const transcript = this.currentSession.messages
            .map(msg => `${msg.speaker === 'ai' ? 'AI Prospect' : 'You'}: ${msg.text}`)
            .join('\n\n');
            
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'session-transcript.txt';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('Transcript exported!', 'success');
    }

    updateVoiceProvider(provider) {
        this.showToast(`Switched to ${provider}`, 'info');
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    formatDate(date) {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }

    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    showToast(message, type = 'info') {
        console.log('Toast:', type, message);
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text);
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--color-border);
            z-index: 10000;
            animation: slideInToast 0.3s ease-out;
            max-width: 300px;
            font-size: 14px;
        `;
        
        // Add animation styles
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes slideInToast {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideOutToast {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        if (type === 'success') {
            toast.style.borderLeft = '4px solid var(--color-success)';
        } else if (type === 'error') {
            toast.style.borderLeft = '4px solid var(--color-error)';
        } else if (type === 'warning') {
            toast.style.borderLeft = '4px solid var(--color-warning)';
        } else {
            toast.style.borderLeft = '4px solid var(--color-primary)';
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutToast 0.3s ease-out forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.salesCoachApp = new SalesCoachApp();
});

// Service Worker Registration (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swContent = `
            const CACHE_NAME = 'sales-coach-ai-v1';
            const urlsToCache = [
                '/',
                '/style.css',
                '/app.js',
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
            ];

            self.addEventListener('install', event => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then(cache => cache.addAll(urlsToCache))
                );
            });

            self.addEventListener('fetch', event => {
                event.respondWith(
                    caches.match(event.request)
                        .then(response => {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        }
                    )
                );
            });
        `;
        
        const blob = new Blob([swContent], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}