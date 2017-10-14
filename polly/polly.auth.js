let AWS = require('aws-sdk');
let fs = require('fs');
let sampleData = require('../client/src/exampleExerciseData');
AWS.config.loadFromPath('./credentials.json');


let polly = new AWS.Polly();

let voiceType = {
    "LanguageCode": 'en-GB'
};

polly.describeVoices(voiceType, (error, data) => {
    if(error) console.log(error);
    console.log(data);
});


for(var i = 0; i < exampleExerciseData.length; i++) {
    console.log(sampleData[i]);
}



let voiceDetails = {
    "OutputFormat": "mp3",
    "Text": "string",
    "TextType": "text",
    "VoiceId": "Brian"
}

polly.synthesizeSpeech(voiceDetails, (err, data) => {
    if(err) console.log(err);
    fs.writeFile('sampletest.mp3', data.AudioStream, (err) => {
        if(err) console.log('Error saving file', err);
    });
})