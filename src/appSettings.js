const data = window.require('../package.json');
const remote = window.require('electron').remote;

const appSettings =  new function(){
    this.appName = data.name;
    this.databaseName = `${this.appName}.Database`;
    this.databaseScriptName = 'createDatabase.sql';
    this.transitionDuration = 800;
    this.fadeTransitionDuration = this.transitionDuration;
    this.slideTransitionDuration = this.transitionDuration;
    this.tables= {
        author: {
            pk: 'author_id',
            name: 'author'
        },
        dewey_summary_2: {
            pk: `dewey_summary_2_id`,
            name: `dewey_summary_2`
        },
        dewey_summary_3: {
            pk: `dewey_summary_3_id`,
            name: `dewey_summary_3`
        },
        book: {
            pk: `book_id`,
            name: `book`
        },
        bookOut: {
            pk: `books_out_id`,
            name: 'books_out'
        }
    };
    this.logs= {
        error: `${this.appName}.error.log`,
        general: `${this.appName}.log`,
    }
}

export default appSettings;