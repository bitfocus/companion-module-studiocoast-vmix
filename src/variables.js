exports.updateVariableDefinitions = function() {
	const variables = [];

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

	this.setVariableDefinitions(variables);
};
