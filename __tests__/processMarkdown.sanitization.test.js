import { processMarkdown } from '../dist/index.cjs';

describe('processMarkdown sanitization', () => {
  it('should sanitize script tags in HTML', async () => {
    const markdown = `<script>alert('test')</script>`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).not.toContain('<script>');
  });
})