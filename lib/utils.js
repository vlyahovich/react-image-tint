"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isImageLoaded(imgElement) {
    return (typeof imgElement.naturalWidth != 'undefined' &&
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
var tintCache = {};
function tintData(imgElement, color, options) {
    if (options === void 0) { options = {}; }
    if (options.cache && tintCache[imgElement.src]) {
        return Promise.resolve(tintCache[imgElement.src]);
    }
    if (!isImageLoaded(imgElement)) {
        return new Promise(function (resolve, reject) {
            imgElement.onload = function () { return resolve(tintData(imgElement, color, options)); };
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
    var dataUrl = imgElement.src;
    try {
        dataUrl = buffer.toDataURL('image/png');
        if (options.cache) {
            tintCache[imgElement.src] = dataUrl;
        }
    }
    catch (e) {
    }
    return Promise.resolve(dataUrl);
}
exports.tintData = tintData;
function isColorful(src) {
    return src.indexOf('[colorful]') !== -1;
}
exports.isColorful = isColorful;
//# sourceMappingURL=utils.js.map