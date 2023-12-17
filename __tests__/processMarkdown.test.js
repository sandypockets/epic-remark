import { processMarkdown } from '../dist/index.cjs';

describe('processMarkdown with options', () => {
  it('should add IDs to headings in Markdown content', async () => {
    const markdown = `# First Heading\n## Second Heading`;
    const options = { addHeadingIds: true };

    const result = await processMarkdown(markdown, options);
    const htmlOutput = result.contentHtml;

    expect(htmlOutput).toContain('<h1 id="first-heading">First Heading</h1>');
    expect(htmlOutput).toContain('<h2 id="second-heading">Second Heading</h2>');
  });

  it('should generate a table of contents', async () => {
    const markdown = `# Header1\n## Header2`;
    const options = { addTableOfContents: true };

    const result = await processMarkdown(markdown, options);
    const htmlOutput = result.toc;

    expect(htmlOutput).toContain('<ul class="toc markdown">');
    expect(htmlOutput).toContain('<li><a href="#header1">Header1</a></li>');
    expect(htmlOutput).toContain('<li><a href="#header2">Header2</a></li>');
  });

  it('should calculate reading time', async () => {
    const markdown = `This is a test paragraph to calculate reading time.`;
    const options = { calculateReadingTime: true };

    const result = await processMarkdown(markdown, options);

    expect(result.readingTime).toBeDefined();
    expect(typeof result.readingTime).toBe('number');
  });

  it('should process youtube embeds correctly', async () => {
    const markdown = `!embed https://www.youtube.com/watch?v=zRpsRKuyi3Y`;
    const options = { renderEmbeds: true };

    const result = await processMarkdown(markdown, options);
    const htmlOutput = result.contentHtml;

    expect(htmlOutput).toContain('class="epic-remark-youtube"');
    expect(htmlOutput).toContain('src="https://www.youtube.com/embed/zRpsRKuyi3Y"');
    expect(htmlOutput).toContain('<iframe');
    expect(htmlOutput).toContain('iframe>');
  });

  it('should process github gist embeds correctly', async () => {
    const markdown = `!embed https://gist.github.com/sandypockets/f37072055678da1eab8643567600717b`;
    const options = { renderEmbeds: true };

    const result = await processMarkdown(markdown, options);
    const htmlOutput = result.contentHtml;

    expect(htmlOutput).toContain('class="epic-remark-gist"');
    expect(htmlOutput).toContain('src="https://gist.github.com/sandypockets/f37072055678da1eab8643567600717b.pibb"');
    expect(htmlOutput).toContain('<iframe');
    expect(htmlOutput).toContain('iframe>');
  });

  it('should handle multiple options correctly', async () => {
    const markdown = `# Heading\nThis is a test paragraph. ![Image](img.jpg)`;
    const options = { addHeadingIds: true, calculateReadingTime: true, wrapConfig: { img: 'custom-class' } };

    const result = await processMarkdown(markdown, options);
    expect(result.contentHtml).toContain('<h1 id="heading">Heading</h1>');
    expect(result.contentHtml).toContain('<div class="custom-class"><img');
    expect(typeof result.readingTime).toBe('number');
  });

  it('should handle multiple options with debug mode correctly', async () => {
    const markdown = `# Heading\nThis is a test paragraph. ![Image](img.jpg)`;
    const options = { debug: true, addHeadingIds: true, calculateReadingTime: true, wrapConfig: { img: 'custom-class' } };

    const result = await processMarkdown(markdown, options);
    expect(result.contentHtml).toContain('<h1 id="heading">Heading</h1>');
    expect(result.contentHtml).toContain('<div class="custom-class"><img');
    expect(typeof result.readingTime).toBe('number');
  });

  it('should return basic HTML when only debug is true (same behaviour as when debug is false)', async () => {
    const markdown = `Just some text.`;
    const options = { debug: true };

    const result = await processMarkdown(markdown, options);
    expect(result.contentHtml).toBe('<div class="markdown"><p>Just some text.</p></div>');
  });

  it('should apply custom wrappers correctly', async () => {
    const markdown = `![alt text](image.jpg)`;
    const options = { wrapConfig: { img: 'custom-class' } };
    const result = await processMarkdown(markdown, options);

    expect(result.contentHtml).toContain('<div class="custom-class"><img');
  });

  it('should return basic HTML when no options are provided', async () => {
    const markdown = `Just some text.`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toBe('<div class="markdown"><p>Just some text.</p></div>');
  });
})


describe("processMarkdown basic output", () => {
  it('should wrap top level content in a div with markdown class', async () => {
    const markdown = `Just some text.`;
    const result = await processMarkdown(markdown);
    const htmlOutput = result.contentHtml;

    expect(htmlOutput).toContain('<div class="markdown"><p>Just some text.</p></div>');
  });

  it('should wrap top level content in a div with markdown class, even with complex children', async () => {
    const markdown = `# First heading\n ## Second heading\n Just some paragraph text.`;
    const result = await processMarkdown(markdown);
    const htmlOutput = result.contentHtml;

    expect(htmlOutput).toContain('<div class="markdown"><h1>First heading</h1>\n<h2>Second heading</h2>\n<p>Just some paragraph text.</p></div>');
  });

  it('should handle invalid markdown gracefully', async () => {
    const invalidMarkdown = `#This is not valid markdown`;
    const result = await processMarkdown(invalidMarkdown);

    expect(result.contentHtml).toContain('<p>#This is not valid markdown</p>');
  });

  it('should handle complex markdown structures', async () => {
    const markdown = `# Heading1\n## Heading2\n- List item 1\n  - Nested list item\n> Blockquote`;
    const result = await processMarkdown(markdown);

    expect(result.contentHtml).toContain('<h1>Heading1</h1>');
    expect(result.contentHtml).toContain('<h2>Heading2</h2>');
    expect(result.contentHtml).toContain('<ul>');
    expect(result.contentHtml).toContain('<blockquote>');
  });

  it('should process image embeds correctly', async () => {
    const markdown = `![alt text](image.jpg)`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('<img src="image.jpg" alt="alt text">');
  });

});


describe("processMarkdown with special cases", () => {
  it('should return an empty string for empty content', async () => {
    const markdown = ``;
    const result = await processMarkdown(markdown);

    expect(result.contentHtml).toBe('');
  });

  it('should handle complex nested markdown structures', async () => {
    const markdown = `1. First item\n   - Nested item\n      > Nested blockquote`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('<ol>');
    expect(result.contentHtml).toContain('<ul>');
    expect(result.contentHtml).toContain('<blockquote>');
  });

  it('should convert markdown links to anchor tags', async () => {
    const markdown = `[OpenAI](https://openai.com)`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('<a href="https://openai.com">OpenAI</a>');
  });

  it('should handle special characters and HTML entities', async () => {
    const markdown = `Special &amp; Characters <, >, &`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('Special &#x26; Characters &#x3C;, >, &#x26');
  });

  it('should handle edge cases for embeds', async () => {
    const markdown = `!embed invalid_url`;
    const options = { renderEmbeds: true };
    const result = await processMarkdown(markdown, options);
    expect(result.contentHtml).not.toContain('<iframe');
    expect(result.contentHtml).toContain('<p>!embed')
  });

  it('should process markdown quotes correctly', async () => {
    const markdown = `> Blockquote\n"This is an inline quote"`;
    const result = await processMarkdown(markdown);
    expect(result.contentHtml).toContain('<blockquote>');
  });
});