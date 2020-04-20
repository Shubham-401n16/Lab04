'use strict';
const supergoose = require('@code-fellows/supergoose')

const NotesModel = require('../models/notesmodel.js');

beforeAll(async () => {
  await NotesModel.create({
    note: 'This is a test note for testing.',
    category: 'Random',
  });
});

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

    it('testing create() without category', async () => {
      let note = { 
        note: 'This is a test',    
      };
  
      let createNote = await NotesModel.create(note);
      expect(createNote.note).toStrictEqual('This is a test');
      
    });
    
  });
  
  describe('Database can delete', () => {
        it('Testing delete', async () => {
      let allNotes = await NotesModel.read();
      let _id = allNotes[1];
  
      let deleted = await NotesModel.delete(_id);
      expect(deleted.deletedCount).toStrictEqual(1);
    });
    it('testing delete with bad input', async () => {
      let deleted = await NotesModel.delete('1');
      expect(deleted).toStrictEqual(false);
    });
  });