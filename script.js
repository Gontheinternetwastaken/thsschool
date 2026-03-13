const fileInput = document.getElementById("fileInput");
const gameFrame = document.getElementById("gameFrame");
const gameContainer = document.getElementById("gameContainer");

fileInput.addEventListener("change", async (event) => {

const file = event.target.files[0];
if(!file) return;

const buffer = await file.arrayBuffer();
const bytes = new Uint8Array(buffer.slice(0,3));
const header = new TextDecoder().decode(bytes);

if(header === "FWS" || header === "CWS" || header === "ZWS"){
runSWF(buffer);
}else{
runHTML(buffer);
}

});

function runHTML(buffer){

gameContainer.innerHTML = "";
gameFrame.style.display = "block";

const htmlBlob = new Blob([buffer], {type:"text/html"});
const url = URL.createObjectURL(htmlBlob);

gameFrame.src = url;

}

function runSWF(buffer){

gameFrame.style.display = "none";
gameFrame.src = "";

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
