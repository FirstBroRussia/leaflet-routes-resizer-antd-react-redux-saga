import leaflet from 'leaflet';
import {useEffect, useRef, useState} from "react";
import {getPolylineCoordinateFromServer} from '../../../store/saga-actions/saga-actions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {betweenPoints, getDistance, getZoom} from '../../../utils/distance-utils';
import '../../api/api';

const FULCRUM_VALUE = 0;

const ZOOM_MAP = 12;

let map: any;

let defaultLayer: any;

let marker1: any;
let marker2: any;

const debounceFn = () => {
  let timeout: any;
  return (callback: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callback, 500);
  }
};
const debounce = debounceFn();

const createMap = (mapRef: any) => {
  map = leaflet.map(mapRef.current, {
    center: {
      lat: 55.753600,
      lng: 37.621184,
    },
    zoom: 11,
  });

  leaflet
    .tileLayer(
      'http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}',
    )
    .addTo(map);

    defaultLayer = leaflet.layerGroup();
    defaultLayer.addTo(map);
};

const setDefaultLayerToMap = () => {
  map.removeLayer(defaultLayer);
  defaultLayer = leaflet.layerGroup();
  defaultLayer.addTo(map);
}

function useMap() {
  const dispatch = useAppDispatch();
  const [isPrimaryInitialUseMap, setPrimaryInitialUseMap] = useState(false);
  const currentTargetProposalKey = useAppSelector((state) => state.proposalReducer.key);
  const loadingPointCoordinates = useAppSelector((state) => state.mapReducer.loadingCoordinates);
  const unloadingPointCoordinates = useAppSelector((state) => state.mapReducer.unloadingCoordinates);
  const coordinatesList = useAppSelector((state) => state.mapReducer.coordinatesList);
  const currentWidthMapBlock = useAppSelector((state) => state.mapReducer.currentWidthMapBlock);
  const [state, setState] = useState(coordinatesList);

  useEffect(() => {
    if (!isPrimaryInitialUseMap) {
      setPrimaryInitialUseMap(true);
    }
    setDefaultLayerToMap();
  }, [currentTargetProposalKey, dispatch, isPrimaryInitialUseMap]);

  if (map && currentWidthMapBlock !== FULCRUM_VALUE) {
    map.invalidateSize();
  }

  if (state !== coordinatesList) {
    setDefaultLayerToMap();
    setState(coordinatesList);
  }

  if (coordinatesList) {
    leaflet.polyline(coordinatesList, {color: 'red'}).addTo(defaultLayer);
  }

  if (loadingPointCoordinates !== null) {
    if (marker1) {
      map.removeLayer(marker1);
    }
    marker1 = leaflet.marker([loadingPointCoordinates.lat, loadingPointCoordinates.lon]);
    marker1.addTo(defaultLayer);
    if (loadingPointCoordinates && !unloadingPointCoordinates) {
      map.setView([loadingPointCoordinates.lat, loadingPointCoordinates.lon], ZOOM_MAP);
    }
  }

  if (unloadingPointCoordinates !== null) {
    if (marker2) {
      map.removeLayer(marker2);
    }
    marker2 = leaflet.marker([unloadingPointCoordinates.lat, unloadingPointCoordinates.lon]);
    marker2.addTo(defaultLayer);
    if (!loadingPointCoordinates && unloadingPointCoordinates) {
      map.setView([unloadingPointCoordinates.lat, unloadingPointCoordinates.lon], ZOOM_MAP);
    }
  }

  if (loadingPointCoordinates && unloadingPointCoordinates) {
    if (isPrimaryInitialUseMap && !coordinatesList) {
      debounce(() => {
        dispatch(getPolylineCoordinateFromServer());
      });
    }
    const distance = getDistance([loadingPointCoordinates?.lat, loadingPointCoordinates?.lon], [unloadingPointCoordinates?.lat, unloadingPointCoordinates?.lon]);
    const zoomCoordinate = betweenPoints([loadingPointCoordinates?.lat, loadingPointCoordinates?.lon], [unloadingPointCoordinates?.lat, unloadingPointCoordinates?.lon]);
    const zoom = getZoom(distance);
    map.setView(zoomCoordinate, zoom);
  }
};


function MapCanvas() {
  const [primaryInitial, setPrimaryInitial] = useState(false);
  const mapCanvasRef = useRef(null);

  useEffect(() => {
    if (primaryInitial) {
      return;
    }
    createMap(mapCanvasRef);
    setPrimaryInitial(true);
  }, [primaryInitial]);

  useMap();

  return (
    <div ref={mapCanvasRef} className="map-block">

    </div>
  );
}

export default MapCanvas;
