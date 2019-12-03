"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isImageLoaded(imgElement) {
    return (imgElement.complete &&
        typeof imgElement.naturalWidth != 'undefined' &&
        imgElement.naturalWidth != 0);
}
exports.isImageLoaded = isImageLoaded;
function getBuffer(imgElement) {
    var buffer = document.createElement('canvas');
    if (typeof imgElement.naturalWidth != 'undefined' && typeof imgElement.naturalHeight != 'undefined') {
        buffer.width = imgElement.naturalWidth;
        buffer.height = imgElement.naturalHeight;
    }
    else {
        buffer.width = imgElement.width;
        buffer.height = imgElement.height;
    }
    return buffer;
}
exports.getBuffer = getBuffer;
function tintData(imgElement, color) {
    if (!isImageLoaded(imgElement)) {
        return new Promise(function (resolve, reject) {
            imgElement.onload = function () { return resolve(tintData(imgElement, color)); };
            imgElement.onerror = reject;
        });
    }
    var buffer = getBuffer(imgElement);
    var context = buffer.getContext('2d');
    var width = buffer.width;
    var height = buffer.height;
    // If we can't create a context, return the source image's src attribute.
    if (!buffer || !context) {
        return Promise.resolve(imgElement.src);
    }
    // Clear the context.
    context.clearRect(0, 0, width, height);
    // Set the fill color.
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = color;
    // Fill the context.
    context.fillRect(0, 0, width, height);
    // Draw image the specified blending mode.
    context.globalCompositeOperation = 'destination-in';
    context.drawImage(imgElement, 0, 0);
    return Promise.resolve(buffer.toDataURL('image/png'));
}
exports.tintData = tintData;
function isColorful(src) {
    return src.indexOf('[colorful]') !== -1;
}
exports.isColorful = isColorful;
//# sourceMappingURL=utils.js.map