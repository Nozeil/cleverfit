import moment from 'moment'

export type TrainingInfoFormValues = {
    name: string;
    date: moment.Moment;
    period?: number;
};
