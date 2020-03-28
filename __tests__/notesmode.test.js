'use strict';
const supergoose = require('@code-fellows/supergoose')

const NotesModel = require('../models/notesmodel.js');

describe('Model Test', () => {
    it('create record', async () => {
      let note = { 
        note: 'This is a test', 
        category: 'random'
      };
      let createNote = await NotesModel.create(note);
  
      expect(createNote.note).toStrictEqual('This is a test');
    });
  
    it('testing create() with bad input', async () => {
      let note = { 
        category: 'random',    
      };
  
      let createNote = await NotesModel.create(note);
      expect(createNote).toStrictEqual(false);
    });
  
  });