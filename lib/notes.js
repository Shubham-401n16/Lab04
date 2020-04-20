
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
         };
        

    async delete(entry) {
        let delResult = await Model.delete(entry.id);
        mongoose.disconnect();
        return delResult;
    }

}

module.exports = Notes;