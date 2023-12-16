export default function wrapWithDiv(htmlString, className) {
  if (!htmlString) return '';
  return `<div class="${className}">${htmlString}</div>`;
}
