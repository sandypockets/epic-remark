import visit from '../helpers/visit.js';

export default function addHeadingIds() {
  return tree => {
    visit(tree, 'element', node => {
      if (
        node.tagName === 'h1' ||
        node.tagName === 'h2' ||
        node.tagName === 'h3' ||
        node.tagName === 'h4' ||
        node.tagName === 'h5' ||
        node.tagName === 'h6'
      ) {
        const textContent = getTextContent(node);
        const slug = createSlug(textContent);
        node.properties = node.properties || {};
        node.properties.id = slug;
      }
    });
  };
}

function getTextContent(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(getTextContent).join('');
  return '';
}

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}
