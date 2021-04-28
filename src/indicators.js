/**
 * Companion instance indicators class for Studiocoast vMix.
 * Utilized to generate/recall button designs for tally.
 *
 * @since 1.2.11
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class indicators {
	/**
	 * Create an instance of a vMix indicators module.
	 *
	 * @param {instance} instance - the parent instance
	 * @since 1.2.11
	 */
	constructor(instance) {
		this.Image = instance.Image
		this.log = instance.log
		this.debug = instance.debug

		this.borderDepth = 3
		this.triangleDepth = 20

		this.savedIcons = {}
	}

	/**
	 * Returns an icon with the desired border color.
	 *
	 * @param {number} bgcolor - the color of the background
	 * @param {number} color - the color of the border
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getBorder(bgcolor, color) {
		var id = 'borderB' + bgcolor + 'C' + color
		var out

		if (this.savedIcons[id] === undefined) {
			var img = new this.Image()

			img.backgroundColor(bgcolor)
			img.drawBorder(this.borderDepth, color)

			out = img.toBase64()
			this.savedIcons[id] = out
		} else {
			out = this.savedIcons[id]
		}

		return out
	}

	/**
	 * Returns an icon with triangle top-left in the desired color.
	 *
	 * @param {number} bgcolor - the color of the background
	 * @param {number} color - the color of the triangle
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getCorner(bgcolor, color) {
		var id = 'cornerB' + bgcolor + 'C' + color
		var out

		if (this.savedIcons[id] === undefined) {
			var img = new this.Image()

			img.backgroundColor(bgcolor)
			img.drawCornerTriangle(this.triangleDepth, color, 'left', 'top')

			out = img.toBase64()

			this.savedIcons[id] = out
		} else {
			out = this.savedIcons[id]
		}

		return out
	}

	/**
	 * Returns an icon with triangle top-right in the desired color.
	 *
	 * @param {number} bgcolor - the color of the background
	 * @param {number} color - the color of the triangle
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getCornerR(bgcolor, color) {
		var id = 'cornerBR' + bgcolor + 'C' + color
		var out

		if (this.savedIcons[id] === undefined) {
			var img = new this.Image()

			img.backgroundColor(bgcolor)
			img.drawCornerTriangle(this.triangleDepth, color, 'right', 'top')

			out = img.toBase64()

			this.savedIcons[id] = out
		} else {
			out = this.savedIcons[id]
		}

		return out
	}

	/**
	 * Returns an icon with triangle bottom-left in the desired color.
	 *
	 * @param {number} bgcolor - the color of the background
	 * @param {number} color - the color of the triangle
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getCornerBL(bgcolor, color) {
		var id = 'cornerBBL' + bgcolor + 'C' + color
		var out

		if (this.savedIcons[id] === undefined) {
			var img = new this.Image()

			img.backgroundColor(bgcolor)
			img.drawCornerTriangle(this.triangleDepth, color, 'left', 'bottom')

			out = img.toBase64()

			this.savedIcons[id] = out
		} else {
			out = this.savedIcons[id]
		}

		return out
	}

	/**
	 * Returns an icon with triangle bottom-right in the desired color.
	 *
	 * @param {number} bgcolor - the color of the background
	 * @param {number} color - the color of the triangle
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getCornerBR(bgcolor, color) {
		var id = 'cornerBBR' + bgcolor + 'C' + color
		var out

		if (this.savedIcons[id] === undefined) {
			var img = new this.Image()

			img.backgroundColor(bgcolor)
			img.drawCornerTriangle(this.triangleDepth, color, 'right', 'bottom')

			out = img.toBase64()

			this.savedIcons[id] = out
		} else {
			out = this.savedIcons[id]
		}

		return out
	}

	/**
	 * Returns an icon with corner triangles in the desired color.
	 *
	 * @param {number} bgcolor - the color of the background
	 * @param {number} color - the color of the triangles
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getCorners(bgcolor, color) {
		var id = 'cornersB' + bgcolor + 'C' + color
		var out

		if (this.savedIcons[id] === undefined) {
			var img = new this.Image()

			img.backgroundColor(bgcolor)
			img.drawCornerTriangle(this.triangleDepth, color, 'left', 'top')
			img.drawCornerTriangle(this.triangleDepth, color, 'right', 'top')
			img.drawCornerTriangle(this.triangleDepth, color, 'left', 'bottom')
			img.drawCornerTriangle(this.triangleDepth, color, 'right', 'bottom')

			out = img.toBase64()
			this.savedIcons[id] = out
		} else {
			out = this.savedIcons[id]
		}

		return out
	}

	/**
	 * Returns an image with the desired overlay.
	 *
	 * @param {String} type - the type of overlay to draw
	 * @param {number} color - the color of the overlay
	 * @returns {String} base64 encoded PNG
	 * @access public
	 * @since 1.2.11
	 */
	getImage(type, color) {
		var out

		switch (type) {
			case 'border': // Border
				out = this.getBorder(0, color)
				break
			case 'corner': // Corner Top Left
				out = this.getCorner(0, color)
				break
			case 'cornerR': // Corner Top Right
				out = this.getCornerR(0, color)
				break
			case 'cornerBL': // Corner Bottom Left
				out = this.getCornerBL(0, color)
				break
			case 'cornerBR': // Corner Bootom Right
				out = this.getCornerBR(0, color)
				break
		}

		return out
	}
}

exports = module.exports = indicators
