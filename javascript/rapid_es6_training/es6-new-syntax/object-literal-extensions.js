(function () {
    'use strict';

    describe('Object Literal Extensions', () => {
        it('Variables included in them will take on the name as field name', () => {
            let price = 5.99, quantity = 30;
            let productView = { 
                price, 
                quantity
            }
            expect(productView).toEqual({ price: 5.99, quantity: 30 });
        })
        it('Functions can be shorted without the arrow', function () {
            let productView = { 
                price: 7.99,
                quantity: 1,
                calculate() {
                    let value = this.price * this.quantity;
                    return value.toFixed(2);
                }
            }
            expect(productView.calculate()).toBe('7.99');
        })
        it('...and are treated as function and not an arrow function', function () {
            let price = 5.99, quantity = 10;
            let productView = { 
                price: 7.99,
                quantity: 1,
                calculate() {
                    let value = this.price * this.quantity;
                    return value.toFixed(2);
                }
            }
            expect(productView.calculate()).toBe('7.99');
            expect(productView.calculate()).not.toBe('59.99'); // takes the 5.99 value, not 7.99
        })
        it('...and double-quoted names can be used', () =>{
            let price = 5.99, quantity = 10;
            let productView = { 
                price,
                quantity,
                "calculate"() {
                    return (this.price * this.quantity).toFixed(2);
                }
            }
            expect(productView["calculate"]()).toBe('59.90');
        })
        it('It allows for dynamic field name', ()=> {
            let field = 'dynamicField';
            let price = 5.99;
            let productView = {
                [field + '001']: price
            }
            expect(productView).toEqual({ dynamicField001: 5.99 })
        })
        it('...and dynamic method name', ()=> {
            let method = 'doIt';
            let productView = {
                [method + '001']() {
                    return true;
                }
            }
            expect(productView.doIt001).not.toBeUndefined();
            expect(typeof productView.doIt001).toBe('function');
        })
        it('...and dynamic property name', ()=> {
            let ident = 'productId';
            let productView = {
                get [ident] () { return true; },
                set [ident] (value) { }
            }
            expect(productView.productId).toBe(true);
        })
    })

})()