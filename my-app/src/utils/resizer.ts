import { setWidthMapBlockAction } from '../store/slice/map-slice';
import {store} from '../store/store';
const dispatch = store.dispatch;

let isPressedMouse = false;

let currentWidthViewport = document.documentElement.clientWidth;

let currentCoordinateOX: number;

let tableElementWidth: number;
let mapBlockElementWidth: number;

let tableElement: any;
let mapBlockElement: any;

// Я ТОЛЬКО НЕ ЗНАЮ, КАК ПРИ ИЗМЕНЕНИИ РАЗМЕРА КОНТЕЙНЕРА КАРТЫ ПЕРЕДАТЬ САМОЙ КАРТЕ ЭТО ИЗМЕНЕНИЕ
// ОНА САМА РЕАГИРУЕТ НА ИЗМЕНЕНИЕ VIEWPORT, НАДО ВИДИМО ИСКАТЬ В ДОБАВОЧНЫХ КЛАССАХ КАРТЫ LEAFLET
// ЕЩЕ RESIZER ОЧЕНЬ ХОРОШО РАБОТАЕТ В FIREFOX И OPERA, А ВОТ В CHROME МЫШКА БЫСТРЕЕ ИЗМЕНЕНИЯ ШИРИНЫ ПРОИСХОДИТ ПОЭТОМУ МЫШКА УБЕГАЕТ ДАЛЬШЕ ПОЛОСЫ

const setNecessaryNodeElement = () => {
  if (tableElement && mapBlockElement) {
    return;
  }
  tableElement = document.querySelector('.table');
  mapBlockElement = document.querySelector('.map-block');
};

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
    dispatch(setWidthMapBlockAction(mapBlockElementWidth));
  } else {
    tableElementWidth = tableElement.offsetWidth + deltaCoordinates;
    mapBlockElementWidth = mapBlockElement.offsetWidth - deltaCoordinates;
    tableElement.style.width = `${tableElementWidth}px`;
    mapBlockElement.style.width = `${mapBlockElementWidth}px`;
    dispatch(setWidthMapBlockAction(mapBlockElementWidth));
  }
  currentCoordinateOX = coordinateOX;
};

window.addEventListener('resize', (evt: any) => {
  setNecessaryNodeElement();
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
  setNecessaryNodeElement();
  document.addEventListener('mousemove', mouseMoveHandler);
  }
});

document.addEventListener('mouseup', (evt: any) => {
  isPressedMouse = false;
  document.removeEventListener('mousemove', mouseMoveHandler);
});

export {};
