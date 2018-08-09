
class SimpleVideo {

  constructor(config = {
    player: null,
    controls: {},
    frameRate: 30.0
  }) {
    this._setConfig(config)
  }


  /*
   * Public API
   */

  setSrc(src) {
    this.player.src = src;
  }

  togglePlayPause() {
    if (this.player.paused) {
      this.player.play()
    } else {
      this.player.pause();
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

    this.player.appendChild(trackElement);

    // trackElement.track options needs to be set after the element is added to the video
    if (config.mode) { trackElement.track.mode = config.mode; }
    if (config.id) { trackElement.track.id = id; }
    if (config.cuechange) { trackElement.track.addEventListener('cuechange', config.cuechange, false); }

    return trackElement;
  }

  removeTrack(id) {
    let track = this.player.querySelector('#' + id);
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
		return Math.floor(this.player.currentTime * this.frameRate)
	}

	get totalFrames() {
		return Math.round(this.player.duration * this.frameRate)
	}

	set currentFrame(frame) {

		if(Number.isInteger(frame)){
			// point to the middle of a frame
			frame = Math.floor(frame) + 0.5; 
		}
		this.player.currentTime = (frame / this.frameRate);
		//console.log('frame: ', this.currentFrame, ' from: ', this.totalFrames);
	}



  /*
    initialisation
  */
  _setConfig(config) {

    if (config.player) {
      this._bindPlayer(config.player)
    }

    if (config.controls) {
      this._bindControlls(config.controls)
    }

    this.frameRate = config.frameRate;
  }

  _bindPlayer(player) {

    if (player) {
      this.player = document.querySelector(player);
    } else {
      //throw error?
      this.player = null;
    }
  }

  _bindControlls(controls) {
    for (let control in controls) {

      switch (control) {
        case 'playpause':
          document.querySelector(controls[control]).addEventListener('click', this.togglePlayPause.bind(this));
          break;
        case 'stop':

        case 'nextFrame':
          document.querySelector(controls[control]).addEventListener('click', () =>{this.currentFrame++;} );
          
          break;
        case 'prevFrame':
        document.querySelector(controls[control]).addEventListener('click', () =>{console.log(this.currentFrame).bind(this)} );
          break;
      }
    }
  }


}