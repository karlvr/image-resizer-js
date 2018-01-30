import getExif from './exif';

const EXIF_TRANSFORMS = {
  1: { rotate: 0, flip: false },
  2: { rotate: 0, flip: true },
  3: { rotate: Math.PI, flip: false },
  4: { rotate: Math.PI, flip: true },
  5: { rotate: Math.PI * 1.5, flip: true },
  6: { rotate: Math.PI * 0.5, flip: false },
  7: { rotate: Math.PI * 0.5, flip: true },
  8: { rotate: Math.PI * 1.5, flip: false },
};

const transformCanvas = (ctx, degrees = 0, flip = false) => {
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degrees);
  if (flip) ctx.scale(-1, 1);
  return ctx;
};

const rotate = (ctx, orientation) => {
  const transform = EXIF_TRANSFORMS[orientation];
  if (transform) {
    return transformCanvas(ctx, transform.rotate, transform.flip);
  }
  return ctx;
};

const getCanvasForImage = (maxWidth, size) => {
  const canvas = document.createElement('canvas');
  let w = size.width;
  let h = size.height;

  if (maxWidth && w > maxWidth) {
    const ratio = w / h;
    w = maxWidth;
    h = w / ratio;
  }

  canvas.width = w;
  canvas.height = h;

  return canvas;
};

const createImage = binary =>
  new Promise(resolve => {
    const blob = new Blob([binary]);
    const image = new Image();

    image.src = URL.createObjectURL(blob);
    image.onload = () => resolve(image);
  });

const rotateAndResize = async (
  binary,
  exifOrientationId,
  maxWidth = undefined,
) => {
  if (!EXIF_TRANSFORMS[exifOrientationId]) return binary;

  const image = await createImage(binary);
  const canvas = getCanvasForImage(maxWidth || image.width, {
    width: image.width,
    height: image.height,
  });

  const w = canvas.width;
  const h = canvas.height;

  if (exifOrientationId > 4) {
    const temp = canvas.width;
    canvas.width = canvas.height;
    canvas.height = temp;
  }

  const ctx = rotate(canvas.getContext('2d'), exifOrientationId);

  ctx.drawImage(image, 0, 0, image.width, image.height, -w / 2, -h / 2, w, h);

  if (typeof canvas.toBlob !== 'undefined') {
    return new Promise(resolve => canvas.toBlob(resolve));
  } else if (typeof canvas.msToBlob !== 'undefined') {
    return canvas.msToBlob();
  }

  return binary;
};

const Resizer = async (binary, maxWidth) => {
  let metadata;
  let orientation = 1;

  try {
    metadata = await getExif(binary);
    console.log('metadata', metadata);

    if (metadata.Orientation) orientation = metadata.Orientation.value;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('exif parser error:', e);
  }

  try {
    return await rotateAndResize(binary, orientation, maxWidth);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('canvas rotate error:', e);
    return binary;
  }
};

export default Resizer;
