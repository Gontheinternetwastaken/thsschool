const fileInput = document.getElementById("fileInput");
const gameFrame = document.getElementById("gameFrame");
const gameContainer = document.getElementById("gameContainer");

fileInput.addEventListener("change", async function(e){

const file = e.target.files[0];
if(!file) return;

const buffer = await file.arrayBuffer();
const header = new TextDecoder().decode(buffer.slice(0,3));

if(header === "FWS" || header === "CWS" || header === "ZWS"){
runSWF(file);
}else{
runHTML(file);
}

});

function runHTML(file){

gameContainer.innerHTML = "";
gameFrame.style.display = "block";

const reader = new FileReader();

reader.onload = function(){

const htmlBlob = new Blob([reader.result], {type: "text/html"});
const url = URL.createObjectURL(htmlBlob);

gameFrame.src = url;

};

reader.readAsText(file);

}

function runSWF(file){

gameFrame.style.display = "none";
gameFrame.src = "";

gameContainer.innerHTML = "";

const ruffle = window.RufflePlayer.newest();
const player = ruffle.createPlayer();

player.style.width = "800px";
player.style.height = "600px";

gameContainer.appendChild(player);

const url = URL.createObjectURL(file);
player.load(url);

}
