import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core';

import { DragAndDropZones } from '$sharedModules/DragAndDrop';

type AreaName = 'sidebar' | 'header' | 'body' | 'footer' | 'empty';

const areaWidth = (areaName: AreaName, count: number) =>
  `${areaName === 'empty' ? '.' : areaName} `.repeat(count);

const convertToAreaFormat = (areas) =>
  areas.reduce((acc, str) => (acc += `${`'${str}'` + `\n`}`), ``);

const useStyles = makeStyles((_theme: Theme) => {
  return createStyles({
    complexGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(18, 1fr)',
      gridTemplateRows: '10rem minmax(90vh, auto)',
      gridTemplateAreas: () => {
        // Each element in the area indicates horizontal area
        const areas = [
          areaWidth('sidebar', 4) + areaWidth('header', 14),
          areaWidth('sidebar', 4) + areaWidth('body', 14),
        ];
        return convertToAreaFormat(areas);
      },
    },
    standardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: '8.8rem minmax(60vh, auto) 249px',
      gridTemplateAreas: () => {
        // Each element in the area indicates horizontal area
        const areas = [
          areaWidth('header', 12),
          areaWidth('empty', 1) + areaWidth('body', 10) + areaWidth('empty', 1),
          areaWidth('footer', 12),
        ];
        return convertToAreaFormat(areas);
      },
    },
  });
});

export default function GridSystem(props: any) {
  const classes = useStyles();
  const gridClass = classes.complexGrid;
  return (
    <div className={gridClass} id={DragAndDropZones.dndZone}>
      {props.children}
    </div>
  );
}
