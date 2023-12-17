import wrapElements from '../src/plugins/wrapElements';

describe('wrapElements', () => {
  it('wraps specified elements with a div', () => {
    const mockTree = {
      type: 'root',
      children: [
        { type: 'element', tagName: 'img', properties: {}, children: [] },
        { type: 'element', tagName: 'table', properties: {}, children: [] },
      ],
    };

    const options = {
      img: 'epic-remark-image',
      table: 'epic-remark-table',
    };
    wrapElements(options)(mockTree);

    expect(mockTree.children[0].type).toBe('element');
    expect(mockTree.children[0].tagName).toBe('div');
    expect(mockTree.children[0].properties.className).toBe('epic-remark-image');
    expect(mockTree.children[1].properties.className).toBe('epic-remark-table');
  });


  it('does not wrap elements if options is empty', () => {
    const mockTree = {
      type: 'root',
      children: [
        { type: 'element', tagName: 'img', properties: {}, children: [] },
        { type: 'element', tagName: 'table', properties: {}, children: [] },
      ],
    };

    const emptyOptions = {};
    wrapElements(emptyOptions)(mockTree);

    expect(mockTree.children[0].tagName).toBe('img');
    expect(mockTree.children[1].tagName).toBe('table');
  });


  it('handles undefined or null node children safely', () => {
    const mockTree = {
      type: 'root',
      children: null,
    };

    const options = {
      img: 'epic-remark-image',
    };

    expect(() => wrapElements(options)(mockTree)).not.toThrow();
  });


  it('ignores non-element nodes', () => {
    const mockTree = {
      type: 'root',
      children: [
        { type: 'text', value: 'Just some text' },
        { type: 'element', tagName: 'img', properties: {}, children: [] },
      ],
    };

    const options = {
      img: 'epic-remark-image',
    };

    wrapElements(options)(mockTree);

    expect(mockTree.children[0].type).toBe('text');
    expect(mockTree.children[1].tagName).toBe('div');
    expect(mockTree.children[1].properties.className).toBe('epic-remark-image');
  });
});
