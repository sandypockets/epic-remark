import calculateReadingTime from '../src/plugins/calculateReadingTime';

function generateRandomWord() {
  const possibleCharacters = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
  return possibleCharacters[randomIndex];
}

// Assuming an average word count of 5 characters, this will generate 500 words
const markdownContent = new Array(500).fill(`${generateRandomWord()} `).join("");

describe('calculateReadingTime functionality', () => {
  it('calculates reading time with default WPM', () => {
    const tree = { type: 'root', children: [{ type: 'text', value: markdownContent }] };
    const readingTime = calculateReadingTime()(tree);
    // Default WPM is 250, so 500 words should take about 2 minutes, rounded up to 3 minutes
    expect(readingTime).toBe(3);
  });

  it('calculates reading time with custom WPM', () => {
    const customWPM = 100;
    const tree = { type: 'root', children: [{ type: 'text', value: markdownContent }] };
    const readingTime = calculateReadingTime({ wordsPerMinute: customWPM })(tree);
    // Custom WPM is 100, so 500 words should take about 5 minutes, rounded up to 6
    expect(readingTime).toBe(6);
  });

  it('handles empty content', () => {
    const tree = { type: 'root', children: [{ type: 'text', value: "" }] };
    const readingTime = calculateReadingTime()(tree);
    // Why would you have an empty document? I don't know, but it gets rounded up to 1 minute.
    expect(readingTime).toBe(1);
  });
});
