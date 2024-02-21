import { useState } from 'react';
import VerificationInput from 'react-verification-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '@services/api';
import { COMPOUND_ROUTES } from '@constants/routes';

import styles from './custom-verification-input.module.css';

interface CustomVerificationInputProps {
    isError: boolean;
    setIsError: (isError: boolean) => void;
}

const CustomVerificationInput = ({ isError, setIsError }: CustomVerificationInputProps) => {
    const [input, setInput] = useState('');
    const [confirmEmail] = useConfirmEmailMutation();
    const navigate = useNavigate();
    const { state } = useLocation();

    const onChange = (value: string) => setInput(value);

    const onComplete = async (code: string) => {
        if (state?.email) {
            try {
                await confirmEmail({ email: state.email, code }).unwrap();
                navigate(COMPOUND_ROUTES.AUTH_CHANGE_PASSWORD);
            } catch {
                setIsError(true);
                setInput('');
            }
        }
    };

    const verificationInputClassNames = isError
        ? {
              character: styles.inputError,
              characterSelected: styles.inputSelectedError,
          }
        : {
              character: styles.input,
              characterSelected: styles.inputSelected,
          };

    return (
        <VerificationInput
            classNames={{
                container: styles.container,
                characterInactive: styles.input,
                ...verificationInputClassNames,
            }}
            placeholder=''
            value={input}
            onComplete={onComplete}
            onChange={onChange}
        />
    );
};

export default CustomVerificationInput;
