import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import { compact, isEmpty, last, isNil } from 'lodash';

import {
  CLONE_ID,
  DATA_VALUE,
  defaultRemovingDropZone,
  ELEMENT_KEY,
  INTO_SCROLLABLE_AREA,
} from '$sharedModules/DragAndDrop/constants';
import {
  DraggableConfig,
  DragAndDropZones,
  ResolvedDropZones,
  DropZone,
} from '$sharedModules/DragAndDrop/types';

interface IZonesAndElements {
  dndZone: Element;
  /**
   * first element of dropZones array is defaultRemovingDropZone
   */
  dropZones: ResolvedDropZones;
  scrollWrapperElement?: Element;
  candidateDraggableElements: NodeListOf<Element>;
}

/**
 * @param fieldName dragElements suffix
 * @param customDropZones optional dropZones that user defined
 * @returns IZonesAndElements
 */
export const getZonesAndElements = (
  fieldName: string,
  customDropZones?: DropZone[],
): IZonesAndElements | null => {
  // Consider the nearest element that include dndZone id as the zone
  const dndZone = last(document.querySelectorAll(`#${DragAndDropZones.dndZone}`));

  // Consider the nearest element that include scrollWrapper id
  const scrollWrapperElement = last(
    document.querySelectorAll(`#${DragAndDropZones.scrollWrapper}`),
  );

  // Get draggable elements of specific fieldName
  const candidateDraggableElements = document.querySelectorAll(
    `#${DragAndDropZones.dragBox}-${fieldName}`,
  );

  const additionalZones = customDropZones
    ? compact(
        customDropZones.map((customDropZone) => {
          const customDropZoneElement = getDropZoneElement(customDropZone.zoneId);
          if (customDropZoneElement) {
            return {
              ...customDropZone,
              element: customDropZoneElement,
            };
          }
        }),
      )
    : [];

  const defaultRemovingDropZoneElement = getDropZoneElement(DragAndDropZones.dropZone);

  const dropZones: ResolvedDropZones = {
    ...(defaultRemovingDropZoneElement && {
      defaultRemoving: {
        ...defaultRemovingDropZone,
        element: defaultRemovingDropZoneElement,
      },
    }),
    additionalDropZones: additionalZones,
  };

  const noDropZone = isEmpty(additionalZones) && isNil(defaultRemovingDropZone);

  if (isEmpty(candidateDraggableElements) || isNil(dndZone) || noDropZone) {
    return null;
  }

  return {
    dndZone,
    dropZones,
    scrollWrapperElement,
    candidateDraggableElements,
  };
};

export const getFieldValue = (element: Element): string | null =>
  element.getAttribute(DATA_VALUE);

export const trashIconShaking = (trashElement: Element): gsap.core.Timeline => {
  gsap.set(trashElement?.children[0] as ChildNode, { transformOrigin: 'center' });

  return gsap
    .timeline({ repeat: -1, paused: true, yoyo: true })
    .to(trashElement, { duration: 0.5, rotation: 15 })
    .to(trashElement, { duration: 0.5, rotation: -15 });
};

const setElementKey = (element: Element): void => {
  const key = Date.now().toString();
  element.setAttribute(ELEMENT_KEY, key);
};

export const createDraggableElement = (
  element: Element,
  dragConfig: DraggableConfig,
  scrollWrapperElement?: Element,
): Draggable => {
  const isWrappedByScrollableArea = element.getAttribute(INTO_SCROLLABLE_AREA);

  const elementKey = getElementDnDKey(element);

  if (!isWrappedByScrollableArea || !scrollWrapperElement) {
    if (!elementKey) {
      setElementKey(element);
    }

    return Draggable.create(element, dragConfig)[0];
  }

  let clonedElement: Element;

  if (elementKey) {
    clonedElement = getDraggableCloneElement(elementKey)!;
  } else {
    setElementKey(element);

    clonedElement = element.cloneNode(true) as Element;

    gsap.set(clonedElement, {
      position: 'absolute',
      opacity: 0,
      left: 0,
      visibility: 'hidden',
    });

    scrollWrapperElement.prepend(clonedElement);

    // Remove id from the cloned element
    clonedElement.setAttribute('id', CLONE_ID);
  }

  const draggableElement = Draggable.create(clonedElement, dragConfig)[0];

  element.addEventListener(
    'mousedown',
    getDraggingCloneListener(element, draggableElement),
  );
  element.addEventListener(
    'touchstart',
    getDraggingCloneListener(element, draggableElement),
  );

  return draggableElement;
};

const getDraggingCloneListener =
  (originalElement: Element, draggableElement: Draggable) => (event) => {
    const position = getPosition(originalElement);

    gsap.set(originalElement, { autoAlpha: 0 });

    gsap.set(draggableElement.target, {
      ...position,
      autoAlpha: 1,
    });

    draggableElement.startDrag(event);
  };

const getPosition = (element: Element): { x: number; y: number } => {
  const position = getOffset(element.parentElement?.parentElement!);
  const offset = getOffset(element);

  return {
    x: offset.left - position.left,
    y: offset.top - position.top,
  };
};

const getOffset = (element: Element): { top: number; left: number } => {
  const { top, left } = element.getBoundingClientRect();

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
  };
};

const getDraggableCloneElement = (elKey: string): Element | undefined => {
  const clonedElements = Array.from(document.querySelectorAll(`#${CLONE_ID}`));

  if (isEmpty(clonedElements)) {
    return;
  }

  const targetCloneElement = clonedElements.find(
    (cloneElement) => getElementDnDKey(cloneElement) === elKey,
  );

  if (isEmpty(targetCloneElement)) {
    return;
  }

  return targetCloneElement;
};

export const getElementDnDKey = (element?: Element): string | null => {
  if (!element) {
    return null;
  }

  const keyCandidate = element.getAttribute && element.getAttribute(ELEMENT_KEY);

  return keyCandidate ?? getElementDnDKey(element.parentNode as Element);
};

export const startDrag = (e?: Event): void => {
  if (!e) {
    return;
  }

  const key = getElementDnDKey((e.currentTarget as any).parentNode);

  const draggableElement = Draggable.get(`[${ELEMENT_KEY}="${key}"]`);

  draggableElement.enable();
  draggableElement.startDrag(e);
};

export const getDropZoneElement = (dropZoneId: string): Element | undefined => {
  return last(document.querySelectorAll(`[data-zone-id=${dropZoneId}]`));
};
