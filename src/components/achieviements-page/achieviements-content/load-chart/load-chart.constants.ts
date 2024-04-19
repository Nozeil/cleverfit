import { type ColumnConfig } from '@ant-design/charts';
import classNames from 'classnames';

import { FONT_FAMILY } from '../achieviements-content.constants';

import styles from './load-chart.module.css';

const lineDash = [2, 4];
const formatter = (value: number) => `${value} кг`;

const cx = classNames.bind(styles);

export const createConfig = (isWeek: boolean, breakpoint?: boolean) => {
    const configParams = breakpoint
        ? {
              width: isWeek ? 518 : undefined,
              height: 318,
              sizeField: 30,
              insetLeft: -18,
              marginTop: 0,
              marginBottom: 6,
          }
        : {
              width: isWeek ? 328 : undefined,
              height: 200,
              sizeField: 20,
              insetLeft: -10,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 8,
          };

    const axisParams = {
        tick: false,
        labelAutoRotate: false,
        labelFontFamily: FONT_FAMILY,
        labelFontSize: breakpoint ? undefined : 7,
    };

    const config: ColumnConfig = {
        className: cx(styles.chart, { [styles.chartWeek]: isWeek }),
        xField: 'dm',
        yField: 'averageLoad',
        colorField: '#85a5ff',
        insetTop: 8,
        scrollbar: isWeek
            ? undefined
            : {
                  x: {
                      ratio: 0.54,
                  },
              },
        ...configParams,

        axis: {
            x: {
                line: true,
                lineLineDash: lineDash,
                labelSpacing: breakpoint ? 16 : 12,
                ...axisParams,
            },
            y: {
                labelFormatter: formatter,
                gridLineDash: lineDash,
                ...axisParams,
            },
        },
        tooltip: {
            name: 'Нагрузка',
            channel: 'y',
            valueFormatter: formatter,
        },
    };

    return config;
};
