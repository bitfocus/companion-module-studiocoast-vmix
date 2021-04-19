exports.updateVariableDefinitions = function() {
	const variables = [];

	// Add variable for instance Status an other status info
	variables.push({
		label: `Connected to vMix`,
		name: `connected_state`
	})
	variables.push({
		label: `Fade To Black Active`,
		name: `ftb_active`
	})	
	variables.push({
		label: `playList Active`,
		name: `playlist_active`
	})	
	variables.push({
		label: `Fullscreen Output Active`,
		name: `fullscreen_active`
	})	
	variables.push({
		label: `External Output Active`,
		name: `external_active`
	})	
	variables.push({
		label: `MultiCorder Active`,
		name: `multicorder_active`
	})	
	for (let i = 0; i < this.data.status.stream.length; i++) {
		const x = i + 1;
		variables.push({
			label: `Stream ${x} Active`,
			name: `stream_${x}_active`
		})				
	}
	variables.push({
		label: `Recording Active`,
		name: `recording_active`
	})	
	variables.push({
		label: `Recording Duration`,
		name: `recording_duration`
	})	
	variables.push({
		label: `Recording HH:MM:SS`,
		name: `recording_hms`
	})	

	// Add variable for preview and program for each mix
	this.data.mix.forEach(mix => {
		if (mix.number !== undefined && mix.active) {
			variables.push({
				label: `Mix ${mix.number} Program`,
				name: `mix_${mix.number}_program`
			});
			variables.push({
				label: `Mix ${mix.number} Program Short Title`,
				name: `mix_${mix.number}_program_name`
			});
			variables.push({
				label: `Mix ${mix.number} Program GUID`,
				name: `mix_${mix.number}_program_guid`
			});
			variables.push({
				label: `Mix ${mix.number} Preview`,
				name: `mix_${mix.number}_preview`
			});
			variables.push({
				label: `Mix ${mix.number} Preview Short Title`,
				name: `mix_${mix.number}_preview_name`
			});
			variables.push({
				label: `Mix ${mix.number} Preview GUID`,
				name: `mix_${mix.number}_preview_guid`
			});
		};
	});
	
	['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'].forEach(bus => {
		variables.push({
			label: `Bus ${bus} Volume`,
			name: `bus_volume_${bus.toLowerCase()}`
		});
	});

	// Add variable for Overlay input, PGM and PRV
	for (let i = 0; i < 4; i++) {
		let overlay = this.data.overlays;
		variables.push({
			label: `Overlay ${overlay[i].number} Input Short Title`,
			name: `overlay_${overlay[i].number}_input_name`
		});
		variables.push({
			label: `Overlay ${overlay[i].number} Input Number`,
			name: `overlay_${overlay[i].number}_input`
		});
		variables.push({
			label: `Overlay ${overlay[i].number} Active PGM`,
			name: `overlay_${overlay[i].number}_pgm`
		});
		variables.push({
			label: `Overlay ${overlay[i].number} Active PRV`,
			name: `overlay_${overlay[i].number}_prv`
		});
	};

	// Add variable for Stinger input
	// Does not really work for Stingers, as they only report when OnAir :(
	// for (let i = 1; i < 5; i++) {
	// 	variables.push({
	// 		label: `Stinger ${i} Input Short Title`,
	// 		name: `stinger_${i}_input_name`
	// 	});
	// 	variables.push({
	// 		label: `Stinger ${i} Input`,
	// 		name: `stinger_${i}_input`
	// 	});
	// };

	this.data.inputs.forEach(input => {
		if (input.volume !== undefined && input.shortTitle) {
			// Remove symbols other than - _ . from the input title
			let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
			variables.push({
				label: `Input ${input.shortTitle} Volume`,
				name: `input_volume_${inputName}`
			})
		};

	});

	
	this.data.inputs.forEach(input => {
		variables.push({
			label: `Input ${input.number} Short Title`,
			name: `input_${input.number}_name`
		});
		variables.push({
			label: `Input ${input.number} GUID`,
			name: `input_${input.number}_guid`
		});
		if (input.type === 'VideoList') {
			variables.push({
				label: `Input ${input.number} Selected Index`,
				name: `input_${input.number}_selected`
			});
			variables.push({
				label: `Input ${input.number} Selected Index Name`,
				name: `input_${input.number}_selected_name`
			});
		}
		else if (input.type === 'VideoCall') {
			variables.push({
				label: `Input ${input.number} Call Password`,
				name: `input_${input.number}_call_password`
			});
			variables.push({
				label: `Input ${input.number} Call Connected`,
				name: `input_${input.number}_call_connected`
			});
			variables.push({
				label: `Input ${input.number} Call Video Source`,
				name: `input_${input.number}_call_video_source`
			});
			variables.push({
				label: `Input ${input.number} Call Audio Source`,
				name: `input_${input.number}_call_audio_source`
			});
		}
	});
	
	this.data.dynamic.forEach(dynamic => {
		let typeCapitalized = dynamic.type.charAt(0).toUpperCase() + dynamic.type.slice(1);
		variables.push({
			label: `Dynamic ${typeCapitalized} ${dynamic.number} value`,
			name: `dynamic_${dynamic.type}_${dynamic.number}`
		});
	});

	this.setVariableDefinitions(variables);
};
