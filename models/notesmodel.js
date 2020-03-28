'use strict';
const mongoose = require('mongoose');
const notesMongooseModel = require('./notes-schema.js');

class Model {
    constructor(mongooseModel) {
        this.model = mongooseModel;
    }

    async create(record) {
        try {
            let recordToAdd = new this.model(record);
            return await recordToAdd.save();
        } catch (e) {
            console.error('---ERROR CREATING RECORD---');
            return false;
        }
    }

    async read(_id) {
        // first, validate that this is an id
        let allNotes = await this.model.find();
        try {
            if (!typeof _id === mongoose.ObjectId) throw 'err';
            let foundRecords = await this.model.find({ _id });
            if (foundRecords.length) return foundRecords[0];
            else throw 'err';
        } catch (e) {
            console.log('---ERROR READING RECORD---');
            return false;
            // allNotes.forEach(element =>{
            //     console.log(`Notes : ${element.notes} , NotesId : ${element._id}`)
            // })
            // return allNotes
        }
    }


    async update(_id, changedRecord) {
        return this.model.updateOne(id, changedRecord, { new: true });
    }

    async delete(_id) {

        let deleteOne = await this.model.deleteOne({_id});
        if(!deleteOne.deletedCount) throw 'err'
        else console.log(`Deleted noted : ${deleteOne}`)
    }
}

let NotesModel = new Model(notesMongooseModel);

module.exports = NotesModel;