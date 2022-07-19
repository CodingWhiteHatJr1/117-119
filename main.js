function setup(){
    canvas = createCanvas(650, 500);
    canvas.position(400, 250);
    background("lavender");
    canvas.mouseReleased(ClassifyCanvas);
    sinth = window.speechSynthesis;
}
function clearCanvas(){
    background("lavender");
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function ClassifyCanvas(){
    classifier.classify(canvas, gotresult);
}
function gotresult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = 'label '+results[0].label;
    document.getElementById("confidence").innerHTML = 'confidence '+ Math.round(results[0].confidence*100)+"%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    sinth.speak(utterThis);
}