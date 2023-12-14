import { processMarkdown } from '../dist/index.js';

describe('addHeadingIds with actual Markdown', () => {
  it('should add IDs to headings in Markdown content', async () => {
    const markdown = `# First Heading\n## Second Heading`;
    const options = { addHeadingIds: true };

    const result = await processMarkdown(markdown, options);
    const htmlOutput = result.contentHtml;

    expect(htmlOutput).toContain('<h1 id="first-heading">First Heading</h1>');
    expect(htmlOutput).toContain('<h2 id="second-heading">Second Heading</h2>');
  });
});
