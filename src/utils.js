exports.volumeAmplitudeToLinear = (volume) => Math.round(Math.pow(parseFloat(volume) / 100, 0.25) * 100);
