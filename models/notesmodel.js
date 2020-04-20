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

    async read(category) {
        let allNotes = await this.model.find();
        try {
            if(category){
              allNotes = allNotes.filter(notes => {
                  return notes.category.includes(category);
                });
            }
            if(allNotes.length < 1){
                console.log('No notes');
            }
    
        } catch (e) {
            console.log('---ERROR READING RECORD---');
            return false;
        }
        allNotes.forEach(notes => {
            console.log(`note : ${notes.note} , id : ${notes._id}`)
        });
        return allNotes;
    }


    async update(_id, changedRecord) {
        return await this.model.updateOne({_id}, changedRecord);
    }

    async delete(_id) {
        try{
                let deleteOne = await this.model.deleteOne({_id});
                if(!deleteOne.deletedCount) throw 'err'
                else console.log(`Deleted note : ${deleteOne.deletedCount}`)
                return deleteOne;
        }catch(e){
            console.error('No Id to delete');
            return false;
        }
            
    
    }
}

let NotesModel = new Model(notesMongooseModel);

module.exports = NotesModel;