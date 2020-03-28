
'use strict';

const mongoose = require('mongoose');
const Model = require('../models/notesmodel.js')

class Notes {
    constructor(command) {
            if (command && command.action) this.execute(command);
            else console.error('ERROR! Invalid arguments sent to app.');

    }

   async execute(command) {
      
        switch (command.action) {
            case 'add':
               if(!command.payload){
                   console.error('Missing payload');
                   return;
               }
               this.add(command.payload, command.categoryId);
                break;
            case 'list':
                 this.list(command.payload);
                 break;
            case 'delete':
                if(!command.payload) {
                    console.error('Missing payload');
                    return;
                }
                this.delete(command.payload);
                break;
            default:
                break;
        }
    };

    async add(command) {
        let note = {notes: command.payload};
        if(command.categoryId){
            notes.categoryId = [command.categoryId];
        }
        let newNote = await Model.create(note);

        mongoose.disconnect();
         return newNote;
    }


    async list(category) {
        let allNotes =[];
        try {
            allNotes = await Model.find();
        }catch(e){
            console.error('There are no notes');
        }

        allNotes.forEach(val => {
            if(category){
                if(val.categoryId === category){
                    console.log(val.note);
                }
            }else{
                console.log(val.note)
            }

        });
        mongoose.disconnect();
     
    }

    async delete(entry) {
        if(!entry.id){

            console.error('e')
        }else {
            let deleteItem = await Model.delete(entry.id);
            if(deleteItem.deletedCount > 0)
            console.log(`Deleted item ${deleteItem}`);
            else console.log('No id to delete');
        }
        mongoose.disconnect();
    }

}

module.exports = Notes;