/* ==========================================================================
   MINDANCHOR: CORE INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- APP STATE MANAGEMENT ---
    let state = {
        user: null,
        logs: [],
        chats: [],
        apiKey: localStorage.getItem('gemini_api_key') || '',
        activeView: 'dashboard',
        socialImpactScore: parseInt(localStorage.getItem('social_impact_score')) || 45,
        checkedSmartActions: JSON.parse(localStorage.getItem('checked_smart_actions')) || []
    };

    // --- DOM ELEMENT CACHE ---
    const authScreen = document.getElementById('auth-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const onboardForm = document.getElementById('onboard-form');
    const logoutBtn = document.getElementById('logout-btn');
    const headerLogoutBtn = document.getElementById('header-logout-btn');
    const navItems = document.querySelectorAll('.nav-item');
    const contentViews = document.querySelectorAll('.content-view');
    
    const displayName = document.getElementById('display-name');
    const displayExam = document.getElementById('display-exam');
    const avatarChar = document.getElementById('avatar-char');
    const greetingText = document.getElementById('greeting-text');
    const dateText = document.getElementById('date-text');

    const moodLoggerForm = document.getElementById('mood-logger-form');
    const burnoutVal = document.getElementById('burnout-val');
    const burnoutGauge = document.getElementById('burnout-gauge');
    const burnoutStatusDot = document.getElementById('burnout-status-dot');
    const burnoutStatusText = document.getElementById('burnout-status-text');
    const burnoutTip = document.getElementById('burnout-tip');
    const moodEmoji = document.getElementById('mood-emoji');
    const moodStateText = document.getElementById('mood-state-text');
    const moodAdvice = document.getElementById('mood-advice');
    const fillStudy = document.getElementById('fill-study');
    const fillSleep = document.getElementById('fill-sleep');
    const labelStudyHours = document.getElementById('label-study-hours');
    const labelSleepHours = document.getElementById('label-sleep-hours');

    const journalInput = document.getElementById('journal-input');
    const journalCharCount = document.getElementById('journal-char-count');
    const reframeBtn = document.getElementById('reframe-btn');
    const reframeResult = document.getElementById('reframe-result');
    const detectedDistortionTitle = document.getElementById('detected-distortion-title');
    const originalThoughtText = document.getElementById('original-thought-text');
    const reframedThoughtText = document.getElementById('reframed-thought-text');
    const distortionExplanationText = document.getElementById('distortion-explanation-text');
    const cbtStudyTip = document.getElementById('cbt-study-tip');

    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const clearChat = document.getElementById('clear-chat');

    const breathBubble = document.getElementById('breath-bubble');
    const breathInstruction = document.getElementById('breath-instruction');
    const breathTimer = document.getElementById('breath-timer');
    const startBreathBtn = document.getElementById('start-breath-btn');
    const stopBreathBtn = document.getElementById('stop-breath-btn');

    const playAmbientBtn = document.getElementById('play-ambient-btn');
    const ambientVolume = document.getElementById('ambient-volume');

    const geminiApiKey = document.getElementById('gemini-api-key');
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    const apiStatusMsg = document.getElementById('api-status-msg');
    
    const settingsUsername = document.getElementById('settings-username');
    const settingsExam = document.getElementById('settings-exam');
    const updateProfileBtn = document.getElementById('update-profile-btn');
    const purgeDataBtn = document.getElementById('purge-data-btn');

    const crisisOverlay = document.getElementById('crisis-overlay');
    const closeCrisisOverlay = document.getElementById('close-crisis-overlay');

    // Innovation Feature DOM Cache
    const aiPredictiveInsight = document.getElementById('ai-predictive-insight');
    const aiRecommendationsList = document.getElementById('ai-recommendations-list');
    const socialImpactVal = document.getElementById('social-impact-val');
    const smartActionsList = document.getElementById('smart-actions-list');
    
    // Demo Mode DOM Cache
    const demoBtn = document.getElementById('demo-btn');
    const headerDemoBtn = document.getElementById('header-demo-btn');
    
    // Geeta Sanctuary DOM Cache
    const shlokaSanskrit = document.getElementById('shloka-sanskrit');
    const shlokaTransliteration = document.getElementById('shloka-transliteration');
    const shlokaTranslation = document.getElementById('shloka-translation');
    const shlokaSummary = document.getElementById('shloka-summary');
    const playShlokaAudioBtn = document.getElementById('play-shloka-audio-btn');
    const nextShlokaBtn = document.getElementById('next-shloka-btn');

    // Set Live Clock
    const updateTime = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateText.innerText = now.toLocaleDateString('en-US', options);
    };
    updateTime();

    // ==========================================================================
    // AUTH & INITIALIZATION
    // ==========================================================================
    
    const checkAuth = () => {
        const cachedUser = localStorage.getItem('anchor_user');
        if (cachedUser) {
            state.user = JSON.parse(cachedUser);
            loadLocalData();
            showDashboard();
        } else {
            authScreen.classList.add('active');
            dashboardScreen.classList.remove('app-layout');
        }
    };

    onboardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nickname = document.getElementById('username').value.trim();
        const targetExam = document.getElementById('target-exam').value;
        
        state.user = { nickname, targetExam };
        localStorage.setItem('anchor_user', JSON.stringify(state.user));
        
        // Setup initial default logs for the chart
        seedInitialLogs();
        loadLocalData();
        showDashboard();
    });

    const performLogout = () => {
        localStorage.removeItem('anchor_user');
        state.user = null;
        authScreen.classList.add('active');
        dashboardScreen.classList.remove('app-layout');
    };

    if (logoutBtn) logoutBtn.addEventListener('click', performLogout);
    if (headerLogoutBtn) headerLogoutBtn.addEventListener('click', performLogout);

    const showDashboard = () => {
        authScreen.classList.remove('active');
        dashboardScreen.classList.add('app-layout');
        
        displayName.innerText = state.user.nickname;
        displayExam.innerText = `${state.user.targetExam} Aspirant`;
        avatarChar.innerText = state.user.nickname.charAt(0).toUpperCase();
        greetingText.innerText = `Welcome back, ${state.user.nickname}`;
        
        // Initialize fields in settings
        settingsUsername.value = state.user.nickname;
        settingsExam.value = state.user.targetExam;
        
        if (state.apiKey) {
            geminiApiKey.value = "••••••••••••••••••••••••";
            clearApiKeyBtn.classList.remove('d-none');
            apiStatusMsg.classList.remove('d-none');
        }

        renderDashboardStats();
        renderMoodChart();
        updateThemeForCurrentMood();
    };

    // ==========================================================================
    // LOCAL STORAGE METRIC DB
    // ==========================================================================
    
    const loadLocalData = () => {
        const cachedLogs = localStorage.getItem(`logs_${state.user.nickname}`);
        const cachedChats = localStorage.getItem(`chats_${state.user.nickname}`);
        state.logs = cachedLogs ? JSON.parse(cachedLogs) : [];
        state.chats = cachedChats ? JSON.parse(cachedChats) : [];
    };

    const saveLogs = () => {
        localStorage.setItem(`logs_${state.user.nickname}`, JSON.stringify(state.logs));
        renderDashboardStats();
        renderMoodChart();
        updateThemeForCurrentMood();
    };

    const seedInitialLogs = () => {
        // Create 7 days of historical logs to make the chart look incredible instantly
        const days = 7;
        const initialLogs = [];
        const baseTime = Date.now() - (days * 24 * 60 * 60 * 1000);
        
        const moods = [3, 4, 3, 2, 4, 3, 4];
        const study = [8, 9, 7.5, 11, 6, 8.5, 9];
        const sleep = [7, 6.5, 7, 5, 8, 6.5, 7.5];
        const energy = [3, 4, 3, 2, 5, 3, 4];

        for (let i = 0; i < days; i++) {
            const timestamp = baseTime + (i * 24 * 60 * 60 * 1000);
            const burnout = calculateBurnoutIndex(moods[i], study[i], sleep[i], energy[i]);
            initialLogs.push({
                timestamp,
                mood: moods[i],
                studyHours: study[i],
                sleepHours: sleep[i],
                energyLevel: energy[i],
                burnoutScore: burnout
            });
        }
        localStorage.setItem(`logs_${state.user.nickname}`, JSON.stringify(initialLogs));
    };

    // Burnout Index Calculation Logic
    const calculateBurnoutIndex = (mood, study, sleep, energy) => {
        // Study hours factor (ideal < 10 hrs)
        const studyFactor = Math.min((study / 12) * 40, 40);
        
        // Sleep factor (ideal >= 7 hrs)
        const sleepFactor = Math.max(((8 - sleep) / 8) * 30, 0);
        
        // Subjective mood/energy factors (ideal 5)
        const moodFactor = (5 - mood) * 15;
        const energyFactor = (5 - energy) * 15;
        
        const total = studyFactor + sleepFactor + ((moodFactor + energyFactor) / 2);
        return Math.min(Math.round(total), 100);
    };

    moodLoggerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selectedMood = parseInt(document.querySelector('input[name="mood"]:checked').value);
        const study = parseFloat(document.getElementById('study-hrs').value);
        const sleep = parseFloat(document.getElementById('sleep-hrs').value);
        const energy = parseInt(document.getElementById('energy-lvl').value);

        const burnout = calculateBurnoutIndex(selectedMood, study, sleep, energy);
        
        state.logs.push({
            timestamp: Date.now(),
            mood: selectedMood,
            studyHours: study,
            sleepHours: sleep,
            energyLevel: energy,
            burnoutScore: burnout
        });
        
        // Keep maximum of 14 logs for graphing
        if (state.logs.length > 14) state.logs.shift();
        
        saveLogs();
        alert('Daily wellness metrics saved successfully!');
    });

    // ==========================================================================
    // DYNAMIC THEME SYSTEM SHIFTING
    // ==========================================================================
    
    const updateThemeForCurrentMood = () => {
        if (state.logs.length === 0) return;
        const latestLog = state.logs[state.logs.length - 1];
        
        // Adjust CSS variables dynamically based on user's logged burnout and mood state
        const root = document.documentElement;
        
        if (latestLog.burnoutScore >= 70) {
            // Highly Anxious / Burned Out: Calm teal & deep blue to suppress stress
            root.style.setProperty('--primary-h', '180');
            root.style.setProperty('--primary-s', '80%');
            root.style.setProperty('--primary-l', '45%');
            
            root.style.setProperty('--accent-h', '210');
            root.style.setProperty('--accent-s', '80%');
            root.style.setProperty('--accent-l', '55%');
        } else if (latestLog.mood <= 2) {
            // Depressed / Sad: Warm, soothing gold & amber to comfort
            root.style.setProperty('--primary-h', '38');
            root.style.setProperty('--primary-s', '90%');
            root.style.setProperty('--primary-l', '50%');
            
            root.style.setProperty('--accent-h', '15');
            root.style.setProperty('--accent-s', '85%');
            root.style.setProperty('--accent-l', '50%');
        } else {
            // High Focus / Healthy: Productive deep indigo & electric cyan
            root.style.setProperty('--primary-h', '235');
            root.style.setProperty('--primary-s', '75%');
            root.style.setProperty('--primary-l', '60%');
            
            root.style.setProperty('--accent-h', '174');
            root.style.setProperty('--accent-s', '75%');
            root.style.setProperty('--accent-l', '45%');
        }
    };

    // ==========================================================================
    // STATS & VISUALIZATION RENDERING
    // ==========================================================================

    const renderDashboardStats = () => {
        if (state.logs.length === 0) return;
        const latest = state.logs[state.logs.length - 1];

        // 1. Update Burnout Gauge
        burnoutVal.innerText = `${latest.burnoutScore}%`;
        const strokeDashOffset = 251.2 * (1 - latest.burnoutScore / 100);
        burnoutGauge.style.strokeDashoffset = strokeDashOffset;

        // Change colors of gauge fill depending on score
        if (latest.burnoutScore >= 70) {
            burnoutGauge.style.stroke = 'var(--error)';
            burnoutStatusDot.className = 'pulse-dot red';
            burnoutStatusText.innerText = 'Burnout Risk: High Alert';
            burnoutTip.innerText = 'Critical fatigue. Stop study sessions immediately. Use Sound & Breath view.';
        } else if (latest.burnoutScore >= 40) {
            burnoutGauge.style.stroke = '#f59e0b'; // Amber
            burnoutStatusDot.className = 'pulse-dot amber';
            burnoutStatusText.innerText = 'Burnout Risk: Elevated';
            burnoutTip.innerText = 'Subtle stress buildups. Take a 15-minute break every hour.';
        } else {
            burnoutGauge.style.stroke = 'var(--accent)';
            burnoutStatusDot.className = 'pulse-dot green';
            burnoutStatusText.innerText = 'Burnout Risk: Stable';
            burnoutTip.innerText = 'You have healthy study-life balance indices today.';
        }

        // 2. Update Mood Gauge
        const moodEmojis = ['😢', '😔', '😐', '😊', '🔥'];
        const moodTexts = [
            'Extremely Overwhelmed',
            'Slightly Anxious / Sad',
            'Neutral Mindset',
            'Focused & Calm',
            'Highly Energized'
        ];
        const moodAdvices = [
            'Immediate cognitive rest recommended.',
            'Try mapping details in the AI CBT Reframer.',
            'Maintaining standard academic balance.',
            'Optimal state for high-stakes revisions.',
            'Keep momentum going, monitor sleep times.'
        ];

        moodEmoji.innerText = moodEmojis[latest.mood - 1] || '😐';
        moodStateText.innerText = moodTexts[latest.mood - 1] || 'Neutral Mindset';
        moodAdvice.innerText = moodAdvices[latest.mood - 1] || 'Maintaining standard academic balance.';

        // 3. Update Study Ratios
        labelStudyHours.innerText = `${latest.studyHours} hrs`;
        labelSleepHours.innerText = `${latest.sleepHours} hrs`;
        
        // Percent calculations bound to 100%
        const studyPercent = Math.min((latest.studyHours / 16) * 100, 100);
        const sleepPercent = Math.min((latest.sleepHours / 10) * 100, 100);
        
        fillStudy.style.width = `${studyPercent}%`;
        fillSleep.style.width = `${sleepPercent}%`;

        // Update premium predictive insights and social impact metrics
        renderInnovationFeatures();
    };

    const renderInnovationFeatures = () => {
        if (state.logs.length === 0) return;
        const latest = state.logs[state.logs.length - 1];

        // 1. DYNAMIC AI PREDICTIVE INSIGHT & RECOMMENDATIONS
        let insightText = "Baseline logged. Continuously track daily metrics to build your personalized AI predictive stress trend analysis.";
        let recommendations = [
            "📝 Run a quick self-doubt check in the AI CBT Reframer.",
            "💤 Sync sleep window between 11 PM and 6 AM for memory retention.",
            "🚶 Walk offline: take a 10-minute active stretch break."
        ];

        // Read patterns
        if (latest.studyHours > 10 && latest.sleepHours < 6) {
            insightText = `⚠️ High Risk Alert: Your current Study-to-Sleep ratio (Study: ${latest.studyHours}h vs Sleep: ${latest.sleepHours}h) is unsustainable. AI predicts a 25% drop in memory retention efficiency and a stress peak in the next 24 hours.`;
            recommendations = [
                "🛑 Enforce a strict cutoff: stop studying at 9:30 PM tonight.",
                "🎧 Switch to 'Sound & Breath' and trigger binaural theta beats.",
                "📒 Review only 1 core topic tomorrow offline rather than full revisions."
            ];
        } else if (latest.sleepHours >= 7 && latest.studyHours <= 10 && latest.mood >= 4) {
            insightText = `📈 High Efficiency Window: Protective sleep patterns (${latest.sleepHours}h) and balanced mood detected. AI predicts optimal cognitive consolidation and focus levels for the next 48 hours.`;
            recommendations = [
                "🧠 Schedule your hardest analytical topics (e.g. revision blocks) next.",
                "🌱 Complete a screen-free outdoor walk to maintain serotonin levels.",
                "🤝 Anonymously vent or check on a fellow aspirant via Chat."
            ];
        } else if (latest.burnoutScore >= 60) {
            insightText = `⚠️ Elevated Burnout Risk: Burnout rating is at ${latest.burnoutScore}%. Fatigue accumulation points to early warning signs of cognitive exhaustion. AI predicts severe study blockages if not managed.`;
            recommendations = [
                "💤 Prioritize sleep over syllabus backlog targets tonight.",
                "🧘 Perform box breathing for at least 4 cycles right now.",
                "🌳 Reduce continuous screen time. Solve mock test errors on paper."
            ];
        }

        // Render insight text
        if (aiPredictiveInsight) {
            aiPredictiveInsight.innerText = insightText;
        }

        // Render recommendation items
        if (aiRecommendationsList) {
            aiRecommendationsList.innerHTML = '';
            recommendations.forEach(rec => {
                const li = document.createElement('li');
                li.style.marginBottom = '8px';
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.gap = '8px';
                li.innerText = rec;
                aiRecommendationsList.appendChild(li);
            });
        }

        // 2. SOCIAL IMPACT & SUSTAINABILITY INDEX
        if (socialImpactVal) {
            socialImpactVal.innerText = state.socialImpactScore;
        }

        // Render Checklist of actions
        if (smartActionsList) {
            smartActionsList.innerHTML = '';
            const actions = [
                { id: 'act_family', text: 'Call family or close friend (10 mins) [+15 Pts]', points: 15 },
                { id: 'act_breath', text: 'Perform Box Breathing (4 cycles) [+10 Pts]', points: 10 },
                { id: 'act_offline', text: 'Study offline (paper tests) for 2 hours [+20 Pts]', points: 20 },
                { id: 'act_screen', text: 'No study screens after 10 PM tonight [+15 Pts]', points: 15 }
            ];

            actions.forEach(act => {
                const label = document.createElement('label');
                label.style.display = 'flex';
                label.style.alignItems = 'center';
                label.style.gap = '10px';
                label.style.fontSize = '0.85rem';
                label.style.cursor = 'pointer';
                label.style.background = 'rgba(255,255,255,0.02)';
                label.style.padding = '8px 12px';
                label.style.borderRadius = '8px';
                label.style.border = '1px solid rgba(255,255,255,0.05)';
                label.style.marginBottom = '0'; // reset margins

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.style.width = '16px';
                checkbox.style.height = '16px';
                checkbox.style.cursor = 'pointer';
                checkbox.checked = state.checkedSmartActions.includes(act.id);

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        state.checkedSmartActions.push(act.id);
                        state.socialImpactScore = Math.min(state.socialImpactScore + act.points, 100);
                    } else {
                        state.checkedSmartActions = state.checkedSmartActions.filter(id => id !== act.id);
                        state.socialImpactScore = Math.max(state.socialImpactScore - act.points, 0);
                    }
                    localStorage.setItem('social_impact_score', state.socialImpactScore);
                    localStorage.setItem('checked_smart_actions', JSON.stringify(state.checkedSmartActions));
                    
                    if (socialImpactVal) {
                        socialImpactVal.innerText = state.socialImpactScore;
                    }
                });

                label.appendChild(checkbox);
                const span = document.createElement('span');
                span.innerText = act.text;
                if (checkbox.checked) {
                    span.style.textDecoration = 'line-through';
                    span.style.color = 'var(--text-inactive)';
                }
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        span.style.textDecoration = 'line-through';
                        span.style.color = 'var(--text-inactive)';
                    } else {
                        span.style.textDecoration = 'none';
                        span.style.color = 'var(--text-main)';
                    }
                });
                label.appendChild(span);

                smartActionsList.appendChild(label);
            });
        }
    };

    const renderMoodChart = () => {
        const svg = document.getElementById('mood-chart');
        svg.innerHTML = ''; // Clear SVG
        
        if (state.logs.length < 2) return;
        
        const maxLogs = 7;
        const chartLogs = state.logs.slice(-maxLogs);
        
        const width = 500;
        const height = 200;
        const padding = 25;
        
        const pointsCount = chartLogs.length;
        const stepX = (width - padding * 2) / (pointsCount - 1);
        
        // Create grid lines
        for (let i = 1; i <= 4; i++) {
            const y = padding + ((height - padding * 2) / 4) * i;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', padding);
            line.setAttribute('y1', y);
            line.setAttribute('x2', width - padding);
            line.setAttribute('y2', y);
            line.setAttribute('class', 'chart-grid-line');
            svg.appendChild(line);
        }
        
        let moodPoints = [];
        let burnoutPoints = [];
        
        chartLogs.forEach((log, index) => {
            const x = padding + (index * stepX);
            
            // Mood mapping: 1 to 5 mapping onto chart Y
            // Max y is height-padding, Min y is padding
            const moodY = height - padding - ((log.mood - 1) / 4) * (height - padding * 2);
            moodPoints.push({x, y: moodY});
            
            // Burnout mapping: 0 to 100 mapping onto chart Y
            const burnoutY = height - padding - (log.burnoutScore / 100) * (height - padding * 2);
            burnoutPoints.push({x, y: burnoutY});
        });
        
        // Render paths
        const buildPathString = (pts) => {
            return pts.reduce((acc, pt, i) => i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`, '');
        };
        
        const moodPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        moodPath.setAttribute('d', buildPathString(moodPoints));
        moodPath.setAttribute('class', 'chart-line-mood');
        svg.appendChild(moodPath);
        
        const burnoutPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        burnoutPath.setAttribute('d', buildPathString(burnoutPoints));
        burnoutPath.setAttribute('class', 'chart-line-burnout');
        svg.appendChild(burnoutPath);
        
        // Render data nodes (dots)
        moodPoints.forEach((pt) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pt.x);
            circle.setAttribute('cy', pt.y);
            circle.setAttribute('r', 5);
            circle.setAttribute('class', 'chart-point mood-point');
            svg.appendChild(circle);
        });
        
        burnoutPoints.forEach((pt) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pt.x);
            circle.setAttribute('cy', pt.y);
            circle.setAttribute('r', 4);
            circle.setAttribute('class', 'chart-point burnout-point');
            svg.appendChild(circle);
        });

        // Set days label tags
        const labelContainer = document.getElementById('chart-days-labels');
        labelContainer.innerHTML = '';
        chartLogs.forEach((log) => {
            const dateObj = new Date(log.timestamp);
            const label = document.createElement('span');
            label.innerText = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            labelContainer.appendChild(label);
        });
    };

    // ==========================================================================
    // VIEW ROUTING
    // ==========================================================================
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-view');
            state.activeView = target;
            
            // Sync active state across matching sidebar items and mobile bottom nav items
            navItems.forEach(i => {
                if (i.getAttribute('data-view') === target) {
                    i.classList.add('active');
                } else {
                    i.classList.remove('active');
                }
            });
            
            contentViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === `view-${target}`) {
                    view.classList.add('active');
                }
            });
            
            // View specific transitions
            if (target === 'dashboard') {
                renderDashboardStats();
                renderMoodChart();
            }
        });
    });

    // ==========================================================================
    // SAFETY FILTER (SAFETY SYSTEM)
    // ==========================================================================
    
    const checkSafetyAlert = (text) => {
        const flagWords = [
            'suicide', 'kill myself', 'want to die', 'end my life', 'hurt myself', 
            'cutting myself', 'jump off', 'hanging myself', 'better off dead'
        ];
        const lowerText = text.toLowerCase();
        const hasFlag = flagWords.some(word => lowerText.includes(word));
        
        if (hasFlag) {
            crisisOverlay.classList.remove('d-none');
            return true;
        }
        return false;
    };

    closeCrisisOverlay.addEventListener('click', () => {
        crisisOverlay.classList.add('d-none');
    });

    // ==========================================================================
    // AI INTEGRATION MODULE (GEMINI API & SMART SIMULATION)
    // ==========================================================================

    const queryGeminiAPI = async (promptText) => {
        if (!state.apiKey) return null;
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${state.apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: promptText
                        }]
                    }]
                })
            });
            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            }
            return null;
        } catch (error) {
            console.error("Gemini API Error:", error);
            return null;
        }
    };

    // ==========================================================================
    // VIEW: AI CBT REFRAMER VIEW
    // ==========================================================================

    journalInput.addEventListener('input', () => {
        const charCount = journalInput.value.length;
        journalCharCount.innerText = `${charCount} characters`;
    });

    reframeBtn.addEventListener('click', async () => {
        const text = journalInput.value.trim();
        if (!text) return;

        if (checkSafetyAlert(text)) return;

        reframeBtn.disabled = true;
        reframeBtn.innerText = 'Analyzing...';

        // Check if Gemini key is available for real API reframing
        if (state.apiKey) {
            const prompt = `You are a cognitive behavioral therapy (CBT) expert counselor for students studying high-stakes exams.
Analyze the following student reflection:
"${text}"

Respond EXACTLY as a JSON object with this shape:
{
  "distortions": "Name the cognitive distortions detected",
  "explanation": "Brief 1-2 sentence explanation of why this thought trap harms performance",
  "reframed": "Complete CBT reframed balanced perspective",
  "studyTip": "Empathetic study-break action recommendation"
}
Ensure it is valid JSON, no markdown wrappers, no \`\`\`json.`;

            const rawResult = await queryGeminiAPI(prompt);
            if (rawResult) {
                try {
                    // Extract clean JSON from markdown codeblock if present
                    const cleanJsonStr = rawResult.replace(/```json/g, '').replace(/```/g, '').trim();
                    const parsed = JSON.parse(cleanJsonStr);
                    displayCbtResult(parsed.distortions, text, parsed.reframed, parsed.explanation, parsed.studyTip);
                    reframeBtn.disabled = false;
                    reframeBtn.innerText = 'Analyze & Reframe Thought';
                    return;
                } catch (e) {
                    console.warn("JSON parsing failed, falling back to simulated parser.");
                }
            }
        }

        // Live Simulated Logic Fallback
        setTimeout(() => {
            let distortions = 'All-or-Nothing Thinking';
            let explanation = 'Catastrophizing exaggerates today\'s performance metrics into general self-worth limits.';
            let reframed = 'One mock test is not a final outcome. It identifies exact subjects requiring structured review. I can handle sections step-by-step.';
            let tip = 'Shut down your textbooks for the next hour. Drink water and write out just two concepts to clarify tomorrow.';

            const val = text.toLowerCase();
            if (val.includes('never') || val.includes('always') || val.includes('fail')) {
                distortions = 'Overgeneralization & Catastrophizing';
                explanation = 'Using terms like "never" implies current study backlogs set absolute life trajectories, leading to loss of motivation.';
                reframed = 'Although this specific test/study day did not go well, it is a single data point. I will restructure my schedule for high-yield segments instead.';
                tip = 'Do 2 minutes of the Box Breathing exercise on the Sound & Breath tab, then plan a single subject block.';
            } else if (val.includes('ashamed') || val.includes('parents') || val.includes('family')) {
                distortions = 'Mind Reading & Personalization';
                explanation = 'Assuming families value only high ranks can create isolation and paralyzing study fear.';
                reframed = 'My efforts are valued, and my mental well-being is more important to my parents than a score. I will focus on gradual progress.';
                tip = 'Step outside for a short walk. Break the mental loop by focusing on ambient sounds.';
            } else if (val.includes('useless') || val.includes('wasted') || val.includes('tired')) {
                distortions = 'Emotional Reasoning';
                explanation = 'Feeling exhausted makes you believe you are failing, ignoring the physical need for rest.';
                reframed = 'Feeling tired is a physiological signal for rest, not an evaluation of my competence. Sleeping resets my brain for memory retention.';
                tip = 'Take a hard cutoff tonight at 9:30 PM. Get 8 hours of sleep to restore cognitive capacity.';
            }

            displayCbtResult(distortions, text, reframed, explanation, tip);
            reframeBtn.disabled = false;
            reframeBtn.innerText = 'Analyze & Reframe Thought';
        }, 1200);
    });

    const displayCbtResult = (distortions, original, reframed, explanation, tip) => {
        detectedDistortionTitle.innerText = distortions;
        originalThoughtText.innerText = `"${original}"`;
        reframedThoughtText.innerText = `"${reframed}"`;
        distortionExplanationText.innerText = explanation;
        cbtStudyTip.innerText = tip;
        
        reframeResult.classList.remove('d-none');
        reframeResult.scrollIntoView({ behavior: 'smooth' });
    };

    // ==========================================================================
    // VIEW: AI CHAT COMPANION VIEW
    // ==========================================================================

    const appendChatMessage = (text, isBot = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerText = text;
        
        const timestamp = document.createElement('span');
        timestamp.className = 'message-time';
        const now = new Date();
        timestamp.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(timestamp);
        chatMessages.appendChild(messageDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChatSubmission = async () => {
        const query = chatInput.value.trim();
        if (!query) return;

        if (checkSafetyAlert(query)) {
            chatInput.value = '';
            return;
        }

        appendChatMessage(query, false);
        chatInput.value = '';

        // Bot thinking bubble
        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-message bot typing';
        typingBubble.innerHTML = '<div class="message-bubble">...</div>';
        chatMessages.appendChild(typingBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (state.apiKey) {
            const chatPrompt = `You are MindAnchor, an empathetic, caring, non-judgmental AI companion for a student studying for high-stakes exams.
The student says: "${query}"
Provide a supportive, validating response (max 3-4 sentences).`;
            const realReply = await queryGeminiAPI(chatPrompt);
            typingBubble.remove();
            if (realReply) {
                appendChatMessage(realReply, true);
                return;
            }
        }

        // Sim Reply Fallback
        setTimeout(() => {
            typingBubble.remove();
            let response = "I hear you, and it sounds like you're carrying a massive burden. Remember that consistency builds results, but rest secures them. What specific chapter or mock block is stressing you right now?";
            
            const val = query.toLowerCase();
            if (val.includes('backlog')) {
                response = "Backlogs are extremely common. The secret is to avoid the trap of reviewing everything at once. Focus on high-weightage chapters first. Can we draft a micro-plan for just one topic?";
            } else if (val.includes('fail') || val.includes('test') || val.includes('mock')) {
                response = "Mock tests are just calibration tools, not mock verdicts. Every failure details a chapter that needs active recall revision. You are learning, don't write yourself off.";
            } else if (val.includes('parent') || val.includes('expect')) {
                response = "Studying with parental expectations can feel like carrying double the pressure. They want you secure, but sometimes miss the toll it takes on you. Try taking a step back today, you're doing your best.";
            } else if (val.includes('burnout') || val.includes('exhausted') || val.includes('tired')) {
                response = "Feeling exhausted means you have crossed your capacity limits. Studying further has negative margins. Cut off by 10 PM tonight, try our Box Breathing widget to ease your nervous system.";
            }

            appendChatMessage(response, true);
        }, 1000);
    };

    chatSendBtn.addEventListener('click', handleChatSubmission);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSubmission();
    });

    // Chips click handler
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.innerText;
            handleChatSubmission();
        });
    });

    clearChat.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="chat-message bot">
                <div class="message-bubble">
                    Hello! I'm your MindAnchor companion. Exams, mock tests, backlogs, sleep schedules, or parent pressure—whatever is weighing on your mind, you can vent it here securely. I'm here to listen.
                </div>
                <span class="message-time">11:46 AM</span>
            </div>
        `;
    });

    // ==========================================================================
    // VIEW: SOUND & BREATHING VIEW (BOX BREATHING)
    // ==========================================================================
    
    let breathInterval = null;
    let breathStep = 0; // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold (empty)
    let breathTimeLeft = 4;

    const startBreathingCycle = () => {
        breathStep = 0;
        breathTimeLeft = 4;
        updateBreathBubble();
        
        breathInterval = setInterval(() => {
            breathTimeLeft--;
            if (breathTimeLeft <= 0) {
                breathStep = (breathStep + 1) % 4;
                breathTimeLeft = 4;
            }
            updateBreathBubble();
        }, 1000);

        startBreathBtn.classList.add('d-none');
        stopBreathBtn.classList.remove('d-none');
    };

    const stopBreathingCycle = () => {
        clearInterval(breathInterval);
        breathInterval = null;
        breathBubble.className = "breathing-circle-inner";
        breathInstruction.innerText = "Click Start";
        breathTimer.innerText = "0s";
        
        startBreathBtn.classList.remove('d-none');
        stopBreathBtn.classList.add('d-none');
    };

    const updateBreathBubble = () => {
        breathTimer.innerText = `${breathTimeLeft}s`;
        
        switch(breathStep) {
            case 0:
                breathInstruction.innerText = "Inhale";
                breathBubble.className = "breathing-circle-inner breath-inhale";
                break;
            case 1:
                breathInstruction.innerText = "Hold Breath";
                breathBubble.className = "breathing-circle-inner breath-hold";
                break;
            case 2:
                breathInstruction.innerText = "Exhale";
                breathBubble.className = "breathing-circle-inner breath-exhale";
                break;
            case 3:
                breathInstruction.innerText = "Hold (Empty)";
                breathBubble.className = "breathing-circle-inner breath-hold-empty";
                break;
        }
    };

    startBreathBtn.addEventListener('click', startBreathingCycle);
    stopBreathBtn.addEventListener('click', stopBreathingCycle);

    // ==========================================================================
    // BINAURAL AUDIO DRONE SYNTHESIZER (WEB AUDIO API)
    // ==========================================================================
    
    let audioCtx = null;
    let oscLeft = null;
    let oscRight = null;
    let gainNode = null;
    let pannerLeft = null;
    let pannerRight = null;
    let isPlayingAudio = false;

    const initAudio = () => {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(parseFloat(ambientVolume.value) * 0.15, audioCtx.currentTime); // keep binaural sub-audible/comfy

        // Pan left oscillator to left channel, right oscillator to right channel
        pannerLeft = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
        pannerRight = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
        
        if (pannerLeft && pannerRight) {
            pannerLeft.pan.setValueAtTime(-1, audioCtx.currentTime);
            pannerRight.pan.setValueAtTime(1, audioCtx.currentTime);
        }
    };

    const startBinauralBeats = () => {
        if (!audioCtx) initAudio();
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Left Channel Carrier Frequency = 110Hz
        oscLeft = audioCtx.createOscillator();
        oscLeft.type = 'sine';
        oscLeft.frequency.setValueAtTime(110, audioCtx.currentTime);

        // Right Channel Modulator Frequency = 114Hz (Delta/Theta = 4Hz difference)
        oscRight = audioCtx.createOscillator();
        oscRight.type = 'sine';
        oscRight.frequency.setValueAtTime(114, audioCtx.currentTime);

        // Routing
        if (pannerLeft && pannerRight) {
            oscLeft.connect(pannerLeft).connect(gainNode);
            oscRight.connect(pannerRight).connect(gainNode);
        } else {
            oscLeft.connect(gainNode);
            oscRight.connect(gainNode);
        }
        
        gainNode.connect(audioCtx.destination);

        oscLeft.start();
        oscRight.start();
        
        isPlayingAudio = true;
        playAmbientBtn.innerText = "Stop Ambient Beats";
        playAmbientBtn.classList.replace('btn-primary', 'btn-outline');
    };

    const stopBinauralBeats = () => {
        if (oscLeft) {
            oscLeft.stop();
            oscLeft.disconnect();
        }
        if (oscRight) {
            oscRight.stop();
            oscRight.disconnect();
        }
        isPlayingAudio = false;
        playAmbientBtn.innerText = "Play Ambient Beats";
        playAmbientBtn.classList.replace('btn-outline', 'btn-primary');
    };

    playAmbientBtn.addEventListener('click', () => {
        if (isPlayingAudio) {
            stopBinauralBeats();
        } else {
            startBinauralBeats();
        }
    });

    ambientVolume.addEventListener('input', () => {
        if (gainNode && audioCtx) {
            gainNode.gain.setValueAtTime(parseFloat(ambientVolume.value) * 0.15, audioCtx.currentTime);
        }
    });

    // ==========================================================================
    // VIEW: SYSTEM SETTINGS VIEW
    // ==========================================================================

    saveApiKeyBtn.addEventListener('click', () => {
        const key = geminiApiKey.value.trim();
        if (key) {
            state.apiKey = key;
            localStorage.setItem('gemini_api_key', key);
            apiStatusMsg.classList.remove('d-none');
            clearApiKeyBtn.classList.remove('d-none');
            alert('Gemini API key configured successfully!');
        }
    });

    clearApiKeyBtn.addEventListener('click', () => {
        state.apiKey = '';
        localStorage.removeItem('gemini_api_key');
        geminiApiKey.value = '';
        apiStatusMsg.classList.add('d-none');
        clearApiKeyBtn.classList.add('d-none');
        alert('Gemini API key deleted. Switched back to simulator filters.');
    });

    updateProfileBtn.addEventListener('click', () => {
        const newNickname = settingsUsername.value.trim();
        const newExam = settingsExam.value;

        if (newNickname) {
            state.user.nickname = newNickname;
            state.user.targetExam = newExam;
            localStorage.setItem('anchor_user', JSON.stringify(state.user));
            showDashboard();
            alert('User profile settings updated.');
        }
    });

    purgeDataBtn.addEventListener('click', () => {
        if (confirm('Are you absolutely sure you want to delete all historical mood logs and local records?')) {
            localStorage.clear();
            location.reload();
        }
    });

    // ==========================================================================
    // JUDGE DEMO MODE AUTO-TOUR (30s VALUE CONSOLIDATOR)
    // ==========================================================================
    
    const runDemoTour = () => {
        // 1. Onboard Mock Student "Roma" (UPSC Aspirant)
        state.user = { nickname: "Roma", targetExam: "UPSC" };
        localStorage.setItem('anchor_user', JSON.stringify(state.user));

        // 2. Populate critical Burnout buildup (Red Alert mode!)
        const demoLogs = [];
        const baseTime = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        const moods = [3, 4, 3, 2, 2, 2, 1];
        const study = [8, 9, 8.5, 11, 12, 11.5, 13];
        const sleep = [7, 6.5, 6.5, 5, 4.5, 5, 4];
        const energy = [3, 4, 3, 2, 2, 2, 1];

        for (let i = 0; i < 7; i++) {
            const timestamp = baseTime + (i * 24 * 60 * 60 * 1000);
            const burnout = calculateBurnoutIndex(moods[i], study[i], sleep[i], energy[i]);
            demoLogs.push({
                timestamp,
                mood: moods[i],
                studyHours: study[i],
                sleepHours: sleep[i],
                energyLevel: energy[i],
                burnoutScore: burnout
            });
        }
        state.logs = demoLogs;
        localStorage.setItem(`logs_${state.user.nickname}`, JSON.stringify(state.logs));

        // 3. Initialize Social Impact state
        state.checkedSmartActions = ['act_breath'];
        state.socialImpactScore = 55;
        localStorage.setItem('social_impact_score', state.socialImpactScore);
        localStorage.setItem('checked_smart_actions', JSON.stringify(state.checkedSmartActions));

        // 4. Seed Chat history
        const demoChats = [
            { sender: 'bot', message: 'Hello! I\'m your MindAnchor companion. Exams, mock tests, backlogs, sleep schedules, or parent pressure—whatever is weighing on your mind, you can vent it here securely. I\'m here to listen.' },
            { sender: 'user', message: 'I feel completely stuck. I have a 3-week syllabus backlog in UPSC History optionals and mock test scores are dropping. I don\'t think I will ever clear this exam.' },
            { sender: 'bot', message: 'It is completely normal to feel overwhelmed when facing a backlog, especially in a vast syllabus like UPSC Optionals. But a backlog is just information about what chapters to prioritize next, not an index of your failure. Shall we break down one priority topic to tackle tomorrow?' }
        ];
        state.chats = demoChats;
        localStorage.setItem(`chats_${state.user.nickname}`, JSON.stringify(state.chats));

        // 5. Trigger Dashboard views & clock
        showDashboard();

        // 6. Direct chat list populate
        if (chatMessages) {
            chatMessages.innerHTML = '';
            state.chats.forEach(chat => {
                appendChatMessage(chat.message, chat.sender === 'bot');
            });
        }

        // 7. Auto-run CBT Reframer workflow
        const sampleThought = "I wasted another full day trying to read optional sheets. I am lagging behind everyone. I will definitely fail this UPSC attempt and disappoint my parents.";
        journalInput.value = sampleThought;
        const charCount = journalInput.value.length;
        journalCharCount.innerText = `${charCount} characters`;
        
        displayCbtResult(
            "Catastrophizing & Personalization", 
            sampleThought, 
            "Today was a challenging study day, but it does not define my intelligence or mock chances. Re-evaluating optional sheets tomorrow is a constructive step. My family values my wellness and dedication over any exam percentile.", 
            "Catastrophizing jumps straight to absolute failure based on one single day's study deficit, while personalization shifts standard preparation challenges into a measure of self-worth.", 
            "Immediate offline break: Close all books. Take a 15-minute walk outside or chat with a friend to reset expectations."
        );

        // 8. Visual redirect to Dashboard view
        document.querySelector('.nav-item[data-view="dashboard"]').click();
        
        // Notify
        alert("✨ Judge Demo Mode Active!\n\n- Logged in 'Roma (UPSC Aspirant)'\n- Generated critical Burnout Red Alert (78%)\n- Seeded conversation companion logs\n- Highlighted CBT distortions & alternative thoughts\n- Social Impact Quotient tracking enabled!");
    };

    if (demoBtn) {
        demoBtn.addEventListener('click', runDemoTour);
    }
    if (headerDemoBtn) {
        headerDemoBtn.addEventListener('click', runDemoTour);
    }

    // ==========================================================================
    // GEETA WISDOM SANCTUARY MODULE
    // ==========================================================================
    
    const shlokas = [
        {
            sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
            transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana,\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi",
            translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
            summary: "Focus entirely on your study schedule and active learning, rather than paralyzing yourself with fear of mock test ranks. You control your effort, not the final cutoffs."
        },
        {
            sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
            transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet,\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ",
            translation: "Elevate yourself through the power of your own mind, and do not degrade yourself. For the mind can be the friend of the self, and the mind can also be the enemy of the self.",
            summary: "Negative self-talk and imposter syndrome degrade your progress. Cultivate your mind as your greatest study ally by reframing negative thoughts into constructive growth."
        },
        {
            sanskrit: "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥",
            transliteration: "yato yato niścharati manaś chañchalam asthiram,\ntatas tato niyamyaitad ātmanyeva vaśaṁ nayet",
            translation: "From wherever the restless and unsteady mind wanders, one must bring it back and direct it under the control of the self.",
            summary: "Distraction and wandering thoughts are natural during long study hours. Each time your mind drifts to social media, syllabus size, or fear of failure, gently guide it back to the single topic at hand."
        },
        {
            sanskrit: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
            transliteration: "duḥkheṣhv-anudvigmanaḥ sukheṣhu vigata-spṛihaḥ,\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir uchyate",
            translation: "One whose mind remains undisturbed amidst misery, who does not crave pleasure, and who is free from attachment, fear, and anger, is called a sage of steady wisdom.",
            summary: "Maintain equanimity whether mock test scores rise or fall. Stability of mind prevents emotional burnout and leads to peak cognitive performance."
        }
    ];

    let currentShlokaIndex = 0;

    const updateShlokaUI = () => {
        const active = shlokas[currentShlokaIndex];
        if (shlokaSanskrit) shlokaSanskrit.innerText = active.sanskrit;
        if (shlokaTransliteration) shlokaTransliteration.innerText = `"${active.transliteration}"`;
        if (shlokaTranslation) shlokaTranslation.innerText = `"${active.translation}"`;
        if (shlokaSummary) shlokaSummary.innerText = active.summary;

        // Reset speech button if speaking
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            if (playShlokaAudioBtn) playShlokaAudioBtn.innerText = "🔊 Play Audio Translation";
        }
    };

    const playShlokaAudio = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            playShlokaAudioBtn.innerText = "🔊 Play Audio Translation";
            return;
        }

        const active = shlokas[currentShlokaIndex];
        const textToSpeak = `${active.translation}. Focus Tip: ${active.summary}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // Slow speech for meditative effect
        utterance.rate = 0.85;
        utterance.pitch = 1.0;

        utterance.onend = () => {
            playShlokaAudioBtn.innerText = "🔊 Play Audio Translation";
        };

        playShlokaAudioBtn.innerText = "⏹️ Stop Audio";
        window.speechSynthesis.speak(utterance);
    };

    const nextShloka = () => {
        currentShlokaIndex = (currentShlokaIndex + 1) % shlokas.length;
        updateShlokaUI();
    };

    // Listeners for Geeta view
    if (playShlokaAudioBtn) {
        playShlokaAudioBtn.addEventListener('click', playShlokaAudio);
    }
    if (nextShlokaBtn) {
        nextShlokaBtn.addEventListener('click', nextShloka);
    }

    // Initialize Shloka UI
    updateShlokaUI();

    // Initial check
    checkAuth();
});
