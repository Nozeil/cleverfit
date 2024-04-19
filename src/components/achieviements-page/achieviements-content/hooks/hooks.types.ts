export type TrainingsWithSummarizedExercises = Array<{
    date: string;
    trainingNames: string[];
    summarizedExercises: {
        names: string[];
        load: number;
        approaches: number;
        replays: number;
    };
}>;
