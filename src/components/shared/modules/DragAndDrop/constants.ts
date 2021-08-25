import gsap from 'gsap';

import {
  DragAndDropZones,
  DropZone,
  HitTest,
  GetZoneElement,
} from '$components/shared/modules/DragAndDrop/types';

export const CLONE_ID = 'clone';
export const DATA_VALUE = 'data-value';
export const ELEMENT_KEY = 'element-key';
export const INTO_SCROLLABLE_AREA = 'into-scrollable-area';

export const pressTransition = {
  scale: 0.8,
  zIndex: '+=1000',
  duration: 0.2,
};

const openTheCapProp = {
  rotation: 90,
  y: '-50px',
  x: '250px',
};

const closeTheCapProp = {
  rotation: 0,
  y: '0',
  x: '0',
};

export const defaultRemovingDropZone: DropZone = {
  zoneId: DragAndDropZones.dropZone,
  hitRatio: '10%',
};

export const defaultRemovingActions = {
  onDrag: (
    trashAnimate: gsap.core.Timeline,
    hitTest: HitTest,
    getZoneElement: GetZoneElement,
  ) => {
    trashAnimate.play();

    if (hitTest({ ...defaultRemovingDropZone, hitRatio: '0.1%' })) {
      trashAnimate.reverse();
    }

    const capProp = hitTest({ ...defaultRemovingDropZone, hitRatio: '10%' })
      ? openTheCapProp
      : closeTheCapProp;

    const defaultRemovingDropElement = getZoneElement(defaultRemovingDropZone.zoneId)!;

    gsap.to(defaultRemovingDropElement.children[0] as ChildNode, capProp);
  },
  onDragEnd: (trashAnimate: gsap.core.Timeline) => {
    trashAnimate.reverse();
  },
  onDrop: (dropZoneElement: Element) => {
    gsap.to(dropZoneElement.children[0], closeTheCapProp);
  },
};
