import { type Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { type ReactNode } from 'react';

type Breakpoints = Partial<Record<Breakpoint, boolean>>;

export type Direction = 'row' | 'column';
export type Justify = 'justifyStart' | 'justifyCenter' | 'justifyEnd';
export type Align = 'alignStart' | 'alignCenter' | 'alignEnd';
export type Gap = 'gap4' | 'gap8' | 'gap12' | 'gap14' | 'gap16' | 'gap18' | 'gap20' | 'gap24';

type DirectionWithBreakpoint = Direction | Partial<Record<Breakpoint, Direction>>;
type JustifyWithBreakpoint = Justify | Partial<Record<Breakpoint, Justify>>;
type AlignWithBreakpoint = Align | Partial<Record<Breakpoint, Align>>;
type GapWithBreakpoint = Gap | Partial<Record<Breakpoint, Gap>>;

type AdditionalClassNames = {
    className?: string;
    direction?: DirectionWithBreakpoint;
    justify?: JustifyWithBreakpoint;
    align?: AlignWithBreakpoint;
    gap?: GapWithBreakpoint;
};

export type FlexProps = {
    children: ReactNode;
} & AdditionalClassNames;

export type ClassNameType =
    | FlexProps['direction']
    | FlexProps['justify']
    | FlexProps['align']
    | FlexProps['gap'];

export type CreateFlexClassNamesType = (
    breakpoints: Breakpoints,
    additionalClassNames: AdditionalClassNames,
) => string[];
