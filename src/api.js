const xml2js = require('xml2js')
const _ = require('lodash')
const { volumeAmplitudeToLinear } = require('./utils')
const { uniqueId } = require('lodash')

exports.parseAPI = function (body) {
	xml2js.parseString(body, (err, xml) => {
		if (err) {
			this.debug('info', JSON.stringify(err))
			this.data.connected = false
			this.checkFeedbacks('status')
			this.setVariable(`connected_state`, 'False')
		} else {
			const pad = (value) => {
				if (value < 10) {
					return '0' + value
				} else {
					return value
				}
			}

			const getMix = (number) => {
				const mix = {
					number,
					active: false,
					preview: null,
					program: null,
					previewTally: [],
					programTally: [],
				}

				if (xml.vmix.mix) {
					const data = xml.vmix.mix.find((element) => element.$.number == number)
					if (data) {
						mix.active = true
						mix.preview = parseInt(data.preview, 10)
						mix.program = parseInt(data.active, 10)
					}
				}

				return mix
			}

			const inputData = (input) => {
				const data = { ...input.$ }

				if (input.text) {
					data.text = input.text.map((text) => ({
						index: text.$.index,
						name: text.$.name,
						value: text._,
					}))
				}

				if (input.list) {
					if (typeof input.list[0] === 'string') {
						let index = 0
						let location = ''
						data.list = [{ index, location, filename: 'Empty List', selected: false, empty: true }]
						// ];
					} else {
						data.list = input.list[0].item.map((item, index) => {
							const location = typeof item === 'string' ? item : item._
							return {
								index,
								location,
								filename: location.split('\\')[location.split('\\').length - 1],
								selected: !!item.$ && item.$.selected === 'true',
								empty: false,
							}
						})
					}
				}

				if (input.position) {
					data.position = input.position[0].$
				}

				if (input.meterF1) {
					data.meterF1 = input.meterF1[0].$
				}

				if (input.meterF2) {
					data.meterF2 = input.meterF2[0].$
				}

				if (input.overlay) {
					data.overlay = input.overlay.map((item) => {
						const overlay = {
							index: item.$.index,
							key: item.$.key,
						}

						if (item.position) {
							item.position = item.position.$
						}

						return overlay
					})
				} else {
					data.overlay = []
				}

				if (input.replay) {
					data.replay = input.replay[0].$
				}

				if (input.callPassword) {
					data.callPassword = input.callPassword[0].$
				}

				if (input.callConnected) {
					data.callConnected = input.callConnected[0].$
				}

				if (input.callVideoSource) {
					data.callVideoSource = input.callVideoSource[0].$
				}

				if (input.callAudioSource) {
					data.callAudioSource = input.callAudioSource[0].$
				}

				return data
			}

			const overlayData = (overlay) => {
				const data = {
					number: overlay.$.number,
					preview: false,
				}

				if (overlay._) {
					data.input = overlay._
				}

				if (overlay.$.preview) {
					data.preview = true
				}

				return data
			}

			const audioData = (audio) => {
				const data = []

				Object.keys(audio).forEach((key) => {
					audio[key][0].$.bus = key
					data.push(audio[key][0].$)
				})

				if (!this.data.connected) {
					data.forEach((output) => {
						const busID = output.bus === 'master' ? 'master' : output.bus.substr(3).toLowerCase()
						const volume = Math.round(parseFloat(output.volume))
						const volumeLinear = volumeAmplitudeToLinear(output.volume)

						this.setVariable(`bus_volume_${busID}`, this.config.volumeLinear ? volumeLinear : volume)

						if (output.bus === 'master') {
							const headphonesVolume = Math.round(parseFloat(output.headphonesVolume))
							const volumeLinear = volumeAmplitudeToLinear(output.headphonesVolume)

							this.setVariable('bus_volume_headphones', this.config.volumeLinear ? volumeLinear : headphonesVolume)
						}
					})
				}

				return data
			}

			const dynamicData = (dynamic) => {
				const data = []

				Object.keys(dynamic).forEach((key) => {
					const matches = key.match(/(input|value)([0-9]+)/i)
					data.push(
						(dynamic[key] = {
							type: matches[1],
							number: matches[2],
							value: dynamic[key][0],
						})
					)
				})

				return data
			}

			const data = {
				connected: true,
				version: xml.vmix.version[0],
				edition: xml.vmix.edition[0],
				preset: xml.vmix.preset ? xml.vmix.preset[0] : '',
				inputs: xml.vmix.inputs[0] !== '' ? xml.vmix.inputs[0].input.map(inputData) : [],
				overlays: xml.vmix.overlays[0].overlay.map(overlayData),
				transition: xml.vmix.transitions[0].transition.map((transition) => transition.$),
				mix: [
					{
						number: 1,
						active: true,
						preview: parseInt(xml.vmix.preview, 10),
						program: parseInt(xml.vmix.active, 10),
						previewTally: [],
						programTally: [],
					},
					getMix(2),
					getMix(3),
					getMix(4),
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
					fullscreen: xml.vmix.fullscreen[0] === 'True',
				},
				recTimecode: {
					hours:
						xml.vmix.recording[0].$ !== undefined
							? pad(Math.floor(xml.vmix.recording[0].$.duration / 3600)).toString()
							: '00',
					minutes:
						xml.vmix.recording[0].$ !== undefined
							? pad(Math.floor((xml.vmix.recording[0].$.duration %= 3600) / 60)).toString()
							: '00',
					seconds: xml.vmix.recording[0].$ !== undefined ? pad(xml.vmix.recording[0].$.duration % 60).toString() : '00',
					durationSec: xml.vmix.recording[0].$ !== undefined ? xml.vmix.recording[0].$.duration : '0',
				},
				replay: {
					recording: false,
					live: false,
					events: '1',
					cameraA: '0',
					cameraB: '0',
				},
				dynamic: xml.vmix.hasOwnProperty('dynamic') ? dynamicData(xml.vmix.dynamic[0]) : [],
			}

			data.dynamic.forEach((dynamic) => {
				this.setVariable(`dynamic_${dynamic.type}_${dynamic.number}`, dynamic.value)
			})

			// Update layer tally
			data.mix.forEach((mix) => {
				const checkTally = (type, input) => {
					if (input && !mix[type].includes(input.key)) {
						mix[type].push(input.key)

						input.overlay.forEach((layer) => {
							checkTally(
								type,
								data.inputs.find((input) => input.key === layer.key)
							)
						})
					}
				}

				if (mix.preview !== null) {
					checkTally(
						'previewTally',
						data.inputs.find((input) => input.number == mix.preview)
					)
				}
				if (mix.program !== null) {
					checkTally(
						'programTally',
						data.inputs.find((input) => input.number == mix.program)
					)
				}

				data.overlays
					.filter((overlay) => overlay.input !== undefined)
					.forEach((overlay) => {
						checkTally(
							overlay.preview ? 'previewTally' : 'programTally',
							data.inputs.find((input) => input.number === overlay.input)
						)
					})
			})

			// Update stream Status
			if (xml.vmix.streaming[0].$) {
				data.status.stream[0] = xml.vmix.streaming[0].$.channel1 === 'True'
				data.status.stream[1] = xml.vmix.streaming[0].$.channel2 === 'True'
				data.status.stream[2] = xml.vmix.streaming[0].$.channel3 === 'True'
			}

			// Update Replay
			const replayInput = data.inputs.find((input) => input.type === 'Replay')
			if (replayInput && replayInput.replay) {
				data.replay.recording = replayInput.replay.recording === 'True'
				data.replay.live = replayInput.replay.live === 'True'
				data.replay.events = replayInput.replay.events
				data.replay.cameraA = replayInput.replay.cameraA
				data.replay.cameraB = replayInput.replay.cameraB
				data.replay.channelMode = replayInput.replay.channelMode

				if (data.replay.channelMode === 'AB' && this.data.replay.cameraB) {
					data.replay.cameraB = this.data.replay.cameraB
				}
			}

			// Update channel mixer
			data.inputs.forEach((input) => {
				if (!this.activatorData.channelMixer[input.key]) {
					this.activatorData.channelMixer[input.key] = []
					for (let i = 0; i < 16; i++) {
						this.activatorData.channelMixer[input.key].push({ channel: i + 1, volume: 1 })
					}
				}

				if (input.type === 'VideoCall' && !this.activatorData.videoCall[input.key]) {
					this.activatorData.videoCall[input.key] = { audioSource: '' }
				}
			})

			// Clean up removed inputs from channel mixer
			Object.keys(this.activatorData.channelMixer).forEach((key) => {
				if (!data.inputs.map((input) => input.key).includes(key)) {
					delete this.activatorData.channelMixer[key]
				}
			})

			// Check for changes to update feedbacks
			const changes = new Set([])
			const inputCheck =
				data.inputs.map((input) => input.key).join('') !== this.data.inputs.map((input) => input.key).join('')
			const inputNameCheck =
				data.inputs.map((input) => input.title).join('') !== this.data.inputs.map((input) => input.title).join('')

			// Check mix 1 to 4
			if (!_.isEqual(data.mix, this.data.mix) || inputCheck) {
				changes.add('inputPreview')
				changes.add('inputLive')
				changes.add('overlayStatus')
				changes.add('overlayStatusPGM')
			}

			// Update variables for each mix
			data.mix.forEach((mix) => {
				if (mix.program !== null) {
					if (mix.program !== 0) {
						let programInput = data.inputs.find((input) => input.number == mix.program)
						this.setVariable(`mix_${mix.number}_program`, mix.program)
						this.setVariable(`mix_${mix.number}_program_name`, programInput.shortTitle.replace(/[^a-z0-9-_.]+/gi, ''))
						this.setVariable(`mix_${mix.number}_program_guid`, programInput.key)
					} else {
						this.setVariable(`mix_${mix.number}_program`, '0')
						this.setVariable(`mix_${mix.number}_program_name`, 'None')
						this.setVariable(`mix_${mix.number}_program_guid`, 'None')
					}
				}

				if (mix.preview !== null) {
					if (mix.preview !== 0) {
						let previewInput = data.inputs.find((input) => input.number == mix.preview)
						this.setVariable(`mix_${mix.number}_preview`, mix.preview)
						this.setVariable(`mix_${mix.number}_preview_name`, previewInput.shortTitle.replace(/[^a-z0-9-_.]+/gi, ''))
						this.setVariable(`mix_${mix.number}_preview_guid`, previewInput.key)
					} else {
						this.setVariable(`mix_${mix.number}_preview`, '0')
						this.setVariable(`mix_${mix.number}_preview_name`, 'None')
						this.setVariable(`mix_${mix.number}_preview_guid`, 'None')
					}
				}
			})

			// Check overlays
			if (!_.isEqual(data.overlays, this.data.overlays) || inputCheck) {
				changes.add('overlayStatus')
				changes.add('overlayStatusPGM')
			}

			// Check for input changes
			if (!this.data.connected && (!_.isEqual(data.inputs, this.data.inputs) || inputCheck)) {
				changes.add('videoTimer')
				changes.add('inputMute')
				changes.add('inputAudio')
				changes.add('inputSolo')
				changes.add('inputBusRouting')
				changes.add('titleLayer')
				changes.add('inputVolumeLevel')
				changes.add('inputSelectedIndex')
				changes.add('inputSelectedIndexName')
				changes.add('multiviewLayer')
				changes.add('inputOnMultiview')
				changes.add('routableMultiviewLayer')
			}

			if (!_.isEqual(data.inputs, this.data.inputs) || inputCheck) {
				changes.add('videoTimer')
				changes.add('titleLayer')
				changes.add('liveInputVolume')
				changes.add('liveBusVolume')
				changes.add('inputSelectedIndex')
				changes.add('inputSelectedIndexName')
				changes.add('multiviewLayer')
				changes.add('inputOnMultiview')
				changes.add('routableMultiviewLayer')
			}

			// Check for status changes
			if (!_.isEqual(data.status, this.data.status)) {
				changes.add('status')
			}

			// Check Audio status
			if (!this.data.connected && (!_.isEqual(data.audio, this.data.audio) || inputCheck)) {
				changes.add('busMute')
				changes.add('busVolumeLevel')
				changes.add('liveBusVolume')
			}

			// Update variables
			data.inputs.forEach((input) => {
				const previousState = this.data.inputs.find((item) => item.key === input.key)

				if (input.type === 'VideoList') {
					// // Remove symbols other than - _ . from the input title
					let inputTitle = input.title.replace(/[^a-z0-9-_.]+/gi, '')
					let selectedTitle = 'Empty List' // If the list is empty this text will be used
					if (input.list.find((list) => list.selected === true)) {
						selectedTitle = input.list.find((list) => list.selected === true).filename.replace(/[^a-z0-9-_.]+/gi, '')
					}
					this.setVariable(`input_${input.number}_name`, inputTitle)
					this.setVariable(`input_${input.number}_guid`, input.key)
					this.setVariable(`input_${input.number}_selected`, input.selectedIndex)
					this.setVariable(`input_${input.number}_selected_name`, selectedTitle)
				} else if (input.type === 'VideoCall') {
					// Remove symbols other than - _ . from the input title
					let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
					this.setVariable(`input_${input.number}_name`, inputName)
					this.setVariable(`input_${input.number}_guid`, input.key)
					this.setVariable(`input_${input.number}_call_password`, input.callPassword)
					this.setVariable(`input_${input.number}_call_connected`, input.callConnected)
					this.setVariable(`input_${input.number}_call_video_source`, input.callVideoSource)
					this.setVariable(`input_${input.number}_call_audio_source`, input.callAudioSource)
					changes.add('videoCallVideoSource')
				} else if (input.shortTitle) {
					// Remove symbols other than - _ . from the input title
					let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
					this.setVariable(`input_${input.number}_name`, inputName)
					this.setVariable(`input_${input.number}_guid`, input.key)
				}

				// Check input has volume and a different or no previous volume
				if (
					!this.data.connected &&
					input.volume !== undefined &&
					(previousState === undefined || input.volume !== previousState.volume)
				) {
					const volume = Math.round(parseFloat(input.volume))
					const volumeLinear = volumeAmplitudeToLinear(input.volume)

					if (input.shortTitle) {
						// Remove symbols other than - _ . from the input title
						let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
						this.setVariable(`input_volume_${inputName}`, this.config.volumeLinear ? volumeLinear : volume)
					}
				}
			})

			// Update Status Variables
			if (data.connected) {
				this.setVariable(`connected_state`, 'True')
			} else {
				this.setVariable(`connected_state`, 'False')
			}

			if (data.status.fadeToBlack == true) {
				this.setVariable(`ftb_active`, 'True')
			} else {
				this.setVariable(`ftb_active`, 'False')
			}

			if (data.status.playList == true) {
				this.setVariable(`playlist_active`, 'True')
			} else {
				this.setVariable(`playlist_active`, 'False')
			}

			if (data.status.fullscreen == true) {
				this.setVariable(`fullscreen_active`, 'True')
			} else {
				this.setVariable(`fullscreen_active`, 'False')
			}

			if (data.status.external == true) {
				this.setVariable(`external_active`, 'True')
			} else {
				this.setVariable(`external_active`, 'False')
			}

			if (data.status.multiCorder == true) {
				this.setVariable(`multicorder_active`, 'True')
			} else {
				this.setVariable(`multicorder_active`, 'False')
			}

			for (let i = 0; i < data.status.stream.length; i++) {
				const x = i + 1
				if (data.status.stream[i] == true) {
					this.setVariable(`stream_${x}_active`, 'True')
				} else {
					this.setVariable(`stream_${x}_active`, 'False')
				}
			}

			if (data.status.recording == true) {
				this.setVariable(`recording_active`, 'True')
			} else {
				this.setVariable(`recording_active`, 'False')
			}

			if (data.status.recording == true) {
				this.setVariable(`recording_duration`, data.recTimecode.durationSec)
			} else {
				this.setVariable(`recording_duration`, '0')
			}

			if (data.status.recording == true) {
				this.setVariable(
					`recording_hms`,
					data.recTimecode.hours + ':' + data.recTimecode.minutes + ':' + data.recTimecode.seconds
				)
			} else {
				this.setVariable(`recording_hms`, '00:00:00')
			}

			// Update Overlay Variables
			data.overlays.forEach((overlay) => {
				let input
				let preview = 'False'
				let program = 'False'

				if (overlay.input != undefined) {
					input = data.inputs.find((input) => input.number == overlay.input)
				} else {
					input = {
						title: 'NaN',
						shortTitle: 'NaN',
						number: 'NaN',
					}
				}

				const overlayActive = overlay.input != undefined

				if (overlayActive) {
					if (overlay.preview) {
						preview = 'True'
					} else {
						program = 'True'
					}
				}

				if (overlay.number <= 4) {
					this.setVariable(`overlay_${overlay.number}_input_name`, input.shortTitle.replace(/[^a-z0-9-_.]+/gi, ''))
					this.setVariable(`overlay_${overlay.number}_input`, input.number)
					this.setVariable(`overlay_${overlay.number}_pgm`, program)
					this.setVariable(`overlay_${overlay.number}_prv`, preview)
				}

				// Does not really work for Stingers, as they only report when OnAir :(
				// else if (overlay.number <= 8) {
				// 	let x = overlay.number - 4;
				// 	this.setVariable(`stinger_${x}_input_name`, input.shortTitle.replace(/[^a-z0-9-_.]+/gi, ''));
				// 	this.setVariable(`stinger_${x}_input`, input.number);
				// }
			})

			// Check Replay
			if (!_.isEqual(data.replay, this.data.replay)) {
				changes.add('replayStatus')
				changes.add('replayEvents')
				changes.add('replayCamera')
				changes.add('replaySelectedChannel')
			}

			data.startup = false
			this.data = data

			changes.forEach((change) => this.checkFeedbacks(change))

			// Update variable definitions
			if (changes.size > 0 && inputNameCheck) {
				this.updateVariableDefinitions()
			}
		}
	})
}
