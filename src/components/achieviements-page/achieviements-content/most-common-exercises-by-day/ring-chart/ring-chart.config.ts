import { type PieConfig } from '@ant-design/charts';
import { FONT_FAMILY } from '../../achieviements-content.constants';

export const createConfig = (breakpoint?: boolean) => {
    const configParams = breakpoint
        ? {
              width: 520,
              height: 334,
              inset: 72,
          }
        : { width: 328, height: 211, inset: 12 };

    const config: PieConfig = {
        ...configParams,
        innerRadius: 0.7,
        angleField: 'percent',
        colorField: 'name',
        label: {
            text: 'name',
            position: 'outside',
            connector: false,
            hyphens: 'auto',
            style: {
                fontFamily: FONT_FAMILY,
                fontSize: breakpoint ? 14 : 12,
                fill: '#262626',
                fillOpacity: 1,
            },
        },
        legend: false,
        tooltip: false,
        style: {
            stroke: '#ffffff',
        },
    };

    return config;
};
