const { expect } = require('chai');
const { shuffleArray } = require('../game'); // Adjust the path as necessary

describe('shuffleArray', function() {
    it('should return different results when called multiple times with the same array', function() {
        const array = [1, 2, 3, 4, 5];
        const results = new Set();

        for (let i = 0; i < 3; i++) {
            const shuffled = shuffleArray([...array]); // Use a copy of the array
            results.add(shuffled.join(',')); // Convert array to string for set comparison
        }

        // If all results are the same, the size of the set will be 1
        expect(results.size).to.be.greaterThan(1);
    });
}); 