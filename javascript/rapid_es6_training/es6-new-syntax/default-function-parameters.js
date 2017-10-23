(function(){
    'use strict';
    describe('Default function parameters', () => {
        it('They allow for function parameters to be initialized on entry to the block', function(){
            let getProduct = function (productId = 1000) {
                 return productId;
            }
            expect(getProduct()).toBe(1000);
        })
        it('...even if you pass an undefined argument', () => {  
            let getProduct = function (productId = 1000) {
                return productId;
           }
           expect(getProduct(undefined)).toBe(1000);
        })
        it('Arguments of parameters can be accessed by an undefined parameters', function() { 
            let getTotal = (price, tax = price * 0.07) => price + tax; 
            expect(getTotal(5.00)).toBe(5.35);
        })
        it('... but not by a null or NaN parameter', function() { 
            let getTotal = (price, tax = price * 0.07) => price + tax; 
            expect(getTotal(5.00,null)).not.toBe(5.35);
            expect(getTotal(5.00,null)).toBe(5);
            expect(getTotal(5.00,NaN)).not.toBe(5.35);
            expect(getTotal(5.00,NaN)).toBeNaN();
        })
        it('Their constructs can include variables within it\'s context', () => {
            let baseTaxRate = 0.07;            
            let getTotal = (price, tax = price * baseTaxRate) => price + tax; 
            expect(getTotal(5.00)).toBe(5.35);
        })
        it('...and functions', () => {
            let getBaseTaxRate = () => 0.07;            
            let getTotal = (price, tax = price * getBaseTaxRate()) => price + tax; 
            expect(getTotal(5.00)).toBe(5.35);
        })
        it('Arguments still refers to the number of arguments passed', () => {
            let getTotal = function (price, tax = price * 0.07) {
                expect(arguments.length).toBe(1);
                return price + tax;
            }; 
            getTotal(5.00);
        })
        it('...unless you are using arrow functions (as it will refer to the function context)', () => {

            var context = function(foo, bar) {
                let getBaseTaxRate = () => 0.07;            
                let getTotal = (price, tax = price * 0.07) => {
                    expect(arguments.length).not.toBe(1);
                    expect(arguments.length).toBe(2);
                    return price + tax;
                }; 
                getTotal(5.00);
            }
            context('foo', 'bar')
        })

        it('Prior defaults cannot access subsequent defaults', () => {
            let getTotal = (price = adjustment, adjustment = 1.00) => {
                return price + adjustment;
            }
            expect(function() { getTotal(); }).toThrow(new ReferenceError('adjustment is not defined'));
        })
        it('...but overriding such arguments is OK', () => {
            let getTotal = (price = adjustment, adjustment = 1.00) => {
                return price + adjustment;
            }
            expect(function() { getTotal(5.00); }).not.toThrow(new ReferenceError('adjustment is not defined'));
            expect(getTotal(5.00)).toBe(6);
        })
        it('They also work with dynamic functions', () => {
            let getTotal = new Function('price = 20.00', 'return price');
            expect(getTotal()).toBe(20);
        }) 
    })
})()