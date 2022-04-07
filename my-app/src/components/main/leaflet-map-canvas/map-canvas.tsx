import DG from '2gis-maps';
import {useEffect, useRef} from "react";

console.log(DG);

let isInitialMap = false;

const createMap = (mapCanvas: HTMLDivElement) => {
  isInitialMap = true;
  var map = DG.map(mapCanvas, {
    'center': [54.98, 82.89],
    'zoom': 13
});
};

function MapCanvas() {
  const mapCanvasRef = useRef(null);

  useEffect(() => {
    if (isInitialMap) {
      return;
    }
    const mapCanvas = mapCanvasRef.current as unknown as HTMLDivElement;
    createMap(mapCanvas);
  });

  return (
    <div ref={mapCanvasRef} className="map-block">

    </div>
  );
}

export default MapCanvas;
