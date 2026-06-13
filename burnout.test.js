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
