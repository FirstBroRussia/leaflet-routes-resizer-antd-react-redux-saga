import {Table} from "antd";
import React, {useEffect, useState} from "react";
import {setPrimaryInitialProposalAction, setTargetProposalKeyAction} from "../../../features/counter/common-slice";
import {dataSource, DataType, LoadingPointType, UnloadingPointType} from "../../../mocks/mocks";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import LoadingSelectElement from "./selects/loading-select";
import UnloadingSelectElement from "./selects/unloading-select";

const getNecessaryDataFromDataSource = (key: number) => {
  for (let index = 0; index < dataSource.length; index++) {
    if (dataSource[index].key === key) {
      return dataSource[index];
    }
  }
};

function TableElement() {
  const dispatch = useAppDispatch();

  const isInitial = useAppSelector((state) => state.isInitial);
  const currentTargetProposalKey = useAppSelector((state) => state.key);

  const initialSelectedKey = 1;
  const [selectedKey, setSelectedKey] = useState(initialSelectedKey)

  useEffect(() => {
    if (!isInitial) {
      dispatch(setPrimaryInitialProposalAction(selectedKey));
      return;
    }
    if (selectedKey !== currentTargetProposalKey) {
      dispatch(setTargetProposalKeyAction(getNecessaryDataFromDataSource(selectedKey)));
    }
  }, [currentTargetProposalKey, dispatch, isInitial, selectedKey, setSelectedKey]);

  const handleRowSelectChange = (evt: React.Key[]): void => {
    const currentKey = Number(evt);
    setSelectedKey(currentKey);
    console.log(`KEY: ${currentKey}`);
  };

  return (
    <Table className="table" dataSource={dataSource} size="small" pagination={false} rowSelection={{
      type: "radio",
      onChange: handleRowSelectChange,
      selectedRowKeys: [selectedKey],
    }}>
      <Table.Column className="custom-table-cell" title="Заявки" dataIndex="title" key="key" />
      <Table.Column className="custom-table-cell" title="Точка погрузки" dataIndex="loadingPoint" key="key" render={
        (loadingPoint: LoadingPointType[], data: DataType) => {
          return (<LoadingSelectElement loadingPoint={loadingPoint} data={data} />);
        }
      }/>
      <Table.Column className="custom-table-cell" title="Точка выгрузки" dataIndex="unloadingPoint" key="key" render={
          (unloadingPoint: UnloadingPointType[], data: DataType) => {
            return (<UnloadingSelectElement unloadingPoint={unloadingPoint} data={data} />);
          }
        }/>
    </Table>
  );
}

export default TableElement;
