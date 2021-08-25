export type DraggableConfig = Draggable.Vars;

export interface DNDElements {
  dndZone: Element | null;
  dropZone: Element | null;
  draggableElements: NodeListOf<Element> | null;
}

export interface DropZone {
  /**
   * id dropZone specifier in DOM
   */
  zoneId: string;
  /**
   * hitRatio ratio that declare element dropped into the dropZone
   */
  hitRatio: string;
}

export type DropZoneResolvedElement = DropZone & {
  element: Element;
};

export type CustomConfig<DropZones extends Record<string, string>> = DraggableConfig &
  Partial<{
    liveDrag: boolean;
    manuallyTriggerEvent: boolean;
    killDraggableElementAfterDrag: boolean;
    dropZones: DropZones;
  }>;

type OnDropFn = (dragElement: Element, itemValue: string) => Promise<void> | void;

type OnDrop<DropZones extends Record<string, string>> = {
  [zoneId in keyof DropZones]: OnDropFn;
} & {
  [DragAndDropZones.dropZone]: OnDropFn;
};

export type HitTest = (dropZone: DropZone) => boolean;
export type GetZoneElement = (zoneId: string) => Element | undefined;

export interface Actions<
  DropZones extends Record<string, string> = Record<string, string>,
> {
  onDrop: OnDropFn | OnDrop<DropZones>;
  onDrag?: (
    dragElement: Element,
    hitTest: HitTest,
    getZoneElement: GetZoneElement,
  ) => void;
  onDragEnd?: (
    dragElement: Element,
    hitTest: HitTest,
    getZoneElement: GetZoneElement,
  ) => void;
  onPress?: (dragElement: Element) => void;
}

export interface DND<DropZones extends Record<string, string> = Record<string, string>> {
  actions: Actions<DropZones>;
  customConfig?: CustomConfig<DropZones>;
}

export type DraggableHandlers = Partial<{
  startDrag: (e: Event) => void;
}>;

export type CreateDragAndDrop<
  DropZones extends Record<string, string> = Record<string, string>,
> = (fieldName: string, dndConfig: DND<DropZones>) => DraggableHandlers;

export interface ResolvedDropZones {
  defaultRemoving?: DropZoneResolvedElement;
  additionalDropZones: DropZoneResolvedElement[];
}

export enum DragAndDropZones {
  dndZone = 'dnd-zone',
  dropZone = 'drop-zone',
  dragBox = 'drag-box',
  scrollWrapper = 'scroll-wrapper',
  scrollBox = 'scrollBox',
}
