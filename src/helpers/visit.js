export default function visit(node, type, callback) {
  if (node.type === type) {
    callback(node);
  }

  if (node.children) {
    node.children.forEach(child => {
      visit(child, type, callback);
    });
  }
}
