let AWS = require('aws-sdk');
let fs = require('fs');

AWS.config.loadFromPath('./credentials.json');

let exercises = [
    {
        "name": "High_Knees",
        "description": "Begin jogging in place, lifting the knees as high as you can. Try to lift your knees up to hip level but keep the core tight to support your back. For a more advanced move, hold your hands straight at hip level and try to touch the knees to your hands as you lift them.Bring the knees towards your hands instead of reaching the hands to the knees!"
    },
    {
        "name": "Cat_Cow",
        "description": "Kneel on a mat with your hands and knees shoulder-width apart.Pull your abs in, hunch your back up and flex your spine.Hold the stretch and then release to the starting position."
    },
    {
        "name": "Hip_Circles",
        "description": "Stand tall with your chest up. Move your feet to shoulder-width apart. Place your hands on your hips.Begin the movement by shifting your hips to the left. Bring them forward and to the right in a circular motion. From the right, shift your hips back and to the left.Continue in this circular motion. Stop once to switch directions."
    },
    {
        "name": "Flutter_kicks",
        "description": "Lie on a mat with your hands under your buttocks and raise your legs slightly, keeping knees straight and ankles together.Keep abs engaged and perform short kicks in an alternating fashion.Repeat as needed and then lower legs to the ground."
    },
    {
        "name": "Plank",
        "description": "Get into a face down position on the floor supporting your upper body on your forearms. Your elbows should be bent at 90 degrees.Extend your legs straight out behind you, supporting them on your toes and balls of your feet.Keep your body in a straight line by tightening your abdominal and oblique muscles."
    },
    {
        "name": "Plank_Knee_to_Elbow",
        "description": "Lay face down on the ground with extended legs.Point your toes while you place your hands beneath your shoulders.Push yourself up into the plank position.Maintaining a tight core and flat back, bring your left knee to your right elbow.Pause and slowly return each to the starting point.Repeat with the other side and keep alternating."
    },
    {
        "name": "Windshield_Wipers",
        "description": "Lie on an exercise mat, keeping your back flat with no arching of the spine.Extend your arms out beside you at shoulder level, with your palms pressed firmly to the floor. Your upper body should form a shape. Raise your feet off the floor by bending your hips and knees to 90 degree angles. This is the start position.As you exhale, rotate both your thighs to one side until the outer thigh touches the ground or until you feel a stretch in your abs and lower back.Pause briefly, then rotate to the other side without pausing in the start position.When you have rotated to both sides, that is one repetition."
    },
    {
        "name": "Reverse_Crunch",
        "description": "Lie flat on an exercise mat on the floor.Extend your legs fully and place your hands palms down, flat on the floor beside you.Keeping your feet together, draw your knees up towards your chest, until your thighs are at 90 degrees to the floor and your calves are parallel to it. This is the start position.As you inhale, curl your hips up off the floor while bringing your knees further towards your chest.Continue the movement until your knees are touching your chest, or as far as comfortable.Hold for a count of one.In a controlled movement, return your legs to the start position, exhaling as you do so.Repeat."
    },
    {
        "name": "Sit_Ups",
        "description": "Lie with knees bent and feet flat on the floor. You can have someone hold your feet or place them under something to keep them steady.Place your hands behind your head, elbows pointing out.Engage your abs and lift your head, neck and shoulders up. Pretend you are holding a small ball under your chin.Hold and then return to starting position."
    },
    {
        "name": "Standing_Cross-Body_Crunches",
        "description": "Standing up straight, bring your hands behind your head so that your elbows are pointed to the sides.Twisting your body, bring your left elbow down and across your body. At the same time, raise your right knee up and across to meet the left elbow.Return to the starting position.Repeat on the other side and continue alternating."
    }
]



let polly = new AWS.Polly();

let voiceType = {
    "LanguageCode": 'en-GB'
};

polly.describeVoices(voiceType, (error, data) => {
    if(error) console.log(error);
});



for(var i = 0; i < exercises.length; i++) {
    let exerciseName = exercises[i].name;
    let voiceDetails = {
        "OutputFormat": "mp3",
        "Text": `${exercises[i].description}`,
        "TextType": "text",
        "VoiceId": "Brian"
    };

    polly.synthesizeSpeech(voiceDetails, (err, data) => {
        if(err) console.log(err);
        fs.writeFile(`../client/public/audio/${exerciseName}.mp3`, data.AudioStream, (err) => {
            if(err) console.log('Error saving file', err);
        });
    })
}









