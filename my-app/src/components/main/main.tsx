import '../../utils/resizer';
import {Divider} from "antd";
import MapCanvas from "./map-canvas/map-canvas";
import TableElement from "./table/table";

function Main() {
  return (
    <main className="main">
      <TableElement />
      <Divider className="divider" type="vertical"  />
      <MapCanvas />
    </main>
  );
}

export default Main;
