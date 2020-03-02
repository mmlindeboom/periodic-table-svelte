import emotion from 'emotion/dist/emotion.umd.min.js';

const { css } = emotion;

let windowWidth = window.innerWidth
const elPadding = 8;
const elMargin = 4;
const borderWidth = 1
const elWidth = () => (windowWidth / 18) - ((elMargin*2) + (borderWidth*2));

window.addEventListener('resize', () => windowWidth = window.innerWidth)

export const canvasStyle = css`

`
export const elementStyle = (color="#fff", visible, count=18) => css`
  position: relative;
  box-sizing: border-box;
  width: calc((100%/18) - (${elMargin*2}px));
  minWidth: 50px;
  background: ${color};
  border: ${borderWidth}px solid ${LightenDarkenColor(color, -20)};
  padding: ${elPadding}px;
  margin: ${elMargin}px;
  display: inline-block;
  visibility: ${visible ? 'visible' : 'hidden' };
`
export const gridCellStyle = css`
  position: relative;
  box-sizing: border-box;
  width: calc((100%/19) - (${elMargin*2}px));
  minWidth: 50px;
  padding: ${elPadding}px;
  margin: ${elMargin}px;
  display: inline-block;
  text-align: center;
`

function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}