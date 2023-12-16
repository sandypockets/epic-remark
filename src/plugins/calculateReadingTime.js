import visit from '../helpers/visit.js';

export default function calculateReadingTime(options = {}) {
  const wordsPerMinute = options.wordsPerMinute || 250;

  return tree => {
    let wordCount = 0;

    visit(tree, 'text', node => {
      wordCount += node.value.split(/\s+/).length;
    });

    return Math.ceil(wordCount / wordsPerMinute);
  };
}
