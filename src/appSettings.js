const data = window.require('../package.json');
const remote = window.require('electron').remote;

const appSettings =  new function(){
    this.appName = data.name;
    this.databaseName = `${this.appName}.Database`;
    this.databaseScriptName = 'createDatabase.sql';
    this.transitionDuration = 400;
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
        dewey_decimal: {
            pk: 'dewey_decimal_id',
            name: 'dewey_decimal'
        },
        book: {
            pk: `book_id`,
            name: `book`
        },
        books_out: {
            pk: `books_out_id`,
            name: 'books_out'
        },
        student: {
            pk: 'student_id',
            name: 'student'
        }
    };
    this.logs= {
        error: `${this.appName}.error.log`,
        general: `${this.appName}.log`,
    }
}

export default appSettings;