(function(){
    'use strict';

    describe('Octals and Binary', () => {
        it('Octals are numbers prefixed by "0o" or "0O"', () => {
            expect(0o10).toEqual(8);
            expect(0O10).toEqual(0o10);
        })
        it('Binaries are numbers prefixed by "0b" or "0B"', () => {
            expect(0b10).toEqual(2);
            expect(0B10).toEqual(0b10);
        })
    })
})()