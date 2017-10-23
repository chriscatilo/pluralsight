(function(){
    'use strict';
    describe('for of loops', () => {
        it('It iterates an array', () => {
            let categories = ['hardware','software','vaporware'];
            let count = 0;
            for(var item of categories) {
                expect(item).toEqual(categories[count++]);
            }
        })
        it('It iterates the characters of a string', () => {
            let value = 'hardware';
            let count = 0;
            for(var item of value) {
                expect(item).toEqual(value[count++]);
            }
        })
    })
})()