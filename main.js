img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        for (i = 0; i < object.length; i++) {
           
            document.getElementById('status').innerHTML = "Status : Object Detected";
            document.getElementById('object_Detected').innerHTML = "object_Detected : "  + object.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log(" Model Loaded!")
    status = true;
    objectDetector.detect(video , gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}