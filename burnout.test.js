// Burnout Index Calculation Logic (Mirrors script.js implementation)
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

// Simulated CBT Reframer logic (Mirrors script.js implementation)
const simulateCbtReframer = (text) => {
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

    return { distortions, explanation, reframed, tip };
};

// Gita Wisdom Shlokas (Mirrors script.js implementation)
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

// Social Impact score calculation toggle logic (Mirrors script.js implementation)
const toggleSocialImpactScore = (currentScore, actionId, checked, actionPoints) => {
    let score = currentScore;
    if (checked) {
        score = Math.min(score + actionPoints, 100);
    } else {
        score = Math.max(score - actionPoints, 0);
    }
    return score;
};

describe('MindAnchor: Burnout Risk Index Calculator', () => {
    test('Healthy routine should return low burnout risk index (<40%)', () => {
        const score = calculateBurnoutIndex(4, 7, 8, 4); // high mood, 7h study, 8h sleep, high energy
        expect(score).toBeLessThan(40);
    });

    test('Unbalanced study and low sleep should return high burnout risk index (>70%)', () => {
        const score = calculateBurnoutIndex(1, 13, 4, 1); // low mood, 13h study, 4h sleep, low energy
        expect(score).toBeGreaterThanOrEqual(70);
    });

    test('Edge case inputs should be bound between 0% and 100%', () => {
        const maxScore = calculateBurnoutIndex(1, 24, 0, 1);
        const minScore = calculateBurnoutIndex(5, 0, 10, 5);
        expect(maxScore).toBe(100);
        expect(minScore).toBe(0);
    });
});

describe('MindAnchor: Simulated CBT Cognitive Reframer', () => {
    test('Should detect Overgeneralization & Catastrophizing for words like always/never/fail', () => {
        const result = simulateCbtReframer("I will never pass this exam, I fail always.");
        expect(result.distortions).toBe("Overgeneralization & Catastrophizing");
        expect(result.reframed).toContain("restructure my schedule");
    });

    test('Should detect Mind Reading & Personalization for words like ashamed/parents', () => {
        const result = simulateCbtReframer("I am ashamed of myself and my parents will hate me.");
        expect(result.distortions).toBe("Mind Reading & Personalization");
        expect(result.reframed).toContain("My efforts are valued");
    });

    test('Should detect Emotional Reasoning for words like tired/useless', () => {
        const result = simulateCbtReframer("I am too tired and my study session was useless.");
        expect(result.distortions).toBe("Emotional Reasoning");
        expect(result.reframed).toContain("physiological signal");
    });

    test('Should return fallback All-or-Nothing thinking if no keywords are matched', () => {
        const result = simulateCbtReframer("Just a random study day reflection.");
        expect(result.distortions).toBe("All-or-Nothing Thinking");
    });
});

describe('MindAnchor: Gita Wisdom Sanctuary Content Validation', () => {
    test('Should contain exactly 4 shlokas with appropriate translations and focus tips', () => {
        expect(shlokas.length).toBe(4);
        shlokas.forEach(shloka => {
            expect(shloka).toHaveProperty('sanskrit');
            expect(shloka).toHaveProperty('transliteration');
            expect(shloka).toHaveProperty('translation');
            expect(shloka).toHaveProperty('summary');
        });
    });
});

describe('MindAnchor: Social Impact & Sustainability Score Calculator', () => {
    test('Checking an action should add points up to a limit of 100', () => {
        let score = 45;
        score = toggleSocialImpactScore(score, 'act_family', true, 15);
        expect(score).toBe(60);

        score = toggleSocialImpactScore(score, 'act_offline', true, 20);
        expect(score).toBe(80);

        // Limit checking
        score = toggleSocialImpactScore(95, 'act_offline', true, 20);
        expect(score).toBe(100);
    });

    test('Unchecking an action should deduct points down to a floor of 0', () => {
        let score = 45;
        score = toggleSocialImpactScore(score, 'act_family', false, 15);
        expect(score).toBe(30);

        // Limit checking
        score = toggleSocialImpactScore(5, 'act_offline', false, 20);
        expect(score).toBe(0);
    });
});
