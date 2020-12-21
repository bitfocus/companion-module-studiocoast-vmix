exports.updateVariableDefinitions = function() {
	const variables = [];

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
		})
	});

	this.setVariableDefinitions(variables);
};
