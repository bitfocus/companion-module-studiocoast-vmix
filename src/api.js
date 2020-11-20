const xml2js = require('xml2js');
const _ = require('lodash');

exports.parseAPI = function (body) {
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
					program: null,
					previewTally: [],
					programTally: []
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
					if (input.list.length > 0) {
						data.list = input.list[0].$;
					}
					else {

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
				}

				if (input.position) {
					data.position = input.position[0].$;
				}

				if (input.meterF1) {
					data.meterF1 = input.meterF1[0].$;
				}

				if (input.meterF2) {
					data.meterF2 = input.meterF2[0].$;
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
				} else {
					data.overlay = [];
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
				
				if (!this.data.connected) {
					data.forEach(output => {
						const busID = output.bus === 'master' ? 'master' : output.bus.substr(3).toLowerCase();
						const volume = Math.round(parseFloat(output.volume));
						this.setVariable(`bus_volume_${busID}`, volume);

						if (output.bus === 'master') {
							const headphonesVolume = Math.round(parseFloat(output.headphonesVolume));
							this.setVariable('bus_volume_headphones', headphonesVolume);
						}
					});
				}

				return data;
			};


			const data = {
				connected: true,
				version: xml.vmix.version[0],
				edition: xml.vmix.edition[0],
				preset: xml.vmix.preset ? xml.vmix.preset[0] : '',
				inputs: xml.vmix.inputs[0] !== '' ? xml.vmix.inputs[0].input.map(inputData) : [],
				overlays: xml.vmix.overlays[0].overlay.map(overlayData),
				transition: xml.vmix.transitions[0].transition.map(transition => transition.$),
				mix: [
					{
						number: 1,
						active: true,
						preview: parseInt(xml.vmix.preview, 10),
						program: parseInt(xml.vmix.active, 10),
						previewTally: [],
						programTally: []
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

			// Update layer tally
			data.mix.forEach(mix => {
				const checkTally = (type, input) => {
					if (input && !mix[type].includes(input.key)) {
						mix[type].push(input.key);

						input.overlay.forEach(layer => {
							checkTally(type, data.inputs.find(input => input.key === layer.key));
						})
					}
				};

				if (mix.preview !== null) {
					checkTally('previewTally', data.inputs.find(input => input.number == mix.preview));
				}
				
				if (mix.program !== null) {
					checkTally('programTally', data.inputs.find(input => input.number == mix.program));
				}

				data.overlays.filter(overlay => overlay.input !== undefined).forEach(overlay => {
					checkTally(overlay.preview ? 'previewTally' : 'programTally', data.inputs.find(input => input.number === overlay.input));
				});
			});

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
				data.replay.channelMode = replayInput.replay.channelMode; 

				if (data.replay.channelMode === 'AB' && this.data.replay.cameraB) {
					data.replay.cameraB = this.data.replay.cameraB;
				}
			}

			// Update channel mixer
			data.inputs.forEach(input => {
				if (!this.activatorData.channelMixer[input.key]) {
					this.activatorData.channelMixer[input.key] = [];
					for (let i = 0; i < 16; i++) {
						this.activatorData.channelMixer[input.key].push({ channel: i + 1, volume: 1 });
					}
				}

				if (input.type === 'VideoCall' && !this.activatorData.videoCall[input.key]) {
					this.activatorData.videoCall[input.key] = { audioSource: '' };
				}
			});

			// Clean up removed inputs from channel mixer
			Object.keys(this.activatorData.channelMixer).forEach(key => {
				if (!data.inputs.map(input => input.key).includes(key)) {
					delete this.activatorData.channelMixer[key];
				}
			});

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
			if (!this.data.connected && (!_.isEqual(data.inputs, this.data.inputs) || inputCheck)) {
				changes.add('videoTimer');
				changes.add('inputMute');
				changes.add('inputAudio');
				changes.add('inputSolo');
				changes.add('inputBusRouting');
				changes.add('titleLayer');
				changes.add('inputVolumeLevel');
			}

			if (!_.isEqual(data.inputs, this.data.inputs) || inputCheck) {
				changes.add('videoTimer');
				changes.add('titleLayer');
				changes.add('liveInputVolume');
			}

			// Check for status changes
			if (!_.isEqual(data.status, this.data.status)) {
				changes.add('status');
			}

			// Check Audio status
			if (!this.data.connected && (!_.isEqual(data.audio, this.data.audio) || inputCheck)) {
				changes.add('busMute');
				changes.add('busVolumeLevel');
				changes.add('liveBusVolume');
			}

			// Update variables
			data.inputs.forEach(input => {
				const previousState = this.data.inputs.find(item => item.key === input.key);

				if (input.type === 'VideoList') {
					// // Remove symbols other than - _ . from the input title
					let inputTitle = input.title.replace(/[^a-z0-9-_.]+/gi, '');
					this.setVariable(`input_${input.number}_name`, inputTitle);
				} else {
					// Remove symbols other than - _ . from the input title
					let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '');
					this.setVariable(`input_${input.number}_name`, inputName);
				}

				// Check input has volume and a different or no previous volume
				if (!this.data.connected && input.volume !== undefined && (previousState === undefined || input.volume !== previousState.volume)) {
					const volume = Math.round(parseFloat(input.volume));

					// Remove symbols other than - _ . from the input title
					let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '');
					this.setVariable(`input_volume_${inputName}`, volume);
				}
			});

			// Check Replay
			if (!_.isEqual(data.replay, this.data.replay)) {
				changes.add('replayStatus');
				changes.add('replayEvents');
				changes.add('replayCamera');
				changes.add('replaySelectedChannel');
			}

			data.startup = false;
			this.data = data;

			changes.forEach(change => this.checkFeedbacks(change));

			// Update variable definitions
			if (changes.size > 0) {
				this.updateVariableDefinitions();
			}
		}
	});
};
