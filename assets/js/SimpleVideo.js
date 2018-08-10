
class SimpleVideo extends HTMLVideoElement{

  constructor() {
		super(); // always call super() first in the constructor.
		this.frameRate = 25.0;
  }
  
  setSrc(src) {
    this.src = src;
  }

  togglePlayPause() {
    if (this.paused) {
      this.play()
    } else {
      this.pause();
    }
  }

  /*
   * Public API MediaTrack simplifications
   */
  addTrack(id, config = {
    kind: 'subtitles',
    label: null,
    language: null,
    mode: 'showing',
    cuechange: null
  }) {
    // needs to be a real element, to be able to remove it until there is an api removeTextTrack()
    let trackElement = document.createElement('track');
    trackElement.setAttribute('id', id);

    if (config.kind) { trackElement.setAttribute('kind', config.kind); }
    if (config.label) { trackElement.setAttribute('label', config.label); }
    if (config.language) { trackElement.setAttribute('srcLang', config.language); }

    this.appendChild(trackElement);

    // trackElement.track options needs to be set after the element is added to the video
    if (config.mode) { trackElement.track.mode = config.mode; }
    if (config.id) { trackElement.track.id = id; }
    if (config.cuechange) { trackElement.track.addEventListener('cuechange', config.cuechange, false); }

    return trackElement;
  }

  removeTrack(id) {
    let track = this.querySelector('#' + id);
    if (track) {
      this.removeChild(track);
      console.log('deleted:', track);
    }
  }

  removeAllTracks() { }

  /*
   * Public API FrameAcurate simplifications
   */
  get currentFrame() {
		return Math.floor(this.currentTime * this.frameRate)
	}

	get totalFrames() {
		return Math.round(this.duration * this.frameRate)
	}

	set currentFrame(frame) {

		if(Number.isInteger(frame)){
			// point to the middle of a frame
			frame = Math.floor(frame) + 0.5; 
		}
		this.currentTime = (frame / this.frameRate);
		//console.log('frame: ', this.currentFrame, ' from: ', this.totalFrames);
	}
}

customElements.define('sport-player', SimpleVideo, {extends: 'video'});
