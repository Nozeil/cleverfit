import { INVITES_STATUS } from '@constants/index';
import { Nullable } from '@typings/utility';

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
    fullName: Nullable<string>;
    imageSrc: Nullable<string>;
    message: string;
    rating: number;
    createdAt: string;
};

export type GetFeedbacksResponse = Feedback[];

export type CreateFeedbackBody = {
    message: string;
    rating: number;
};

export type TrainingExercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

type NewTrainingParameters = {
    repeat: boolean;
    period: Nullable<number>;
    jointTraining: boolean;
    participants: string[];
};

type NewTraining = {
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: NewTrainingParameters;
    exercises: TrainingExercise[];
};

export type TrainingResponse = NewTraining & {
    _id: string;
    exercises: Array<
        TrainingExercise & {
            _id: string;
        }
    >;
};

export type GetTrainingResponse = TrainingResponse[];

export type TrainingListItem = {
    name: string;
    key: string;
};

export type TrainingListResponse = TrainingListItem[];

export type CreateTrainingResponse = TrainingResponse;
export type TrainingBody = Omit<NewTraining, 'userId' | 'parameters'> & {
    parameters?: Partial<NewTrainingParameters>;
};
export type UpdateTrainingArgs = { id: string; body: TrainingBody };

export type UserInfoResponse = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: {
        tariffId: string;
        expired: string;
    };
};

export type UpdateUserBody = Partial<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
}>;

type TariffItem = {
    _id: string;
    name: string;
    periods: Array<{
        text: string;
        cost: number;
        days: number;
    }>;
};

export type TariffListResponse = TariffItem[];

export type BuyTariffBody = {
    tariffId: string;
    days: number;
};

type NonNullableInviteStatus = (typeof INVITES_STATUS)[keyof typeof INVITES_STATUS];

export type InviteStatus = Nullable<NonNullableInviteStatus>;

export type TrainingPal = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: Nullable<string>;
    avgWeightInWeek: number;
    inviteId: string;
    status: InviteStatus;
};

export type TrainingPalsResponse = TrainingPal[];

export type JointTrainingListItem = {
    id: string;
    name: Nullable<string>;
    trainingType: string;
    imageSrc: Nullable<string>;
    avgWeightInWeek: number;
    status: InviteStatus;
    inviteId: Nullable<string>;
};

export type UserJointTrainingListResponse = JointTrainingListItem[];

export type UserJointTrainingListParams = Partial<{
    trainingType: string;
    status: InviteStatus;
}>;

type FromTo = {
    _id: string;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    imageSrc: Nullable<string>;
};

export type Invite = {
    _id: string;
    from: FromTo;
    training: TrainingResponse;
    status: InviteStatus;
    createdAt: string;
};

export type GetInvitesResponse = Invite[];

export type CreateInviteResponse = Invite & {
    to: FromTo;
};

export type CreateInviteBody = { to: string; trainingId: string };

export type UpdateInviteBody = {
    id: string;
    status: Exclude<NonNullableInviteStatus, 'pending'>;
};

export type DeleteInviteParams = {
    id: string;
    status: InviteStatus;
};
