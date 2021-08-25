import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';

import {
  Actions,
  CreateDragAndDrop,
  CustomConfig,
} from '$sharedModules/DragAndDrop/types';

import { createDragAndDrop } from './createDragAndDrop';

interface UseDragAndDropArgs<DropZones extends Record<string, string>> {
  shouldRegisterDND?: boolean;
  actions?: Actions;
  customConfig?: CustomConfig<DropZones>;
}

export const useDragAndDrop = <DropZones extends Record<string, string>>({
  actions,
  customConfig,
  shouldRegisterDND,
}: UseDragAndDropArgs<DropZones>): CreateDragAndDrop<DropZones> => {
  if (shouldRegisterDND) {
    gsap.registerPlugin(Draggable);
  }

  return (fieldName, dndConfig) =>
    createDragAndDrop(fieldName, {
      actions: dndConfig.actions ?? actions,
      customConfig: dndConfig.customConfig ?? customConfig,
    });
};
