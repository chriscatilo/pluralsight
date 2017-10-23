(function(){
    'use strict';
    
    describe('Rest operator', () => {
        it('It converts a series of arguments to a single parameter prefixed by "..."', () => {
            let foo = (bar, ...bax) => {
                return bax;
            }
            let value = foo(1, 2, 3, 4);
            expect(value instanceof Array).toBe(true);
            expect(value).toEqual([2,3,4]);

            value = foo();
            expect(value instanceof Array).toBe(true);
            expect(value).toEqual([]);
        })
        it('The parameter length of the function does not include it', () => {
            let foo = (bar, qux, ...bax) => {
                return bax;
            }
            expect(foo.length).toBe(2);
        })
        it('...but they are included in the arguments count inside the function', () => {
            let foo = function (bar, ...bax) {
                expect(arguments.length).toBe(4);
            }
            foo(1, 2, 3, 4);
        })
        it('...unless the function is an arrow function', () => {
            let foo = (bar, ...bax) => {
                expect(arguments.length).not.toBe(4);
                expect(arguments.length).toBe(0);
            }
            foo(1, 2, 3, 4);
        })
        it('Also works in dynamic functions', () => {
            let foo = new Function("...bar", "return bar;");
            let value = foo(1, 2, 3, 4);
            expect(value instanceof Array).toBe(true);
            expect(value).toEqual([1,2,3,4]);
        })
    })

    describe('Spread operator', () => {
        it('It inverts an array to a series of arguments with a single parameter', () => {
            let prices = [12,29,18];
            let maxPrice = Math.max(...prices);
            expect(maxPrice).toBe(29);
        })
        it('It can be used to create a new array', () => {
            {

                let prices = [12,29,18];
                let newArray = [...prices];
                expect(newArray).toEqual(prices);
            }
            {
                let foo = Array(...[,,]);
                expect(foo).toEqual([undefined,undefined]);
            }
        })
        it('It will breakdown a string to its individual characters', () => {
             let maxCode = Math.max(..."43210");
             expect(maxCode).toBe(4);
        })
        it('It can be used inbetween elements of an array', () => {
            let codeArray = ['A',...'BCD', 'E'];
            expect(codeArray).toEqual(['A','B','C','D','E']);
        })
    })
})();