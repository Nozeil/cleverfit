import { Button } from 'antd';
import ExitIcon from '@components/icons/exit-icon';

import './index.styles.css';

const ExitButton = () => {
    return (
        <Button block size='large' icon={<ExitIcon width={16} height={16} />}>
            Выход
        </Button>
    );
};

export default ExitButton;
