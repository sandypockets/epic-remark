import { processMarkdown } from '../dist/index.cjs';

describe('github flavoured markdown plugin (gfm)', () => {
  it('should convert markdown tables to HTML tables', async () => {
    const markdown = `| Header1 | Header2 |\n| ------- | ------- |\n| Cell1   | Cell2   |`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('<table>');
    expect(result.contentHtml).toContain('<th>Header1</th>');
    expect(result.contentHtml).toContain('<td>Cell1</td>');
  });

  it('should process GFM correctly', async () => {
    const markdown = `This is ~~strikethrough~~ and **bold HTML**`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('<del>strikethrough</del>');
    expect(result.contentHtml).toContain('<strong>bold HTML</strong>');
  });
})