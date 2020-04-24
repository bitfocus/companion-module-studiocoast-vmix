const got = require('got');
const xml2js = require('xml2js');
const _ = require('lodash');

exports.initAPI = function() {
	const parseXML = body => {
		xml2js.parseString(body, (err, xml) => {
			if (err) {
				this.debug('info', JSON.stringify(err));
				this.data.connected = false;
				this.checkFeedbacks('status');
			} else {
				const getMix = number => {
					const mix = {
						number,
						active: false,
						preview: null,
						program: null
					};

					if (xml.vmix.mix) {
						const data = xml.vmix.mix.find(element => element.$.number == number);
						if (data) {
							mix.active = true;
							mix.preview = parseInt(data.preview, 10);
							mix.program = parseInt(data.active, 10);
						}
					}

					return mix;
				};

				const inputData = input => {
					const data = { ...input.$ };

					if (input.text) {
						data.text = input.text.map(text => ({
							index: text.$.index,
							name: text.$.name,
							value: text._
						}));
					}

					if (input.list) {
						data.list = input.list[0].item.map((item, index) => {
							const location = typeof item === 'string' ? item : item._;
							return {
								index,
								location,
								filename: location.split('\\')[location.split('\\').length - 1],
								selected: item.$ && item.$.selected && item.$.selected === 'true'
							};
						});
					}

					if (input.position) {
						data.position = input.position[0].$;
					}

					if (input.overlay) {
						data.overlay = input.overlay.map(item => {
							const overlay = {
								index: item.$.index,
								key: item.$.key
							};

							if (item.position) {
								item.position = item.position.$;
							}

							return overlay;
						});
					}

					if (input.replay) {
						data.replay = input.replay[0].$;
					}

					return data;
				};

				const overlayData = overlay => {
					const data = {
						number: overlay.$.number,
						preview: false
					};

					if (overlay._) {
						data.input = overlay._;
					}

					if (overlay.$.preview) {
						data.preview = true;
					}

					return data;
				};

				const audioData = audio => {
					const data = [];

					Object.keys(audio).forEach(key => {
						audio[key][0].$.bus = key;
						data.push(audio[key][0].$);
					});

					return data;
				};

				const data = {
					connected: true,
					version: xml.vmix.version[0],
					edition: xml.vmix.edition[0],
					preset: xml.vmix.preset ? xml.vmix.preset[0] : '',
					inputs: xml.vmix.inputs[0].input.map(inputData),
					overlays: xml.vmix.overlays[0].overlay.map(overlayData),
					transition: xml.vmix.transitions[0].transition.map(transition => transition.$),
					mix: [
						{
							number: 1,
							active: true,
							preview: parseInt(xml.vmix.preview, 10),
							program: parseInt(xml.vmix.active, 10)
						},
						getMix(2),
						getMix(3),
						getMix(4)
					],
					audio: audioData(xml.vmix.audio[0]),
					status: {
						fadeToBlack: xml.vmix.fadeToBlack[0] === 'True',
						recording: xml.vmix.recording[0] === 'True' || xml.vmix.recording[0]._ === 'True',
						external: xml.vmix.external[0] === 'True',
						streaming: xml.vmix.streaming[0] === 'True' || xml.vmix.streaming[0]._ === 'True',
						stream: [false, false, false],
						playList: xml.vmix.playList[0] === 'True',
						multiCorder: xml.vmix.multiCorder[0] === 'True',
						fullscreen: xml.vmix.fullscreen[0] === 'True'
					},
					replay: {
						recording: false,
						live: false,
						events: '1',
						cameraA: '0',
						cameraB: '0'
					}
				};

				// Update stream Status
				if (xml.vmix.streaming[0].$) {
					data.status.stream[0] = xml.vmix.streaming[0].$.channel1 === 'True';
					data.status.stream[1] = xml.vmix.streaming[0].$.channel2 === 'True';
					data.status.stream[2] = xml.vmix.streaming[0].$.channel3 === 'True';
				}

				// Update Replay
				const replayInput = data.inputs.find(input => input.type === 'Replay');
				if (replayInput) {
					data.replay.recording = replayInput.replay.recording === 'True';
					data.replay.live = replayInput.replay.live === 'True';
					data.replay.events = replayInput.replay.events;
					data.replay.cameraA = replayInput.replay.cameraA;
					data.replay.cameraB = replayInput.replay.cameraB;
				}

				// Check for changes to update feedbacks
				const changes = new Set([]);
				const inputCheck = data.inputs.map(input => input.key).join('') !== this.data.inputs.map(input => input.key).join('');

				// Check mix 1 to 4
				if (!_.isEqual(data.mix, this.data.mix) || inputCheck) {
					changes.add('inputPreview');
					changes.add('inputLive');
				}

				// Check overlays
				if (!_.isEqual(data.overlays, this.data.overlays) || inputCheck) {
					changes.add('overlayStatus');
				}

				// Check for input changes
				if (!_.isEqual(data.inputs, this.data.inputs) || inputCheck) {
					changes.add('videoTimer');
					changes.add('inputMute');
					changes.add('inputSolo');
					changes.add('inputBusRouting');
					changes.add('titleLayer');
				}

				// Check for status changes
				if (!_.isEqual(data.status, this.data.status) || inputCheck) {
					changes.add('status');
				}

				// Check Audio status
				if (!_.isEqual(data.audio, this.data.audio) || inputCheck) {
					changes.add('busMute');
				}

				// Check Replay
				if (!_.isEqual(data.replay, this.data.replay)) {
					changes.add('replayStatus');
					changes.add('replayEvents');
					changes.add('replayCamera');
				}

				data.startup = false;
				this.data = data;

				changes.forEach(change => this.checkFeedbacks(change));
			}
		});
	};

	const getStatus = () => {
		got.get(`http://${this.config.host}:${this.config.httpPort || 8088}/api/`)
			.then(res => {
				if (res.statusCode === 200) {
					return parseXML(res.body);
				}
			})
			.catch(err => {
				this.debug('vMix API err:' + JSON.stringify(err));
			});
	};

	this.pollAPI = setInterval(getStatus, 100);
};
