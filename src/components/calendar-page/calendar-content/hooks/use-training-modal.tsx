import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { closeTrainingModal, openTrainingModal } from '@redux/slices/training-modal/training-modal';
import { type MouseEventHandler, useEffect, useRef, useState } from 'react';

import type { Coords } from './use-training-modal.types';

export const useTrainingModal = (
    calendarWrapper: HTMLDivElement | null,
    breakpoint: boolean | undefined,
) => {
    const [coords, setCoords] = useState<Coords>({
        top: 0,
        left: 0,
    });
    const dispatch = useAppDispatch();
    const container = useRef<HTMLElement | null>(null);

    useEffect(() => {
        dispatch(closeTrainingModal());
    }, [breakpoint, dispatch]);

    const handleTrainingModalOpen: MouseEventHandler<HTMLDivElement> = (e) => {
        dispatch(openTrainingModal());

        let coords: Coords = {
            top: 0,
        };

        if (calendarWrapper) {
            const trainingCardWidth = 264;
            const marginX = 4;
            const cellMask = e.currentTarget;

            const { x: cellMaskX, bottom: cellMaskBottom } = cellMask.getBoundingClientRect();
            const { top: wrapperTop, right: wrapperRight } =
                calendarWrapper.getBoundingClientRect();

            if (breakpoint) {
                container.current = cellMask.closest('td');

                const x = cellMask.offsetLeft + marginX;
                const top = cellMask.offsetTop;
                coords =
                    cellMaskX + trainingCardWidth >= wrapperRight
                        ? { right: x, top }
                        : { left: x, top };
            } else {
                container.current = calendarWrapper;
                coords = { top: cellMaskBottom - wrapperTop };
            }

            setCoords(coords);
        }
    };

    return {
        coords,
        container: container.current,
        handleTrainingModalOpen,
    };
};
