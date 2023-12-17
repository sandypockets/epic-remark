import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Build Exports', () => {
  it('should export processMarkdown for both CommonJS and ESM builds', async () => {
    const cjsBuild = await import(join(__dirname, '../dist/index.cjs'));
    const esmBuild = await import(join(__dirname, '../dist/index.esm.js'));

    expect(cjsBuild).toBeDefined();
    expect(typeof cjsBuild.processMarkdown).toBe('function');

    expect(esmBuild).toBeDefined();
    expect(typeof esmBuild.processMarkdown).toBe('function');
  });

  it('should export addHeadingIds for both CommonJS and ESM builds', async () => {
    const cjsBuild = await import(join(__dirname, '../dist/index.cjs'));
    const esmBuild = await import(join(__dirname, '../dist/index.esm.js'));

    expect(cjsBuild).toBeDefined();
    expect(typeof cjsBuild.addHeadingIds).toBe('function');

    expect(esmBuild).toBeDefined();
    expect(typeof esmBuild.addHeadingIds).toBe('function');
  });

  it('should export addTableOfContents for both CommonJS and ESM builds', async () => {
    const cjsBuild = await import(join(__dirname, '../dist/index.cjs'));
    const esmBuild = await import(join(__dirname, '../dist/index.esm.js'));

    expect(cjsBuild).toBeDefined();
    expect(typeof cjsBuild.addTableOfContents).toBe('function');

    expect(esmBuild).toBeDefined();
    expect(typeof esmBuild.addTableOfContents).toBe('function');
  });

  it('should export calculateReadingTime for both CommonJS and ESM builds', async () => {
    const cjsBuild = await import(join(__dirname, '../dist/index.cjs'));
    const esmBuild = await import(join(__dirname, '../dist/index.esm.js'));

    expect(cjsBuild).toBeDefined();
    expect(typeof cjsBuild.calculateReadingTime).toBe('function');

    expect(esmBuild).toBeDefined();
    expect(typeof esmBuild.calculateReadingTime).toBe('function');
  });

  it('should export embed for both CommonJS and ESM builds', async () => {
    const cjsBuild = await import(join(__dirname, '../dist/index.cjs'));
    const esmBuild = await import(join(__dirname, '../dist/index.esm.js'));

    expect(cjsBuild).toBeDefined();
    expect(typeof cjsBuild.embed).toBe('function');

    expect(esmBuild).toBeDefined();
    expect(typeof esmBuild.embed).toBe('function');
  });

  it('should export wrapElements for both CommonJS and ESM builds', async () => {
    const cjsBuild = await import(join(__dirname, '../dist/index.cjs'));
    const esmBuild = await import(join(__dirname, '../dist/index.esm.js'));

    expect(cjsBuild).toBeDefined();
    expect(typeof cjsBuild.wrapElements).toBe('function');

    expect(esmBuild).toBeDefined();
    expect(typeof esmBuild.wrapElements).toBe('function');
  });
});
