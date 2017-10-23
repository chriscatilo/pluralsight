//<reference path='/node_modules/jasmine-core/jasmine-core.js'/>
(function () {
    'use strict';
    describe("The let keyword", function () {
        it("When a variable is not declared, it returns a ReferrenceError.", function () {
            expect(function () {
                console.log(foo);
            }).toThrow(new ReferenceError('foo is not defined'));
        })
        it("Hoisting is a bad thing - it allows variable to be declared after it is used.", function () {
            expect(function () {
                console.log(foo);
                var foo;
            }).not.toThrow(new ReferenceError('foo is not defined'));
        })
        it('They are used to declare a variable similar to "var"', function () {
            var foo = 1;
            expect(foo).toBe(1);
            let bar = 2;
            expect(bar).toBe(2);
            let baz;
            expect(baz).toBeUndefined();
        })
        describe('...but it prevents hoisting', function () {
            it('when variable is declared after it is used', function () {
                expect(function () {
                    console.log(foo);
                }).toThrow(new ReferenceError('foo is not defined'));
                let foo;
            })
            it('when used with blocked scope', function () {
                {
                    let foo;
                    var bar;
                }
                expect(bar).toBeUndefined();
                expect(function () {
                    console.log(foo)
                }).toThrow(new ReferenceError('foo is not defined'));
            })
        })
        describe('...is closure safe', function () {
            let time = [];
            let iterations = 200000;
            it('with "var" the same variable declared in the for loop is used', function () {
                var start = Date.now();
                let list = [];
                for (var i = 0; i < iterations; i++) {
                    list.push(function () { return i; })
                }
                time.push(Date.now() - start);
                expect(list[0]()).toBe(iterations);
            })

            it('with "let", the variable is created for each loop', function () {
                var start = Date.now();
                let list = [];
                for (let i = 0; i < iterations; i++) {
                    list.push(function () { return i; })
                }
                expect(list[0]()).toBe(0);
                time.push(Date.now() - start);
            })

            it('but let is slower than var', function () {
                expect(time[1]).toBeGreaterThan(time[0]);
                console.log(time);
            })
        })
    })
    describe('The const keyword', function () {
        it('They create an immutable value', function () {
            const FOO = 1;
            expect(FOO).toBe(1);
            expect(function () {
                FOO = 2;
            }).toThrow(new TypeError('Assignment to constant variable.'))
        })
        it('They can be declaratio inside a block scope to substitute the declaration outsie the scope', function () {
            const FOO = 1;
            {
                const FOO = 2;
                expect(FOO).toBe(2);
            }
            expect(FOO).toBe(1);
        })
    })
})()