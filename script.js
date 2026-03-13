const fileInput = document.getElementById("fileInput");
const gameFrame = document.getElementById("gameFrame");
const gameContainer = document.getElementById("gameContainer");

fileInput.addEventListener("change", async (event) => {

const file = event.target.files[0];
if(!file) return;

const buffer = await file.arrayBuffer();
const header = new TextDecoder().decode(buffer.slice(0,3));

if(header === "FWS" || header === "CWS" || header === "ZWS"){
runSWF(buffer);
}else{
runHTML(buffer);
}

});

function runHTML(buffer){

gameContainer.innerHTML = "";

const htmlText = new TextDecoder().decode(buffer);

gameFrame.style.display = "block";
gameFrame.srcdoc = htmlText;

}

function runSWF(buffer){

gameFrame.style.display = "none";
gameFrame.srcdoc = "";

gameContainer.innerHTML = "";

const swfBlob = new Blob([buffer], {type:"application/x-shockwave-flash"});
const url = URL.createObjectURL(swfBlob);

const ruffle = window.RufflePlayer.newest();
const player = ruffle.createPlayer();

player.style.width = "800px";
player.style.height = "600px";

gameContainer.appendChild(player);

player.load(url);

}
