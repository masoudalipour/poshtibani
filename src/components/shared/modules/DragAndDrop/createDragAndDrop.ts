import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import { isNull } from 'lodash';

import { getDragAndDropHandlers } from '$sharedModules/DragAndDrop/getDragAndDropHandlers';
import {
  createDraggableElement,
  getZonesAndElements,
  startDrag,
} from '$sharedModules/DragAndDrop/helpers';
import { CreateDragAndDrop, DraggableConfig } from '$sharedModules/DragAndDrop/types';

export const createDragAndDrop: CreateDragAndDrop = (fieldName, dndConfig) => {
  const convertedDropZonesToList = Object.entries(
    dndConfig.customConfig?.dropZones ?? {},
  ).map(([zoneId, hitRatio]) => ({
    zoneId,
    hitRatio,
  }));

  const zoneAndElements = getZonesAndElements(fieldName, convertedDropZonesToList);

  if (isNull(zoneAndElements)) {
    return {};
  }

  const { candidateDraggableElements, dndZone, scrollWrapperElement, dropZones } =
    zoneAndElements;

  const { manuallyTriggerEvent, ...draggableConfig } = dndConfig.customConfig ?? {};

  gsap.set(candidateDraggableElements, { position: 'relative' });

  if (scrollWrapperElement) {
    gsap.set(scrollWrapperElement, {
      position: 'relative',
    });
  }

  const { onDrag, onDragEnd, onPress } = getDragAndDropHandlers(dndConfig, dropZones);

  const dragConfig: DraggableConfig = {
    type: 'x,y',
    bounds: dndZone,
    autoScroll: 1,
    edgeResistance: 0.8,
    onPress,
    onDragEnd,
    onDrag,
    dragClickables: false,
    ...draggableConfig,
  };

  const draggableElements: Draggable[] = [];

  for (const candidateDraggableElement of candidateDraggableElements) {
    draggableElements.push(
      createDraggableElement(candidateDraggableElement, dragConfig, scrollWrapperElement),
    );
  }

  if (manuallyTriggerEvent) {
    for (const draggableElement of draggableElements) {
      draggableElement.disable();
    }
  }

  return {
    ...(manuallyTriggerEvent && { startDrag }),
  };
};
