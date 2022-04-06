import {Divider} from "antd";
import LeafletMapCanvas from "./leaflet-map-canvas/leaflet-map-canvas";
import TableElement from "./table/table";

function Main() {

  return (
    <main className="main">
      <TableElement />
      <Divider className="divider" type="vertical"  />
      <LeafletMapCanvas />
    </main>
  );
}

export default Main;
