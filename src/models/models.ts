export type ErrorResponse = {
    status: number;
    data: { statusCode: number; error: string; message: string };
};

export type AuthUserBody = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

export type CheckEmailBody = {
    email: string;
};

export type CheckEmailResponse = {
    email: string;
    message: string;
};

export type ConfirmEmailBody = {
    email: string;
    code: string;
};

export type ConfirmEmailResponse = {
    email: string;
    message: string;
};

export type ChangePasswordBody = {
    password: string;
    confirmPassword: string;
};

export type ChangePasswordResponse = {
    message: string;
};

export type Feedback = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string;
    rating: number;
    createdAt: string;
};

export type GetFeedbacksResponse = Feedback[];

export type CreateFeedbackBody = {
    message: string;
    rating: number;
};

type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: [
        {
            _id: string;
            name: string;
            replays: number;
            weight: number;
            approaches: number;
            isImplementation: boolean;
        },
    ];
};

export type GetTrainingResponse = Training[];

export type GetTrainingQueryParams = {
    name?: string;
};

type TrainingListItem = {
    name: string;
    key: string;
};

export type TrainingListResponse = TrainingListItem[];
