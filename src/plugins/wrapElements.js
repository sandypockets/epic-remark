export default function wrapElements(elementsToWrap) {
  return tree => {
    traverseTree(tree, elementsToWrap);
  };
}

function traverseTree(node, elementsToWrap) {
  if (!node.children) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (child.type === 'element' && elementsToWrap.includes(child.tagName)) {
      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { className: 'custom-wrapper' },
        children: [child],
      };

      node.children[i] = wrapper;
    }

    traverseTree(child, elementsToWrap);
  }
}
