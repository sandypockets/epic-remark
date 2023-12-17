import { processMarkdown } from '../dist/index.cjs';

describe('front matter processing', () => {
  it('should extract various data types in front matter', async () => {
    const markdown = `---
title: "Title"
number: 123
array: [1, 2, 3]
object: { key: 'value' }
---
Content`;
    const result = await processMarkdown(markdown);
    expect(result.frontMatter).toEqual({ title: "Title", number: 123, array: [1, 2, 3], object: { key: 'value' } });
  });

  it('should correctly extract front matter', async () => {
    const markdown = `---
title: "Test Title"
---
Content goes here.`;
    const result = await processMarkdown(markdown);
    expect(result.frontMatter).toEqual({ title: "Test Title" });
    expect(result.contentHtml).toContain('<p>Content goes here.</p>');
  });
})