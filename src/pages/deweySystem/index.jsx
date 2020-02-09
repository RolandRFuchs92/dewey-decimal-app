import React from 'react';


export default () => {
    debugger;
    window.require('fs').readFile('/index.jsx', (err, data) => {console.log(data)});
    return <h1> dewey System page</h1>
}