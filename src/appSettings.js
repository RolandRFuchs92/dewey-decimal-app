const data = window.require('../package.json');

export default new function(){
    this.appName = data.name;
    this.databaseScriptName = 'createDatabase.sql';
    this.logs= {
        error: `${this.appName}.error.log`,
        general: `${this.appName}.log`,
    }
}