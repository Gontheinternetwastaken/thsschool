// References to DOM elements
const fileInput = document.getElementById("fileInput");
const gameFrame = document.getElementById("gameFrame");
const gameContainer = document.getElementById("gameContainer");
const fullscreenBtn = document.getElementById("fullscreenBtn");

// Handle file upload
fileInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];
    if(!file) return;

    const buffer = await file.arrayBuffer();
    const header = new TextDecoder().decode(buffer.slice(0,3));

    if(header === "FWS" || header === "CWS" || header === "ZWS"){
        runSWF(buffer);
    } else {
        runHTML(buffer);
    }

});

// Run HTML games
function runHTML(buffer){

    // Clear SWF container
    gameContainer.innerHTML = "";

    const htmlText = new TextDecoder().decode(buffer);

    gameFrame.style.display = "block";
    gameFrame.srcdoc = htmlText; // Ensures browser renders the HTML

}

// Run SWF games using Ruffle
function runSWF(buffer){

    // Hide iframe
    gameFrame.style.display = "none";
    gameFrame.srcdoc = "";

    // Clear container
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

// Fullscreen button functionality
fullscreenBtn.addEventListener("click", () => {

    let elem = null;

    if(gameFrame.style.display !== "none"){
        elem = gameFrame; // HTML game
    } else if(gameContainer.children.length > 0){
        elem = gameContainer; // SWF game
    }

    if(elem){
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

});
