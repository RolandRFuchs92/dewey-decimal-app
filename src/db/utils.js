import {database} from '../../package.json';


export function GetColumnNames(tableName) {
    let columnData = [];
    const getData = async () => {
        const sqlite3 = window.require('sqlite3').verbose(); 
        const db = new sqlite3.Database(database);

        db.serialize(() => {
            db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
                columnData = rows.map(i => i.name);
            })
        });

        db.close();
    }

    getData();
    return columnData;
}