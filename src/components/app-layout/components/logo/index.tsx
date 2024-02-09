import { Image } from 'antd';
import LogoSrc from '/svg/logo.svg';
import CroppedLogoSrc from '/svg/cropped-logo.svg';

import './index.css';

interface LogoProps {
    cropped: boolean;
}

export const Logo = ({ cropped }: LogoProps) => {
    const src = cropped ? CroppedLogoSrc : LogoSrc;

    return <Image src={src} preview={false} alt='logo' />;
};
