declare const ALLOWED_EXTENSIONS: readonly ["webp", "png", "jpg", "jpeg", "gif"];
declare const ALLOWED_SIZES: readonly [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
type ImageExtension = (typeof ALLOWED_EXTENSIONS)[number];
type ImageSize = (typeof ALLOWED_SIZES)[number];

export interface BaseImageURLOptions {
  /**
   * The extension to use for the image URL
   *
   * @defaultValue `'webp'`
   */
  extension?: ImageExtension;
  /**
   * The size specified in the image URL
   */
  size?: ImageSize;
}
/**
 * The options used for image URLs with animated content
 */
export interface ImageURLOptions extends BaseImageURLOptions {
  /**
   * Whether or not to prefer the static version of an image asset.
   */
  forceStatic?: boolean;
}