(function () {
    'use strict';
    describe('Destructuring Arrays', () => {
        it('Arrays can be mapped to variables', () => {
            let [low, average, high] = [32000, 50000, 75000];
            expect(average).toBe(50000);
        });
        it('...even undefined sources', () => {
            let [low, average, high] = [32000, 50000];
            expect(high).toBe(undefined);
        }
        );
        it('Targets can have default values', () => {
            let [low, average, high = 88000] = [32000, 50000];
            expect(high).toBe(88000);
        });
        it('...but will be overriden by a null or valid source', () => {
            let [low, average, high = 88000] = [32000, 50000, null];
            expect(high).toBe(null);
        });
        it('Targets can be void', () => {
            let [low, , high,] = [32000, 50000, 75000];
            expect(high).toBe(75000);
        });
        it('Rest can be used', () => {
            let [low, ...remaining] = [32000, 50000, 75000];
            expect(remaining).toEqual([50000, 75000]);
        }
        );
        it('Nested arrays can be mapped', () => {
            let [low, average, [actualLow, actualHigh]] = [32000, 50000, [88000, 99000]];
            expect(actualLow).toEqual(88000);
        });
        it('Parameters can be mapped', () => {
            function reviewSalary([low, average], high = 88000) {
                expect(average).toEqual(50000);
            }
            reviewSalary([32000, 50000]);
        });
        it('Undefined and Null sources are not iterable', () => {
            expect(function () {
                let [low, average, high] = undefined;
            }).toThrow(new TypeError('undefined is not iterable'))

            expect(function () {
                let [low, average, high] = null;
            }).toThrow(new TypeError('null is not iterable'))

        });
    })
    describe('Deconstructing objects', () => {
        it('Objects can be destructured', () => {
            let salary = {
                low: 32000,
                average: 50000,
                high: 75000
            }
            let { low, average, high } = salary;
            expect(high).toEqual(75000);
        });
        it('Target variables can be subsituted', () => {
            {
                let salary = {
                    low: 32000,
                    average: 50000,
                    high: 75000
                }
                let { low, average, high: newHigh } = salary;

                expect(function () { high; }).toThrow(new ReferenceError('high is not defined'));
                expect(newHigh).toBe(75000);
            }
            {
                let salary = {
                    low: 32000,
                    average: 50000,
                    high: 75000
                }
                let newLow, newAverage, newHigh;
                ({ low: newLow, average: newAverage, high: newHigh } = salary);
                expect(newLow).toBe(32000);
                expect(newAverage).toBe(50000);
                expect(newHigh).toBe(75000);
            }
        });
        it('Strings can be substituted', () => {
            let [maxCode, minCode] = 'AZ';
            expect(maxCode).toBe('A');
            expect(minCode).toBe('Z');
        });
    })
})();