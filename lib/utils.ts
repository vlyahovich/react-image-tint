export function isImageLoaded(imgElement: HTMLImageElement): boolean {
  return (
    typeof imgElement.naturalWidth != 'undefined' &&
    imgElement.naturalWidth != 0
  );
}

export function getBuffer(imgElement: HTMLImageElement): HTMLCanvasElement {
  const buffer = document.createElement('canvas');

  if (typeof imgElement.naturalWidth != 'undefined' && typeof imgElement.naturalHeight != 'undefined') {
    buffer.width = imgElement.naturalWidth;
    buffer.height = imgElement.naturalHeight;
  } else {
    buffer.width = imgElement.width;
    buffer.height = imgElement.height;
  }

  return buffer;
}

interface tintDataOptions {
  cache?: boolean;
}

const tintCache: { [src: string]: string } = {};

export function tintData(imgElement: HTMLImageElement, color: string, options: tintDataOptions = {}): Promise<string> {
  if (options.cache && tintCache[imgElement.src]) {
    return Promise.resolve(tintCache[imgElement.src]);
  }

  if (!isImageLoaded(imgElement)) {
    return new Promise((resolve, reject) => {
      imgElement.onload = () => resolve(tintData(imgElement, color, options));
      imgElement.onerror = reject;
    });
  }

  const buffer = getBuffer(imgElement);
  const context = buffer.getContext('2d');
  const width = buffer.width;
  const height = buffer.height;

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

  let dataUrl = imgElement.src;

  try {
    dataUrl = buffer.toDataURL('image/png');

    if (options.cache) {
      tintCache[imgElement.src] = dataUrl;
    }
  } catch (e) {
  }

  return Promise.resolve(dataUrl);
}

export function isColorful(src: string): boolean {
  return src.indexOf('[colorful]') !== -1;
}