export function remarkWrapTables() {
  return tree => {
    const processNode = (node, index, parent) => {
      if (node.type === 'table') {
        const wrapper = {
          type: 'div',
          data: {
            hName: 'div',
            hProperties: { className: 'overflow-x-auto' },
          },
          children: [node],
        };
        // Replace the table node with the wrapper node
        parent.children.splice(index, 1, wrapper);
      }
    };

    const traverseTree = (nodes, parent) => {
      nodes.forEach((node, index) => {
        if (node.children) {
          traverseTree(node.children, node);
        }
        processNode(node, index, parent);
      });
    };

    traverseTree(tree.children, tree);
  };
}
