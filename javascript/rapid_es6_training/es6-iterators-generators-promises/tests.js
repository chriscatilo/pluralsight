describe('Iterators', () => {
    it('Symbol.iterator is a special funtion that retrieves the iterator of an object or array', () =>{
        let ids = [9000, 9001, 9002];
        let iter = ids[Symbol.iterator]();
        expect(iter.next()).toEqual({ value: 9000, done: false });
        expect(iter.next()).toEqual({ value: 9001, done: false });
        expect(iter.next()).toEqual({ value: 9002, done: false });
        expect(iter.next()).toEqual({ value: undefined, done: true });
    });
    it('We can build our own iterator using Symbol.iterator', () => {
        let idMaker = {
            [Symbol.iterator]() {
                let nextId = 1;
                return {
                    next() {
                        return {
                            value: nextId++, done: false
                        };
                    }
                }
            }
        }

        let iter = idMaker[Symbol.iterator]();
        
        expect(iter.next()).toEqual({ value: 1, done: false });
        expect(iter.next()).toEqual({ value: 2, done: false });
        expect(iter.next()).toEqual({ value: 3, done: false });

        let i = 0;
        for (let v of idMaker) {
            if (v > 10) break;
            expect(v).toBe(++i);
        }
    })
});
 
describe('Generators', () => {
    it('They are special function that yields results thru an iterator', () => {
        function *process() {
            yield 1;
            yield 2;
        }

        let iter = process();
         
        expect(iter.next()).toEqual({ value: 1, done: false });
        expect(iter.next()).toEqual({ value: 2, done: false });
        expect(iter.next()).toEqual({ value: undefined, done: true });
    })
    it('The yield emits the value to the next() call, then the coming next() call can pass an argument returned by the previous yield', () => {
        function *process() {
            let a = yield;
            let b = (yield a);
            yield b;
        }
        let it = process();
        expect(it.next()).toEqual({ value: undefined, done: false }); // start off the iterator
        expect(it.next(200)).toEqual({ value: 200, done: false });
        expect(it.next(300)).toEqual({ value: 300, done: false });
        expect(it.next()).toEqual({ value: undefined, done: true });
    })
    it('We can initialize the generator by passing a value to the second call of next()', () => {
        function *process() {
            let v = yield;
            yield v++;
            yield v++;
            yield v++;
            yield v++;
        }
        let it = process();
        expect(it.next()).toEqual({ value: undefined, done: false }); // start off the iterator
        expect(it.next(200)).toEqual({ value: 200, done: false });
        expect(it.next()).toEqual({ value: 201, done: false });
        expect(it.next()).toEqual({ value: 202, done: false });
        expect(it.next()).toEqual({ value: 203, done: false });
    })
    it('We can populate the array within a generator', () => {
        function *process(){
            let a = [yield, yield, yield];
            yield a;
        }
        let it = process();
        expect(it.next()).toEqual({ value: undefined, done: false }); // start off the iterator
        expect(it.next('a')).toEqual({ value: undefined, done: false });
        expect(it.next('b')).toEqual({ value: undefined, done: false });
        expect(it.next('c')).toEqual({ value: ['a','b','c'], done: false });
    })
    it('yield* yield each value within an array',() => {
        function *process() {
            yield* [1,2]
        }

        let iter = process();
         
        expect(iter.next()).toEqual({ value: 1, done: false });
        expect(iter.next()).toEqual({ value: 2, done: false });
        expect(iter.next()).toEqual({ value: undefined, done: true });
    })
    it('throw() will raise an exception to the generator', () => {
        function *process(){
            yield 9000;
            yield 9001; 
            yield 9002;
        }

        let it = process();
        expect(it.next()).toEqual({ value: 9000, done: false });
        expect(function(){it.throw('foo')}).toThrow('foo');
        expect(it.next()).toEqual({ value: undefined, done: true});
    })
    it('...try catch inside the generator can be used', () => {
        function *process(){
            try {
                yield 9000;
                yield 9001; 
                yield 9002;
            } catch (error) {
                
            }
        }

        let it = process();
        expect(it.next()).toEqual({ value: 9000, done: false });
        expect(it.throw('foo')).toEqual({ value: undefined, done: true });
        expect(it.next()).toEqual({ value: undefined, done: true});
    })
    it('return() terminates the iterator inside the generator', () => {
        function *process(){
            yield 9000;
            yield* [9001,9002];
            yield 9003;
        }

        let it = process();
        expect(it.next()).toEqual({ value: 9000, done: false });
        expect(it.next()).toEqual({ value: 9001, done: false });
        expect(it.return('foo')).toEqual({ value: 'foo', done: true });
        expect(it.next()).toEqual({ value: undefined, done: true});
    })
})  