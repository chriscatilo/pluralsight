describe('Object extensions', () => {
    it('setPrototypeOf() takes the properties and functions of source to target, but not the prototype chain', () => {
        let a = { x: 1 };
        let b = { y: 2, foo() { return 'from b' } };
        Object.setPrototypeOf(a, b);
        expect(a.x).toBe(1);
        expect(a.y).toBe(2);
        expect(a.foo()).toBe('from b');
        expect(a).toEqual({ x: 1 });
    })
    it('assign() will populate target with sources and will override existing properties and methods', () => {
        let a = { x: 1 };
        let b = { y: 2, foo() { return 'from b' } };
        let target = { x: 4, c: 3, foo() { return 'from target ' } };
        Object.assign(target, a, b);
        expect(target.x).toBe(1);
        expect(target.y).toBe(2);
        expect(target.c).toBe(3);
        expect(target.foo()).toBe('from b');
    })
    it('defineProperty() adds a property to its target, and sets whether it is enumerable', () => {
        let a = { x: 2 };
        Object.defineProperty(a, 'y', {
            value: 10,
            enumerable: false
        });
        expect(a.y).toBe(10);
        expect(a).toEqual({ x: 2 });
        expect(a).not.toEqual({ x: 2, y: 10 });

        let b = { z: 1 };
        let c = {};
        Object.assign(c, a, b);
        expect(c).toEqual({ x: 2, z: 1 });
        expect(c).not.toEqual({ x: 2, y: 10, z: 1 });
    })
    it('Object.is() as substitute for NaN equals NaN quirk', () => {
        let amount = NaN;
        expect(amount === amount).toBe(false);
        expect(Object.is(amount, amount)).toBe(true);
    })
    it('...and substitutes -0 quirk', () => {
        let amount = 0, total = -0;
        expect(amount === total).toBe(true);
        expect(Object.is(amount, total)).toBe(false);
    })
    it('Symbol.getOwnPropertySymbols() iterates to the Symbol properties of an object', () => {
        let article = {
            title: 'Whiteface Mountain',
            [Symbol.for('article')]: 'My Article'
        }
        expect(Object.getOwnPropertySymbols(article)).toEqual([Symbol.for('article')]);
    })
})
describe('String extensions', () => {
    it('startsWith()', () => {
        expect('Santa Barbara Surf Riders'.startsWith('Sant')).toBe(true);
    })
    it('endsWith()', () => {
        expect('Santa Barbara Surf Riders'.endsWith('Sant')).toBe(false);
    })
    it('includes', () => {
        expect('Santa Barbara Surf Riders'.includes('ba')).toBe(true);
    })
    it("Unicode using \\u\{\}", () => {
        let title = 'Surfer\'s \u{1f3c4} Blog';
        expect(title).toBe('Surfer\'s 🏄 Blog');
    })
    it('Normilize() corrects the string length by taking into account the normal length of special or other characters', () => {
        let title = 'Mazatla\u0301n';
        expect(`${title} ${title.length}`).toBe('Mazatlán 9');
        expect(`${title} ${title.normalize().length}`).toBe('Mazatlán 8');
    })
    it('codePointAt() retrieves the unicode from the Nth point', () => {
        let title = 'Mazatla\u0301n';
        expect(title.normalize().codePointAt(7).toString(16)).toBe('6e'); //á
    })
    it('String.fromCodePoint() retrives the character with hex value', () => {
        expect(String.fromCodePoint(0x1f3c4)).toBe('🏄');
    })
    it('String.raw() takes the input as a raw string but will interpolate any ${}', () => {
        let title = 'Surfer';
        expect(String.raw`${title} \u{1f3c4}\n`).toBe('Surfer \\u\{1f3c4\}\\n');
    })
    it('repeat() repeats Nth times', () => {
        let wave = '\u{1f30a}';
        expect(wave.repeat(10)).toBe('🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊');
    })
})
describe('Number extensions', () => {
    it('Number.parseInt is parseInt (and all other parse functions)', () => {
        expect(Number.parseInt).toBe(parseInt);
    })
    it('Number.isNan() behaves differently from isNaN()', () => {
        let s = 'NaN';
        expect(isNaN(s)).toBe(true);
        expect(Number.isNaN(s)).toBe(false);
    })
    it('Number.isFinite() behaves differently from isFinite()', () => {
        let s = '8000';
        expect(isFinite(s)).toBe(true);
        expect(Number.isFinite(s)).toBe(false);
    })
    it('Number.isInteger()', () => {
        expect(Number.isInteger(402.2)).toBe(false);
        expect(Number.isInteger(NaN)).toBe(false);
        expect(Number.isInteger(Infinity)).toBe(false);
        expect(Number.isInteger(undefined)).toBe(false);
        expect(Number.isInteger(402)).toBe(true);
        expect(Number.isInteger(-402)).toBe(true);
    })
    it('Number.isSafeInteger() tests if the integer can accurately be represented into floating point notation (as they loose their precision at a certain amount of time)', () => {
        expect(Number.isSafeInteger(Math.pow(2, 53)-1)).toBe(true);
        expect(Number.isSafeInteger(Math.pow(2, 53))).toBe(false);
    })
    it('constants EPSILON, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER', () => {
        expect(Number.EPSILON).toBe(2.220446049250313e-16);
        expect(Number.MAX_SAFE_INTEGER).toBe(9007199254740991);
        expect(Number.MIN_SAFE_INTEGER).toBe(-9007199254740991);
    })
})
describe('Math extensions', () => {
    it('Hyperbolic functions', () => {
        expect(Math.cosh).not.toBe(undefined);
        expect(Math.acosh).not.toBe(undefined);
        expect(Math.sinh).not.toBe(undefined);
        expect(Math.asinh).not.toBe(undefined);
        expect(Math.tanh).not.toBe(undefined);
        expect(Math.atanh).not.toBe(undefined);
        expect(Math.hypot).not.toBe(undefined);
    })
    it('Arithmetic functions', () => {
        expect(Math.cbrt).not.toBe(undefined); //cube root
        expect(Math.clz32).not.toBe(undefined); // count leading zeros (32 bit integers)
        expect(Math.expm1).not.toBe(undefined); // equal to exp(x) -1
        expect(Math.log2).not.toBe(undefined); // log base 2
        expect(Math.log10).not.toBe(undefined); // log base 10
        expect(Math.log1p).not.toBe(undefined); // equal to log(x + 1)
        expect(Math.imul).not.toBe(undefined); // 32 bit integer multiplication
    })
    it('Misc', () => {
        expect(Math.sign).not.toBe(undefined); // the number's sign 1, -1, -0
        expect(Math.trunc).not.toBe(undefined); // the integer part of the number
        expect(Math.fround).not.toBe(undefined); // round to the nearest 32 bit floating point value
    })
})
describe('RegEx extensions', () => {
    it('Append a "u" flag to the pattern in order to test for unicode values', () => {
        expect(/\u{1f3c4}/.test('🏄')).toBe(false);
        expect(/\u{1f3c4}/u.test('🏄')).toBe(true);
    })
    it('"y" flag tests from the last index', () => {
        expect(/900/.lastIndex).toBe(0);
        expect(/900/.test('800900')).toBe(true);
        expect(/900/y.lastIndex).toBe(0);
        expect(/900/y.test('800900')).toBe(false);
        expect(/900/.test('800900')).toBe(true);

        let pattern = /900/;
        pattern.lastIndex = 3;
        expect(pattern.lastIndex).toBe(3);
        expect(pattern.test('800900')).toBe(true);
    })
    it('flags retrives the flags used in the pattern (order will be "gimuy")', () => {
        expect(/900/ygmi.flags).toBe('gimy');
    })
})
describe('Function extensions', () => {
    it('name returns the name of the function', () => {
        let fn = function calc() { };
        expect(fn.name).toBe('calc');
    })
    it('if the function does not have a name, then it uses the name of the variable refering to the function', () => {
        let fn = function () { };
        expect(fn.name).toBe('fn');
    })
    it('..even if the variable is assigned to another variable', () => {
        let fn = function () { };
        let newFn = fn;
        expect(newFn.name).toBe('fn');
    })
    it('name can also retrieve the class name and it`s members' , () => {
        class Calculator {
            add() {}
        }
        expect(Calculator.name).toBe('Calculator');
        let c = new Calculator();
        expect(c.add.name).toBe('add');
    })
})