import { DATE_FORMATS } from '@constants/index';
import { capitalizeFirstLetter, formatDate } from '@utils/utils';

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

export const createEmptyDay = (momentDate: moment.Moment) => {
    const sunday = 7;
    const { iso, formated } = formatDate(momentDate);
    const dm = momentDate.format(DATE_FORMATS.DM);
    const dayOfTheWeek = momentDate.day() || sunday;
    const dayOfTheWeekReadable = capitalizeFirstLetter(momentDate.format('dddd'));

    return {
        date: iso,
        dm,
        dmy: formated,
        dayOfTheWeek,
        dayOfTheWeekReadable,
        trainingNames: [],
        exerciseNames: [],
        load: 0,
        averageLoad: 0,
        replays: 0,
        approaches: 0,
    };
};
