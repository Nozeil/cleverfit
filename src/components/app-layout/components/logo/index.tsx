import { Image } from 'antd';
import LogoBase from '/svg/logo.svg';
import LogoCropped from '/svg/logo-cropped.svg';

import './index.css';

interface LogoProps {
    isBreakpoint: boolean;
    cropped: boolean;
}

export const Logo = ({ cropped, isBreakpoint }: LogoProps) => {
    let src = LogoBase;

    if (cropped && !isBreakpoint) {
        src = LogoCropped;
    }

    return <Image src={src} preview={false} alt='logo' />;
};
