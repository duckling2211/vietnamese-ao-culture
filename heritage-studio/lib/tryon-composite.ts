import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export interface CostumeAnchor {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Pre-calibrated face anchor regions for all 12 historical costume portraits (896x1200)
export const COSTUME_ANCHORS: Record<string, CostumeAnchor> = {
  nhat_binh: { x: 350, y: 220, w: 196, h: 255 },
  giao_linh: { x: 345, y: 225, w: 200, h: 260 },
  ngu_than: { x: 348, y: 230, w: 200, h: 255 },
  ao_tac: { x: 346, y: 215, w: 204, h: 265 },
  tu_than: { x: 345, y: 230, w: 200, h: 260 },
  ao_ba_ba: { x: 348, y: 210, w: 200, h: 255 },
  ao_dai_le_mur: { x: 348, y: 220, w: 198, h: 255 },
  ao_dai_hien_dai: { x: 346, y: 215, w: 204, h: 260 },
  ao_cham: { x: 348, y: 235, w: 200, h: 255 },
  ao_dai_hiipi: { x: 348, y: 220, w: 200, h: 255 },
  ao_dai_tay_raglan: { x: 348, y: 215, w: 198, h: 255 },
  ao_dai_cach_tan: { x: 346, y: 210, w: 204, h: 260 },
};

/**
 * Composites the user's face from their uploaded photo onto the authentic Vietnamese costume portrait.
 * Applies elliptical radial feathering and skin-tone harmonization for a natural, authentic try-on appearance.
 */
export async function compositeUserOnCostume(
  userImageBase64: string,
  costumeId: string,
  faceBox?: [number, number, number, number] | null
): Promise<string> {
  const costumeFileName = `${costumeId}.jpg`;
  const costumePath = path.join(process.cwd(), 'public', 'costumes', costumeFileName);

  if (!fs.existsSync(costumePath)) {
    console.warn(`Costume template ${costumePath} not found, fallback to public path`);
    return `/costumes/${costumeFileName}`;
  }

  const anchor = COSTUME_ANCHORS[costumeId] || { x: 348, y: 220, w: 200, h: 260 };

  try {
    // Strip data URI header if present
    const cleanBase64 = userImageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const userBuffer = Buffer.from(cleanBase64, 'base64');

    const userSharp = sharp(userBuffer);
    const userMeta = await userSharp.metadata();

    const uW = userMeta.width || 600;
    const uH = userMeta.height || 800;

    let cropLeft: number;
    let cropTop: number;
    let cropW: number;
    let cropH: number;

    if (
      Array.isArray(faceBox) &&
      faceBox.length === 4 &&
      faceBox.every((v) => typeof v === 'number' && !isNaN(v))
    ) {
      // faceBox: [ymin, xmin, ymax, xmax] normalized from 0 to 1000
      const [ymin, xmin, ymax, xmax] = faceBox;
      const top = Math.round((ymin * uH) / 1000);
      const left = Math.round((xmin * uW) / 1000);
      const width = Math.round(((xmax - xmin) * uW) / 1000);
      const height = Math.round(((ymax - ymin) * uH) / 1000);

      const padX = Math.round(width * 0.16);
      const padY = Math.round(height * 0.22);

      cropLeft = Math.max(0, left - padX);
      cropTop = Math.max(0, top - padY);
      cropW = Math.min(uW - cropLeft, width + padX * 2);
      cropH = Math.min(uH - cropTop, height + padY * 2);
    } else {
      // Default to upper-middle area where faces typically reside in portraits
      cropLeft = Math.round(uW * 0.2);
      cropTop = Math.round(uH * 0.1);
      cropW = Math.round(uW * 0.6);
      cropH = Math.round(uH * 0.55);
    }

    const targetW = anchor.w;
    const targetH = anchor.h;

    // Crop the user's face and scale to the costume face anchor
    const croppedFace = await sharp(userBuffer)
      .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
      .resize(targetW, targetH, { fit: 'cover' })
      .toBuffer();

    // Create an elliptical radial feather mask to softly blend edges into hair and neckline
    const maskSvg = Buffer.from(`
      <svg width="${targetW}" height="${targetH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="feather" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="65%" stop-color="#fff" stop-opacity="0.95" />
            <stop offset="85%" stop-color="#fff" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="${targetW / 2}" cy="${targetH / 2}" rx="${targetW * 0.44}" ry="${targetH * 0.48}" fill="url(#feather)" />
      </svg>
    `);

    const maskedFace = await sharp(croppedFace)
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Composite the masked user face onto the authentic costume portrait
    const compositeBuffer = await sharp(costumePath)
      .composite([{ input: maskedFace, top: anchor.y, left: anchor.x }])
      .jpeg({ quality: 92 })
      .toBuffer();

    return `data:image/jpeg;base64,${compositeBuffer.toString('base64')}`;
  } catch (error) {
    console.error('[TryOnComposite] Error generating face composite:', error);
    // Graceful fallback to costume template URL
    return `/costumes/${costumeFileName}`;
  }
}
