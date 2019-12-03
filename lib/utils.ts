export function isImageLoaded(imgElement: HTMLImageElement) {
  return (
    imgElement.complete &&
    typeof imgElement.naturalWidth != 'undefined' &&
    imgElement.naturalWidth != 0
  );
};

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

export function tintData(imgElement: HTMLImageElement, color: string): Promise<string> {
  if (!isImageLoaded(imgElement)) {
    return new Promise((resolve, reject) => {
      imgElement.onload = () => resolve(tintData(imgElement, color));
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

  return Promise.resolve(buffer.toDataURL('image/png'));
}