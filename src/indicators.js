const { createCanvas } = require('canvas');

const cache = {};

exports.layerTally = (style, color) => {
	const canvas = createCanvas(72, 58);
	const ctx = canvas.getContext('2d');

	// Convert color to hex and pad with leading zeros
	let hex = '000000' + (color).toString(16);
	hex = '#' + hex.substr(hex.length - 6);

	if (style === 'border') {
		ctx.lineWidth = 14;
		ctx.strokeStyle = hex;
		ctx.moveTo(0, 0);
		ctx.lineTo(72, 0);
		ctx.lineTo(72, 58);
		ctx.lineTo(0, 58);
		ctx.lineTo(0, 0);
		ctx.stroke();
	}
	else if (style === 'corner') {
		ctx.lineWidth = 12;
		ctx.fillStyle = hex;
		ctx.moveTo(0, 0);
		ctx.lineTo(24, 0);
		ctx.lineTo(0, 24);
		ctx.lineTo(0, 0);
		ctx.fill();
	}

	const png64 = canvas.toDataURL('image/png').substr('data:image/png;base64,'.length);
	cache[style + color] = png64;
	return png64;
};


