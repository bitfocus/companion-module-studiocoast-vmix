const volumeAmplitudeToLinear = (volume) => Math.round(Math.pow(parseFloat(volume) / 100, 0.25) * 100);

function updateVolumeVariables() {
	['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'].forEach(id => {
        const busId = id.length === 1 ? `bus${id}` : 'master';
        const variableName = `bus_volume_${id.toLowerCase()}`;
        const bus = this.data.audio.find(item => item.bus === busId); 
        const volume = id === 'Headphones' ? bus.headphonesVolume : bus.volume;

        this.setVariable(variableName, this.config.volumeLinear ? volumeAmplitudeToLinear(volume) : Math.round(volume));
    });

    this.data.inputs.forEach(input => {
        if (input.shortTitle) {
            const volume = input.volume;
            const inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '');

            this.setVariable(`input_volume_${inputName}`, this.config.volumeLinear ? volumeAmplitudeToLinear(volume) : Math.round(volume));
        }
    });
    
    ['inputVolumeLevel', 'busVolumeLevel'].forEach(feedback => this.checkFeedbacks(feedback));
}

module.exports = {
    volumeAmplitudeToLinear,
    updateVolumeVariables
};

