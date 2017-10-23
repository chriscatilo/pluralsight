(function(){
    'use strict';

    describe('String template literals', () => {
        it('The `${}` is used to interpolate symbols to create a string value', () => {
            let invoiceNum = 1350;
            expect(`Invoice Number: ${invoiceNum}`).toEqual('Invoice Number: 1350')
        })
        it('\$ is interpreted as a literal dollar sign', () => {
            let invoiceNum = 1350;
            expect(`Invoice Number: \${invoiceNum}`).toEqual('Invoice Number: ${invoiceNum}')
        })
        it('Carriage returns can be inside \`', () => {
            let message = `A
B
C`;
            expect(message).toEqual('A\nB\nC')
        })  
        it('Expressions are allowed inside ${}', () => {
            let invoiceNum = 1350;
            expect(`Invoice Number: ${"INV-" + invoiceNum}`).toEqual('Invoice Number: INV-1350')
        })
        it('Tagged template literals allow you to parse template literals with a function', () => {
            function processInvoice(textSegments, ...values) {
                
                expect(textSegments).toEqual(['Invoice: ',' for ', '']);
                expect(values).toEqual([1350,2000]);
            }

            let invoiceNum = 1350, amount = 2000;
            processInvoice `Invoice: ${invoiceNum} for ${amount}`;
        })
    }) 
})()