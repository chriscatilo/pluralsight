(function () {
    'use strict';
    describe("Arrow Functions", function () {
        it('Uses => notation as shorthand to a function', function () {
            let getFoo = () => { };
            expect(typeof getFoo).toBe('function');
        })
        it('It can return a value immediately', function () {
            let getFoo = () => "bar";
            expect(getFoo()).toBe('bar');
        })
        it('It can accept zero or more parameters', function () {
            let getTotalPrice = (price, discount, tax) => {
                let value = price * (1 + discount) * (1 + tax);
                return Math.round(value, 2);
            }
            expect(getTotalPrice(100, 0.10, 0.10)).toBe(121);
        })
        it('While "this" inside a function refers to the object that encapsulates the function', function () {
            {
                let foo = function () { };
                let bar = new foo();
                foo.prototype.test = function () {
                    expect(this).toBe(bar);
                }
                bar.test();
            }
            {
                var invoice = {
                    number: 123,
                    process: function () {
                        return this.number;
                    }
                }
                expect(invoice.process()).toBe(123);
            }
        })
        it('..."this" inside an arrow function refers to the "function context" i.e. the last ancestor that encapulated by "function()"', function () {
            {
                let theContext = function () {
                };
                theContext.test = function () {
                    let foo = function () { };
                    let bar = new foo();
                    foo.prototype.test = () => {
                        expect(this).not.toBe(bar);
                        expect(this).toBe(theContext);
                    }
                    bar.test();
                }
                theContext.test();
            }
            {
                var invoice = {
                    number: 123,
                    process: () => {
                        return this.number;
                    }
                }
                expect(invoice.process()).not.toBe(123);
                expect(invoice.process()).toBe(undefined);
            }
            {
                var invoice = {
                    number: 123,
                    process: function() {
                        return (()=>this.number)();
                    }
                }
                expect(invoice.process()).toBe(123);
            }
        })
        it('While a bind can work with a function', function(){
            {
                let invoice = {
                    number: 123,
                    process: function () {
                        return this.number;
                    }
                }
                expect(invoice.process()).toBe(123);
                let newInvoice = { 
                    number: 456
                }
                let value = invoice.process.bind(newInvoice)
                expect(value()).toBe(456);
            }
        })
        it('...they cannot be bound to another object', function(){
            {
                let invoice = {
                    number: 123,
                    process: () => {
                        return this.number;
                    }
                }
                expect(invoice.process()).toBe(undefined);
                let newInvoice = { 
                    number: 456
                }

                let getValue = invoice.process.bind(newInvoice)
                expect(getValue()).not.toBe(456);
                expect(getValue()).toBe(undefined);

                expect(invoice.process.call(newInvoice)).not.toBe(456);
                expect(invoice.process.call(newInvoice)).toBe(undefined);
            }
        })
        it('They don\'t have a "prototype" property', () => {
            let foo = () => 'bar';
            expect(foo.hasOwnProperty('prototype')).toBe(false);
        })
    }) 
})()