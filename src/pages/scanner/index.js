import React, { useEffect} from 'react';
import Quagga from 'quagga';

export default ({onDetected, open}) => {

    if(!open)
        return null;

    useEffect(()=>{
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : [ "code_128_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(onDetected);
        return () => Quagga.offDetected(onDetected);
    },[]);


    return (
        <div id="interactive" className="viewport"/>
    ); 
}