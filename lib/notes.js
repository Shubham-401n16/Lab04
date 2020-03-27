
'use strict';

const NotesModel = require('../models/notes-schema.js');
const mongoose = require('mongoose');

class Notes {
    constructor(command) {
            if (command && command.action) this.execute(command);
            else console.error('ERROR! Invalid arguments sent to app.');

    }

    execute(command) {
      
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

    async add(input, category) {
        try{

            let newNote = new NotesModel({
                note: input,
                categoryId: category ? category : '',
            });
            await newNote.save();
            mongoose.disconnect();
        }catch(e){
            console.error('Error adding note');
        }
    }

    async list(category) {
        let allNotes =[];
        try {
            allNotes = await NotesModel.find();
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
            let deleteItem = await NotesModel.delete({_id: entry.id});
            if(deleteItem.deletedCount > 0)
            console.log(`Deleted item ${deleteItem}`);
            else console.log('No id to delete');
        }
        mongoose.disconnect();
    }

}

module.exports = Notes;