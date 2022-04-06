import {Select, Table} from "antd";
import {data, LoadingPointType, UnloadingPointType} from "../../../mocks/mocks";

function TableElement() {

  const handleLoadingSelectChange = (evt: string): void => {
    console.log(evt);
  };

  const handleUnLoadingSelectChange = (evt: string): void => {
    console.log(evt);
  };

  const handleRowSelectChange = (evt: any) => {
    console.log(evt);
  };

  const columns = [
    {
      title: 'Заявки',
      dataIndex: 'title',
    },
    {
      title: 'Точка погрузки',
      dataIndex: 'loadingPoint',
    },
    {
      title: 'Точка выгрузки',
      dataIndex: 'unloadingPoint',
    },
  ];

  return (
    <Table className="table" columns={columns} dataSource={data} size="small" pagination={false} rowSelection={{
      type: "checkbox",
      onSelect: handleRowSelectChange,
    }}>
      {/* <Table.Column className="custom-table-cell" title="Заявки" dataIndex="title" key="title" />
      <Table.Column className="custom-table-cell" title="Точка погрузки" dataIndex="loadingPoint" key="loadingPoint" render={
          (loadingPoint: LoadingPointType[]) => {
            return (
              <Select onChange={handleLoadingSelectChange} style={{width: '100%'}} size="middle" defaultValue={loadingPoint[0].loadingPointAddress}>
                {
                  loadingPoint.map((item, index) => {
                    const {loadingPointAddress}: LoadingPointType = item;
                    return (
                      <Select.Option key={index} value={loadingPointAddress}>
                        {loadingPointAddress}
                      </Select.Option>
                    );
                  })
                }
              </Select>
            );
          }
        }/>
      <Table.Column className="custom-table-cell" title="Точка выгрузки" dataIndex="unloadingPoint" key="unloadingPoint" render={
          (unloadingPoint: UnloadingPointType[]) => {
            return (
              <Select onChange={handleUnLoadingSelectChange} style={{width: '100%'}} size="middle" defaultValue={unloadingPoint[0].unloadingPointAddress}>
                {
                  unloadingPoint.map((item, index) => {
                    const {unloadingPointAddress}: UnloadingPointType = item;
                    return (
                      <Select.Option key={index} value={unloadingPointAddress}>
                        {unloadingPointAddress}
                      </Select.Option>
                    );
                  })
                }
              </Select>
            );
          }
        }/> */}
    </Table>
  );
}

export default TableElement;
