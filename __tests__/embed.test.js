import embed from "../src/plugins/embed";

describe("embed functionality", () => {
  it('embeds a GitHub Gist correctly', () => {
    const mockTree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'text', value: '!embed ' },
            {
              type: 'element',
              tagName: 'a',
              properties: { href: 'https://gist.github.com/user/gistid' },
              children: [{ type: 'text', value: 'Gist link' }],
            },
          ],
        },
      ],
    };
    embed()(mockTree);

    expect(mockTree.children[0].type).toBe('raw');
    expect(mockTree.children[0].value).toContain('https://gist.github.com/user/gistid.pibb');
  });


  it('embeds a YouTube video correctly', () => {
    const mockTree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'text', value: '!embed ' },
            {
              type: 'element',
              tagName: 'a',
              properties: { href: 'https://www.youtube.com/watch?v=videoId' },
              children: [{ type: 'text', value: 'YouTube link' }],
            },
          ],
        },
      ],
    };

    embed()(mockTree);

    expect(mockTree.children[0].type).toBe('raw');
    expect(mockTree.children[0].value).toContain('https://www.youtube.com/embed/videoId');
  });

  it('ignores unsupported embed types', () => {
    const mockTree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'text', value: '!embed ' },
            {
              type: 'element',
              tagName: 'a',
              properties: { href: 'https://unsupported.com' },
              children: [{ type: 'text', value: 'Unsupported link' }],
            },
          ],
        },
      ],
    };

    embed()(mockTree);

    expect(mockTree.children[0].type).not.toBe('raw');
    expect(mockTree.children[0].tagName).toBe('p');
  });

})