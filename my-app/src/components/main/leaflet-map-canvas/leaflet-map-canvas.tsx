import {useRef} from "react";

function LeafletMapCanvas() {
  const mapCanvasRef = useRef(null);
  return (
    <div ref={mapCanvasRef} className="leaflet-block">

    </div>
  );
}

export default LeafletMapCanvas;
