import antLocale from 'antd/es/calendar/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

export const locale: PickerLocale = {
    ...antLocale,
    lang: {
        ...antLocale.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: { ...antLocale.timePickerLocale },
};
