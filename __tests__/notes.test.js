'use strict';

const Notes = require('../lib/notes.js');
 describe('Validate Notes',() => {
     it('Test if add is working', ()=>{
         let note = new Notes({action:'add', payload: 'text'});
         const spy = jest.spyOn(console, 'log');
         const testObj = {
             action : 'add',
             payload: 'This is a test'
         };
         note(testObj);
         expet(console.log).toHaveBeenCalled();
     });

     it('Test if add is working', ()=>{
        let note = new Notes({action:'add', payload: 'text'});
        const spy = jest.spyOn(console, 'log');
        const testObj = {
            action : 'test',
            payload: 'This is a test'
        };
        note(testObj);
        expet(console.log).not.toHaveBeenCalled();
    });
 });