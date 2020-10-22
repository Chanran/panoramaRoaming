const operationFunc = {
	resize: resizeOperation,
	bright: brightOperation,
	contrast: contrastOperation,
	sharpen: sharpenOperation,
	quality: qualityOperation,
	crop: cropOperation,
	blur: blurOperation
}

export default function oss(originUrl, configs = []) {
	if (!originUrl) {
		return ''
	}

	let resultUrl = originUrl

	if (originUrl.indexOf('?x-oss-process') === -1) {
		resultUrl += `?x-oss-process=image/`
	} else {
		if (originUrl.substring(originUrl.length - 1, originUrl.length) !== '/') {
			resultUrl += '/'
		}
	}

	let isFormatted = false
	let out = ''

	configs.map((config) => {
		Object.keys(config).map((operation) => {
			out = operationFunc[operation](config[operation])
			if (out) {
				isFormatted = true
				resultUrl += `${out}/`
			}
		})
	})

	return isFormatted ? resultUrl : originUrl
}

function resizeOperation(resize) {
	if (!resize) {
		return ''
	}

	let result = 'resize,'
	let isFormatted = false

	Object.keys(resize).map((resizeKey) => {
		isFormatted = true
		result += `${resizeKey}_${resize[resizeKey]},`
	})

	if (result.length > 0 && result[result.length - 1] === ',') {
		result = result.substring(0, result.length - 1)
	}

	return isFormatted ? result : ''
}

function brightOperation(bright) {
	if (bright === null || bright === undefined) {
		return ''
	}

	return `bright,${bright}`
}

function contrastOperation(contrast) {
	if (contrast === null || contrast === undefined) {
		return ''
	}

	return `contrast,${contrast}`
}

function sharpenOperation(sharpen) {
	if (sharpen === null || sharpen === undefined) {
		return ''
	}

	return `sharpen,${sharpen}`
}

function qualityOperation(quality) {
	if (!quality) {
		return ''
	}

	let result = 'quality,'
	let isFormatted = false

	Object.keys(quality).map(qualityKey => {
		isFormatted = true
		result += `${qualityKey}_${quality[qualityKey]},`
	})

	if (result.length > 0 && result[result.length - 1] === ',') {
		result = result.substring(0, result.length - 1)
	}

	return isFormatted ? result : ''
}

function cropOperation(crop) {
	if (!crop) {
		return ''
	}

	let result = 'crop,'
	let isFormatted = false

	Object.keys(crop).map(cropKey => {
		isFormatted = true
		result += `${cropKey}_${crop[cropKey]},`
	})

	if (result.length > 0 && result[result.length - 1] === ',') {
		result = result.substring(0, result.length - 1)
	}

	return isFormatted ? result : ''
}

function blurOperation(blur) {
	if (!blur) {
		return ''
	}

	let result = 'blur,'
	let isFormatted = false

	Object.keys(blur).map((blurKey) => {
		isFormatted = true
		result += `${blurKey}_${blur[blurKey]},`
	})

	if (result.length > 0 && result[result.length - 1] === ',') {
		result = result.substring(0, result.length - 1)
	}

	return isFormatted ? result : ''
}