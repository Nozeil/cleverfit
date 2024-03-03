export type FeedbackFormProps = {
    disableSubmit: (disable: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
};

export type OnFinishFeedbackValues = {
    message: string;
    rating: number;
};
