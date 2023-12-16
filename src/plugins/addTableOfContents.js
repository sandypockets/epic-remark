import visit from '../helpers/visit.js';

export default function addTableOfContents(tree, insertDirectly = false) {
  const headings = [];
  visit(tree, 'element', node => {
    if (isHeading(node)) {
      const level = getHeadingLevel(node.tagName);
      const text = getTextContent(node);
      const id = node.properties?.id || createSlug(text);
      headings.push({ level, text, id });
    }
  });

  const tableOfContentsNode = buildTocStructure(headings);

  if (insertDirectly) {
    const lineBreak1 = { type: 'element', tagName: 'br', properties: {}, children: [] };
    const lineBreak2 = { type: 'element', tagName: 'br', properties: {}, children: [] };
    tree.children.unshift(lineBreak2);
    tree.children.unshift(lineBreak1);
    tree.children.unshift(tableOfContentsNode);
    return null;
  } else {
    return tableOfContentsNode;
  }
}

function isHeading(node) {
  return /^h[1-6]$/.test(node.tagName);
}

function getHeadingLevel(tagName) {
  return parseInt(tagName.charAt(1), 10);
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

function buildTocStructure(headings) {
  const tocList = {
    type: 'element',
    tagName: 'ul',
    properties: { className: 'toc markdown' },
    children: [],
  };

  headings.forEach(heading => {
    tocList.children.push({
      type: 'element',
      tagName: 'li',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'a',
          properties: { href: `#${heading.id}` },
          children: [{ type: 'text', value: heading.text }],
        },
      ],
    });
  });

  return tocList;
}
