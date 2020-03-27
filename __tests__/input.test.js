'use strict';
const Input = require('../lib/input.js');





describe('Input validation', () => {
    it('validate invalid flag', () =>{
        const invalidFlag = ['-w','This is a test'];
        let result = new Input(invalidFlag)
        expect(result).toThrowError('Invalid Input');

    })
    it('validate no text', () =>{
        const invalidFlag = ['-a'];
        let result = new Input(invalidFlag)
        expect(result).toThrowError('Invalid Input');

    });
});

describe('Input validation', () => {
    it('valid test', () =>{
        const validFlag = ['-a','This is a test'];
        let result = new Input(validFlag)
        expect(result).toEqual(
            {
                action: 'add',
                payload: validFlag[1],
            }
        );

    })

    it('valid test for list', () =>{
        const validFlag = ['-l','This is a test'];
        let result = new Input(validFlag)
        expect(result).toEqual(
            {
                action: 'list',
                payload: validFlag[1],
            }
        );
        it('valid test for delete', () =>{
            const validFlag = ['-d','This is a test'];
            let result = new Input(validFlag)
            expect(result).toEqual(
                {
                    action: 'list',
                    payload: validFlag[1],
                }
            );
        
        })
});



const badInputA = [];
const badInputB = ['WRONG'];
const badInputC = ['-b', 'WRONG'];
const badInputD = ['-a', ''];
const goodInput = ['-a', 'This is a note!'];

describe('the module handles bad input gracefully', () => {
    it('handles empty input', () => {
        let result = new Input(badInputA);

        expect(result.valid()).toBeFalsy();
    });

    it('handles wrong input', () => {
        let result = new Input(badInputB);
        expect(result.valid()).toBeFalsy();
    });

    it('handles wrong flag', () => {
        let result = new Input(badInputC);
        expect(result.valid()).toBeFalsy();
    });

    it('handles wrong data type', () => {
        let result = new Input(badInputD);
        expect(result.valid()).toBeFalsy();
    });
});

describe('the module handles good input gracefully', () => {
    it('handles good input for -a flag', () => {
        let result = new Input(goodInput);
        expect(result.valid()).toBeTruthy();
    });
});