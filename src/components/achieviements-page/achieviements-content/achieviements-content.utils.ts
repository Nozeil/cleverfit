export const findWordsOccurrenceCount = (arr: string[]) => {
    const words = new Map<string, { name: string; count: number }>();

    arr.forEach((item) => {
        const word = words.get(item);

        if (words.has(item) && word) {
            const count = word.count + 1;

            words.set(item, { name: item, count });
        } else {
            words.set(item, { name: item, count: 1 });
        }
    });

    return words;
};

export const findMostFrequentWord = (arr: string[]) => {
    const words = findWordsOccurrenceCount(arr);
    const mostFrequentWord = { word: '', count: 0 };

    words.forEach(({ name, count }) => {
        if (count > mostFrequentWord.count) {
            mostFrequentWord.word = name;
            mostFrequentWord.count = count;
        }
    });

    return mostFrequentWord.word;
};
