import addTableOfContents from '../src/plugins/addTableOfContents.js';

describe("addTableOfContents functionality", () => {
  it('generates a table of contents from headings', () => {
    const mockTree = {
      type: 'root',
      children: [
        { type: 'element', tagName: 'h1', properties: {}, children: [{ type: 'text', value: 'Heading 1' }] },
        { type: 'element', tagName: 'h2', properties: {}, children: [{ type: 'text', value: 'Heading 2' }] },
        { type: 'element', tagName: 'h3', properties: {}, children: [{ type: 'text', value: 'Heading 3' }] },
      ],
    };

    const tocNode = addTableOfContents(mockTree, false);
    expect(tocNode).not.toBeNull();
    expect(tocNode.tagName).toBe('ul');
    expect(tocNode.children.length).toBe(3);
  });

  it('inserts the table of contents into the tree', () => {
    const mockTree = {
      type: 'root',
      children: [
        { type: 'element', tagName: 'h1', properties: {}, children: [{ type: 'text', value: 'Heading 1' }] },
        { type: 'element', tagName: 'h2', properties: {}, children: [{ type: 'text', value: 'Heading 2' }] },
      ],
    };

    addTableOfContents(mockTree, true);
    expect(mockTree.children[0].tagName).toBe('ul');
  });

  it('does not generate a table of contents for documents without headings', () => {
    const mockTree = {
      type: 'root',
      children: [
        { type: 'element', tagName: 'p', properties: {}, children: [{ type: 'text', value: 'Paragraph text' }] },
      ],
    };

    const tocNode = addTableOfContents(mockTree, false);
    expect(tocNode).not.toBeNull();
    expect(tocNode.children.length).toBe(0);
  });

})