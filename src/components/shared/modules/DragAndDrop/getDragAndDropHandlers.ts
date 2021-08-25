import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import { flatten, isNil } from 'lodash';

import {
  CLONE_ID,
  pressTransition,
  defaultRemovingActions,
  defaultRemovingDropZone,
} from '$sharedModules/DragAndDrop/constants';
import {
  getElementDnDKey,
  getFieldValue,
  trashIconShaking,
  getDropZoneElement,
} from '$sharedModules/DragAndDrop/helpers';
import {
  HitTest,
  ResolvedDropZones,
  DND,
  DragAndDropZones,
  DropZoneResolvedElement,
} from '$sharedModules/DragAndDrop/types';

interface IDragAndDropHandlers {
  onPress: () => void;
  onDrag: () => void;
  onDragEnd: () => void;
}

export function getDragAndDropHandlers(
  dndConfig: DND,
  dropZones: ResolvedDropZones,
): IDragAndDropHandlers {
  const trashAnimate =
    dropZones.defaultRemoving && trashIconShaking(dropZones.defaultRemoving.element);

  const { liveDrag, killDraggableElementAfterDrag } = dndConfig.customConfig ?? {};

  const lastPos = { x: 0, y: 0 };

  function onPress(): void {
    const _onPress = dndConfig.actions?.onPress;
    lastPos.x = this.x;
    lastPos.y = this.y;

    if (_onPress) {
      _onPress(this.target);
    }
  }

  function onDragEnd(): void {
    const targetElement = this.target;

    const isTargetClone = targetElement.getAttribute('id') === CLONE_ID;

    const elKey = getElementDnDKey(this.target);

    const originalElement = isTargetClone
      ? document.querySelector(`#${DragAndDropZones.scrollBox} [element-key="${elKey}"]`)
      : targetElement;

    const _onDragEnd = dndConfig.actions?.onDragEnd;

    const hitTestChecker: HitTest = (dropZone) => {
      const zoneElement = getDropZoneElement(dropZone.zoneId);
      return this.hitTest(zoneElement, dropZone.hitRatio);
    };

    if (_onDragEnd) {
      _onDragEnd(originalElement, hitTestChecker, getDropZoneElement);
    }

    const onDropHandler = async (dropZoneId: string): Promise<void> => {
      if (dropZoneId === defaultRemovingDropZone.zoneId) {
        const defaultDropZoneElement = getDropZoneElement(dropZoneId);
        defaultRemovingActions.onDrop(defaultDropZoneElement!);
      }

      const deleteItemValue = getFieldValue(originalElement);
      try {
        if (typeof dndConfig.actions.onDrop === 'function') {
          await dndConfig.actions.onDrop(originalElement, deleteItemValue ?? '');
        } else if (dndConfig.actions.onDrop[dropZoneId]) {
          await dndConfig.actions.onDrop[dropZoneId](
            originalElement,
            deleteItemValue ?? '',
          );
        }
      } catch (err) {
        gsap.to(this.target, {
          ...revertingElementProp,
          opacity: 1,
        });
      }
    };

    // Remove targetElement if it's clone
    const removeClonedElement = (): void => {
      if (isTargetClone) {
        targetElement.remove();
      }
    };

    const revertingElementProp = {
      x: lastPos.x,
      y: lastPos.y,
      duration: 0.5,
      scale: 1,
      onComplete: () => {
        if (isTargetClone) {
          gsap.set(targetElement, {
            autoAlpha: 0,
          });
          gsap.set(originalElement, { autoAlpha: 1 });
        }
      },
    };

    const getDropElementProp = (_dropZone: string): gsap.TweenVars => ({
      duration: 1,
      scale: 0,
      opacity: 0,
      onComplete: () => {
        removeClonedElement();
        onDropHandler(_dropZone);
      },
    });

    const getNullifyElementProp = (_dropZone: string): gsap.TweenVars => ({
      x: lastPos.x,
      y: lastPos.y,
      duration: 0.5,
      scale: 1,
      onComplete: () => {
        onDropHandler(_dropZone);
      },
    });

    let droppingElementProps: Record<string, any> | undefined;

    const dropZoneList: DropZoneResolvedElement[] = flatten(Object.values(dropZones));

    for (const _dropZone of dropZoneList) {
      if (this.hitTest(_dropZone.element, `${_dropZone.hitRatio}%`)) {
        droppingElementProps = this.target.attributes['data-nullify']?.value
          ? getNullifyElementProp(_dropZone.zoneId)
          : getDropElementProp(_dropZone.zoneId);

        break;
      }
    }

    gsap.to(this.target, droppingElementProps ?? revertingElementProp);

    if (hasTrashIcon(trashAnimate)) {
      defaultRemovingActions.onDragEnd(trashAnimate);
    }

    if (killDraggableElementAfterDrag) {
      Draggable.get(this.target).kill();
    }
  }

  function onDrag(): void {
    const draggableElement = this.target;

    const _onDrag = dndConfig.actions?.onDrag;

    const hitTestChecker: HitTest = (dropZone) => {
      const zoneElement = getDropZoneElement(dropZone.zoneId);
      return this.hitTest(zoneElement, dropZone.hitRatio);
    };

    if (_onDrag) {
      _onDrag(draggableElement, hitTestChecker, getDropZoneElement);
    }

    if (liveDrag) {
      gsap.to(draggableElement, pressTransition);
    }

    if (hasTrashIcon(trashAnimate)) {
      defaultRemovingActions.onDrag(trashAnimate, hitTestChecker, getDropZoneElement);
    }
  }

  return {
    onPress,
    onDrag,
    onDragEnd,
  };
}

const hasTrashIcon = (
  trashAnimateIcon?: gsap.core.Timeline,
): trashAnimateIcon is gsap.core.Timeline => {
  return !isNil(trashAnimateIcon);
};
