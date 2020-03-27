'use strict';

const minimist = require('minimist');

class Input {
    constructor(args) {

        this.command = {};

        let formatted = minimist(args);
        console.log('formatted', formatted);

        let objectKeyArray = Object.keys(formatted);

        objectKeyArray.forEach(key => {

            switch (key) {
                case 'a':
                case 'add':
                    this.command = { action: 'add', payload: formatted[key], categoryId: false };
                    break;
                case 'c':
                case 'category':
                    this.command.categoryId = typeof formatted[key] === 'string'
                        ? formatted[key]
                        : false;
                    break;
                case 'l':
                case 'list':
                    this.command = {
                        action: 'list',
                        payload:
                            typeof formatted[key] === 'string'
                                ? formatted[key]
                                : false,
                    };
                    break;
                case 'd':
                case 'delete':
                    this.command = {
                        action: 'delete',
                        payload:
                            typeof formatted[key] === 'string'
                                ? formatted[key]
                                : false,
                    };
                    break;
                default:
                    break;
            }
        });

    }


}


module.exports = Input;