export function remarkAddIdsToHeadings() {
  return tree => {
    const addIdToHeading = node => {
      if (node.type === 'heading') {
        const textContent = node.children.map(n => n.value).join('');
        const slug = textContent
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '');
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties.id = slug;
      }
    };

    const traverseTree = nodes => {
      nodes.forEach(node => {
        addIdToHeading(node);
        if (node.children) {
          traverseTree(node.children);
        }
      });
    };

    traverseTree(tree.children);
  };
}
