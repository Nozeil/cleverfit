import type { ClassNameType, CreateFlexClassNamesType } from './flex.types';

import styles from './flex.module.css';

export const createFlexClassNames: CreateFlexClassNamesType = (
    { xxl, xl, lg, md, sm, xs },
    { direction, justify, align, gap },
) => {
    const stylesClassNames = { direction: '', justify: '', align: '', gap: '' };

    const classNamesWithKeys: Array<{
        key: keyof typeof stylesClassNames;
        className: ClassNameType;
    }> = [
        { key: 'direction', className: direction },
        { key: 'justify', className: justify },
        { key: 'align', className: align },
        { key: 'gap', className: gap },
    ];

    classNamesWithKeys.forEach(({ key, className }) => {
        if (typeof className === 'string') {
            stylesClassNames[key] = styles[className];
        } else {
            if (xs && className?.xs) {
                stylesClassNames[key] = styles[className.xs];
            }

            if (sm && className?.sm) {
                stylesClassNames[key] = styles[className.sm];
            }

            if (md && className?.md) {
                stylesClassNames[key] = styles[className.md];
            }

            if (lg && className?.lg) {
                stylesClassNames[key] = styles[className.lg];
            }

            if (xl && className?.xl) {
                stylesClassNames[key] = styles[className.xl];
            }

            if (xxl && className?.xxl) {
                stylesClassNames[key] = styles[className.xxl];
            }
        }
    });

    return Object.values(stylesClassNames);
};
