describe('Symbols', () => {
    it('They\'re purpose is to create a unique identifier w/o the developer having access to that identifier', () => {
        let eventSymbol = Symbol('resize event');

        expect(typeof eventSymbol).toBe('symbol');
        expect(eventSymbol.toString()).toBe('Symbol(resize event)');
    });
    it('One use is to generate an immutable identifier with const', () => {
        const CALC_EVENT_SYMBOL = Symbol('calculate event');
        expect(CALC_EVENT_SYMBOL.toString()).toBe('Symbol(calculate event)');
    });
    it('Symbols are unique from another', () => {
        let s1 = Symbol('event');
        let s2 = Symbol('event');
        expect(s1).not.toBe(s2);
        expect(s1).not.toEqual(s2);
    });
    it('Use Symbol.for() to register one for the given descriptor; calling it again will return the registered symbol', () => {
        let s1 = Symbol.for('event');
        let s2 = Symbol.for('event');
        let s3 = Symbol.for('event2');
        expect(s1).toBe(s2);
        expect(s1).toEqual(s2);
        expect(s1).not.toEqual(s3);
    });
    it('Use Symbol.keyFor() to get the symbol allocated for the given descriptor', () => {
        let s1 = Symbol.for('event');
        let descriptor = Symbol.keyFor(s1);
        expect(descriptor).toBe('event');
    });
    it('Symbols can be used as property identifier in an object', () => {
        let article = {
            title: 'Whiteface Mountain',
            [Symbol.for('article')]: 'My Article'
        }
        let value = article[Symbol.for('article')];
        expect(value).toBe('My Article');
    });
    it('Symbols as property identifier are not included in the property name iterator', () => {
        let article = {
            title: 'Whiteface Mountain',
            [Symbol.for('article')]: 'My Article'
        }
        expect(Object.getOwnPropertyNames(article)).toEqual(['title']);
    });
    it('...but are included in the property symbols iterator', () => {
        let article = {
            title: 'Whiteface Mountain',
            [Symbol.for('article')]: 'My Article'
        }
        expect(Object.getOwnPropertySymbols(article)).toEqual([Symbol.for('article')]);
    });
});

describe('Well-known Symbols for Meta programming', () => {
    it('toString output is not particularly useful', () => {
        let Blog = function(){};
        let blog = new Blog();
        expect(blog.toString()).toBe('[object Object]');
    })
    it('...but it can be overriden using Symbol.toStingTag', () => {
        let Blog = function(){};
        Blog.prototype[Symbol.toStringTag] = 'Blog Class';
        let blog = new Blog();
        expect(blog.toString()).toBe('[object Blog Class]');
    })
    it('Array.concat() concatinates its arguments to the array', () => {
        expect([].concat([8,12,16])).toEqual([8,12,16]);
    })
    it('...but by falsifing Symbol.isConcatSpreadable to the incoming array, it will prevent it from being spread to the target array', () => {
        let values = [8,12,16];
        values[Symbol.isConcatSpreadable] = false;
        expect([].concat(values)).toEqual([ [8,12,16] ]);
    })
    it('Using a + operator to an array will stringify the target and append the value', () => {
        let values = [8,12,16];
        let sum = values + 'hello';
        expect(sum).toEqual('8,12,16hello');
    })
    it('...but we can override the Symbol.toPrimitive to change its behaviour', () => {
        let values = [8,12,16];
        values[Symbol.toPrimitive] = function(hint) {
            var result = this.reduce(function(agg, i){
               return agg = (agg + i); 
            });
            return result;
        }
        let sum = values + 10;
        expect(sum).toEqual(46);
    })
})