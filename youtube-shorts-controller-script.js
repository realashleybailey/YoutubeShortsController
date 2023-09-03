console.log("Youtube shorts controller loaded");

// handle control inputs
document.addEventListener("keydown", (e) => {
	// if in search field, return
	if (document.activeElement.id === "search") return;

	// get key pressed and short element to manipulate
	cmd = e.key;
	currentShort = document.querySelector("#shorts-player > div.html5-video-container > video");
	if (!currentShort) {
		console.log("Youtube short not detected");
		return;
	}

	// controls
	switch (cmd) {
		// Rewind
		case 'ArrowLeft':
			currentShort.currentTime -= 2.5;
			break;

		// Fast-Forward
		case 'ArrowRight':
			currentShort.currentTime += 2.5;
			break;
		
		// Decrease Playback Speed
		case '<':
			currentShort.playbackRate -= .25;
			break;

		// Increase Playback Speed
		case '>':
			currentShort.playbackRate += .25;
			break;
		
		// Reset Playback Speed
		case 'r':
			currentShort.playbackRate = 1;
			break;
		
		// Toggle Mute
		case 'm':
			currentShort.muted = !currentShort.muted;
			break;
		
		// Toggle Play/Pause
		case ' ':
			if (currentShort.paused) currentShort.play();
			else currentShort.pause();
			break;
		
		// Toggle Fullscreen
		case 'f':
			currentShort.requestFullscreen();
			break;
		
		// Toggle Loop
		case 'l':
			currentShort.loop = !currentShort.loop;
			break;
		
		// Toggle Picture-in-Picture
		case 'p':
			currentShort.requestPictureInPicture();
			break;
		
		// 1-9: Jump to 10-90% of video
		case '1':
			currentShort.currentTime = currentShort.duration * .1;
			break;
		case '2':
			currentShort.currentTime = currentShort.duration * .2;
			break;
		case '3':
			currentShort.currentTime = currentShort.duration * .3;
			break;
		case '4':
			currentShort.currentTime = currentShort.duration * .4;
			break;
		case '5':
			currentShort.currentTime = currentShort.duration * .5;
			break;
		case '6':
			currentShort.currentTime = currentShort.duration * .6;
			break;
		case '7':
			currentShort.currentTime = currentShort.duration * .7;
			break;
		case '8':
			currentShort.currentTime = currentShort.duration * .8;
			break;
		case '9':
			currentShort.currentTime = currentShort.duration * .9;
			break;
		
		// 0: Jump to 100% of video
		case '0':
			currentShort.currentTime = currentShort.duration;
			break;
		
		// ?: Show controls
		case '?':
			console.log("Youtube Shorts Controller Controls");
			console.log("===================================");
			console.log("Space: Play/Pause");
			console.log("ArrowLeft: Rewind 2.5s");
			console.log("ArrowRight: Fast-Forward 2.5s");
			console.log("<: Decrease Playback Speed by 0.25");
			console.log(">: Increase Playback Speed by 0.25");
			console.log("r: Reset Playback Speed to 1");
			console.log("m: Toggle Mute");
			console.log("f: Toggle Fullscreen");
			console.log("l: Toggle Loop");
			console.log("p: Toggle Picture-in-Picture");
			console.log("1-9: Jump to 10-90% of video");
			console.log("0: Jump to 100% of video");
			console.log("?: Show controls");
			break;
	}
});

// returns ui element for manipulating timestamp/playback elements
// if ui element doesn't exist yet, we return the short container to create a new ui
const getUIEl = () => {
	const currentShortContainer = document.querySelector("#shorts-player > div.html5-video-container > video").closest("ytd-reel-video-renderer");

	const currentShortUI = currentShortContainer
							.querySelector("div.overlay.style-scope.ytd-reel-video-renderer")
							.querySelector("ytd-reel-player-overlay-renderer")
							.querySelector("div#overlay")
							.querySelector("div#progress-bar")
							.querySelector("div#youtube-shorts-controller-ui");

	if(!currentShortUI) return currentShortContainer;
	return currentShortUI;
}

// update ui every 500ms
ytShortEl = null;
setInterval(() => {
	// if yt short element is not loaded in DOM yet, return
	// if yt short element is loaded in DOM, but not saved, set ytShortEl to video element
	if (!document.querySelector("#shorts-player > div.html5-video-container > video")) return;
	if (!ytShortEl) ytShortEl = document.querySelector("#shorts-player > div.html5-video-container > video"); 

	// get youtube-shorts-controller-ui elemenet if exists and update timestamp/playback,
	// else create elements
	const uiEl = getUIEl();
	if (uiEl.id == "youtube-shorts-controller-ui") {
		// set playback rate
		const playbackRateText = uiEl.childNodes[0];
		playbackRateText.innerText = `x${ytShortEl.playbackRate}`;

		// set timestamp
		const timestampText = uiEl.childNodes[1];
		timestampText.innerText = `${ytShortEl.currentTime.toFixed(0)}s`;
	} else {
		// get youtube progress bar div for current short
		const progBar = uiEl.querySelector("div.overlay.style-scope.ytd-reel-video-renderer")
							.querySelector("ytd-reel-player-overlay-renderer")
							.querySelector("div#overlay")
							.querySelector("div#progress-bar");
		
		// create playback/timestamp elements in container
		const uiContainer = document.createElement("div");
		uiContainer.id = "youtube-shorts-controller-ui"

		const playbackRateText = document.createElement("p");
		playbackRateText.id = "youtube-shorts-controller-playback-rate-text";
		uiContainer.appendChild(playbackRateText);
		
		const timestampText = document.createElement("p");
		timestampText.id = "youtube-shorts-controller-timestamp-text";
		uiContainer.appendChild(timestampText);

		progBar.insertBefore(uiContainer, progBar.firstChild);
	}

}, 250);