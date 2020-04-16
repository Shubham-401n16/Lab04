'use strict';

const minimist = require('minimist');

class Input {
    constructor() {

        this.args = minimist(process.argv.slice(2));

          this.command = {};

        Object.entries(this.args).forEach(key => {

            switch (key[0]) {
                case 'a':
                case 'add':
                    this.command = { action: 'add', payload: key[1]};
                    break;
                case 'c':
                case 'category':
                    this.command.category = key[1];
                    break;
                case 'l':
                case 'list':
                    this.command = {
                        action: 'list',
                        category: key[1]
                    };
                    break;
                case 'd':
                case 'delete':
                    this.command = {
                        action: 'delete',
                        id: key[1]
                    };
                    break;
                default:
                    break;
            }
        });

    }


}


module.exports = Input;