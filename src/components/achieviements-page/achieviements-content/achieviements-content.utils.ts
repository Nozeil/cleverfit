export const findMostFrequentWord = (arr: string[]) => {
  const words = new Map();
  const mostFrequentWord = { word: '', count: 0 };

  arr.forEach((item) => {
      if (words.has(item)) {
          const count = words.get(item) + 1;

          words.set(item, count);
      } else {
          words.set(item, 1);
      }
  });

  words.forEach((count, word) => {
      if (count > mostFrequentWord.count) {
          mostFrequentWord.word = word;
          mostFrequentWord.count = count;
      }
  });

  return mostFrequentWord.word;
};