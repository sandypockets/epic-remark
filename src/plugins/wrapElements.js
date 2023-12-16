export default function wrapElements(config) {
  return tree => {
    traverseTree(tree, config);
  };
}

function traverseTree(node, config) {
  if (!node.children) return;

  node.children.forEach((child, i) => {
    if (child.type === 'element' && config[child.tagName]) {
      const wrapperClassName = config[child.tagName];
      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { className: wrapperClassName },
        children: [child],
      };
      node.children[i] = wrapper;
    }

    traverseTree(child, config);
  });
}
