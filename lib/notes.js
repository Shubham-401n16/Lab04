
'use strict';

const mongoose = require('mongoose');
const Model = require('../models/notesmodel.js')

class Notes {
    constructor(input) {
            if (input.command.action) this.execute(input.command);
            else console.error('ERROR! Invalid arguments sent to app.');

    }

   async execute(command) {
      
        switch (command.action) {
            case 'add':
               return await this.add(command);
            case 'list':
                 await this.list(command);
                 break;
            case 'delete':
                if(!command.payload) {
                    console.error('Missing payload');
                    return;
                }
                await this.delete(command);
                break;
            default:
                break;
        }
    };

    async add(command) {
        let note = {notes: command};
        if(command.categoryId){
            notes.categoryId = [command.categoryId];
        }
        let newNote = await Model.create(note);

        mongoose.disconnect();
         return newNote;
    }


    async list(command) {
        let allNotes =[];
        try {
            allNotes = await Model.find();
        }catch(e){
            console.error('There are no notes');
        }

        allNotes.forEach(val => {
            if(command){
                if(val.categoryId === command){
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
            let delResult = await this.model.deleteOne({_id});
            console.log(delResult);
            //let deleteItem = await Model.delete(entry.id);
            if(delResult.deletedCount > 0)
            console.log(`Deleted item ${delResult}`);
            else console.log('No id to delete');
        }
        mongoose.disconnect();
    }

}

module.exports = Notes;