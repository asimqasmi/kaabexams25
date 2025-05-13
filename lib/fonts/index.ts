import localFont from "next/font/local";

export const cairoFont = localFont({
  src: [{ path: "./fontData/Cairo-Regular.ttf" }],
  preload: true,
});
export const cairoBoldFont = localFont({
  src: [{ path: "./fontData/Cairo-Bold.ttf" }],
  preload: true,
});
export const diwaniFont = localFont({
  src: [{ path: "./fontData/alsamt diwani.ttf" }],
  preload: true,
});
export const amiriFont = localFont({
  src: [{ path: "./fontData/Amiri-Bold.ttf" }],
  preload: true,
});
export const meilaFont = localFont({
  src: [{ path: "./fontData/meila-font.ttf" }],
  preload: true,
});
export const digitalFont = localFont({
  src: [{ path: "./fontData/digital-font.ttf" }],
  preload: true,
});
