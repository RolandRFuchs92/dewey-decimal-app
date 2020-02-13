const data = window.require('../package.json');
const remote = window.require('electron').remote;

const appSettings =  new function(){
    this.appName = data.name;
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
        }
    };
    this.logs= {
        error: `${this.appName}.error.log`,
        general: `${this.appName}.log`,
    }
}

export default appSettings;