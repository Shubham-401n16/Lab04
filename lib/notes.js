
'use strict';

const mongoose = require('mongoose');
const Model = require('../models/notesmodel.js');

class Notes {
    constructor(input) {
        if (input.command.action) {
            this.operation(input.command);
        }else {
            console.error('ERROR! Invalid arguments sent to app.');
        }
    }

    async operation(command) {

        switch (command.action) {
            case 'add':
                return await this.add(command);
            case 'list':
                await this.list(command);
                break;
            case 'delete':
                // if (!command.payload) {
                //     console.error('Missing payload');
                //     return;
                // }
                await this.delete(command);
                break;
            default:
                break;
        }
    };

    async add(command) {
        let note = { note: command.payload };
        if (command.category) {
            note.category = [command.category];
        }
        let newNote = await Model.create(note);

        mongoose.disconnect();
        return newNote;
    }


    async list(command) {
        let allNotes = await Model.read(command.category);
        mongoose.disconnect();
        return allNotes;
        // let allNotes = [];
        //  try {
        //      let allNotes = await Model.read();
        //      mongoose.disconnect()
        //     return allNotes;
        // } catch (e) {
        //     console.error('There are no notes');
        // }

        // allNotes.forEach(val => {
        //     if (command) {
        //         if (val.category === command.category) {
        //             console.log(val.note);
        //         }
        //     } else {
        //         console.log(val.note)
        //     }

         };
        

    async delete(entry) {
        let delResult = await Model.delete(entry.id);
        mongoose.disconnect();
        // if (!entry.id) {

        //     console.error('e')
        // } else {
        //     let delResult = await Model.delete(entry.id);
        //     console.log(delResult);
        //     if (delResult.deletedCount > 0)
        //         console.log(`Deleted item ${delResult}`);
        //     else console.log('No id to delete');
        // }
        // mongoose.disconnect();
        return delResult;
    }

}

module.exports = Notes;