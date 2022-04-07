let isPressedMouse = false;

let currentWidthViewport = document.documentElement.clientWidth;

let currentCoordinateOX: number;

let tableElementWidth: number;
let mapBlockElementWidth: number;

let tableElement: any;
let mapBlockElement: any;

const mouseMoveHandler = (evt: MouseEvent) => {
  if (!isPressedMouse) {
    return;
  }
  const coordinateOX = evt.clientX;
  const deltaCoordinates = Math.abs(currentCoordinateOX - coordinateOX);
  if ((currentCoordinateOX - coordinateOX) > 0) {
    tableElementWidth = tableElement.offsetWidth - deltaCoordinates;
    mapBlockElementWidth = mapBlockElement.offsetWidth + deltaCoordinates;
    tableElement.style.width = `${tableElementWidth}px`;
    mapBlockElement.style.width = `${mapBlockElementWidth}px`;
  } else {
    tableElementWidth = tableElement.offsetWidth + deltaCoordinates;
    mapBlockElementWidth = mapBlockElement.offsetWidth - deltaCoordinates;
    tableElement.style.width = `${tableElementWidth}px`;
    mapBlockElement.style.width = `${mapBlockElementWidth}px`;
  }
  currentCoordinateOX = coordinateOX;
};

window.addEventListener('resize', (evt: any) => {
  const prevWidthViewport = currentWidthViewport;
  const tableElementWidthProportion = tableElementWidth / prevWidthViewport;
  const mapBlockElementWidthProportion = mapBlockElementWidth / prevWidthViewport;
  currentWidthViewport = document.documentElement.clientWidth;
  tableElementWidth = tableElementWidthProportion * currentWidthViewport;
  mapBlockElementWidth = mapBlockElementWidthProportion * currentWidthViewport;
  tableElement.style.width = `${tableElementWidth}px`;
  mapBlockElement.style.width = `${mapBlockElementWidth}px`;
});

document.addEventListener('mousedown', (evt: any) => {
  const targetElement = evt.target;
  if (targetElement?.closest('.divider')) {
  isPressedMouse = true;
  currentCoordinateOX = evt.clientX;
  tableElement = document.querySelector('.table');
  mapBlockElement = document.querySelector('.map-block');
  document.addEventListener('mousemove', mouseMoveHandler);
  }
});

document.addEventListener('mouseup', (evt: any) => {
  isPressedMouse = false;
  document.removeEventListener('mousemove', mouseMoveHandler);
});

export {};
