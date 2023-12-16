import addHeadingIds from '../src/plugins/addHeadingIds';

describe('addHeadingIds', () => {
  beforeEach(() => {
    addHeadingIds()(mockTree);
  });

  const mockTree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'h1',
        children: [{ type: 'text', value: 'First Heading' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'h2',
        children: [{ type: 'text', value: 'Second Heading' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'p',
        children: [{ type: 'text', value: 'The first paragraph, with some text.' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'h3',
        children: [{ type: 'text', value: 'Third Heading' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'p',
        children: [{ type: 'text', value: 'Another paragraph, with a little bit more text.' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'h4',
        children: [{ type: 'text', value: 'Fourth Heading' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'p',
        children: [{ type: 'text', value: 'The third paragraph.' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'h5',
        children: [{ type: 'text', value: 'Fifth Heading' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'p',
        children: [{ type: 'text', value: 'A short paragraph.' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'h6',
        children: [{ type: 'text', value: 'Sixth Heading' }],
        properties: {},
      },
      {
        type: 'element',
        tagName: 'p',
        children: [{ type: 'text', value: 'Another short paragraph.' }],
        properties: {},
      },
    ],
  };

  it('should add IDs to h1 elements', () => {
    expect(mockTree.children[0].properties.id).toBe('first-heading');
  });

  it('should add IDs to h2 elements', () => {
    expect(mockTree.children[1].properties.id).toBe('second-heading');
  });

  it('should add IDs to h3 elements', () => {
    expect(mockTree.children[3].properties.id).toBe('third-heading');
  });

  it('should add IDs to h4 elements', () => {
    expect(mockTree.children[5].properties.id).toBe('fourth-heading');
  });

  it('should add IDs to h5 elements', () => {
    expect(mockTree.children[7].properties.id).toBe('fifth-heading');
  });

  it('should add IDs to h6 elements', () => {
    expect(mockTree.children[9].properties.id).toBe('sixth-heading');
  });

  it('should not add IDs to non-heading elements', () => {
    expect(mockTree.children[2].properties.id).toBe(undefined);
    expect(mockTree.children[4].properties.id).toBe(undefined);
    expect(mockTree.children[6].properties.id).toBe(undefined);
    expect(mockTree.children[8].properties.id).toBe(undefined);
    expect(mockTree.children[10].properties.id).toBe(undefined);
  });
});
