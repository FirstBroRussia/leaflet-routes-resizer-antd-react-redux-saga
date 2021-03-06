import {Table} from "antd";
import React, {useEffect, useState} from "react";
import {setPrimaryInitialProposalAction, setTargetProposalKeyAction} from "../../../store/slice/proposal-slice";
import {dataSource, DataType, LoadingPointType, UnloadingPointType} from "../../../mocks/mocks";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import LoadingSelectElement from "./selects/loading-select";
import UnloadingSelectElement from "./selects/unloading-select";
import {getConvertedCoordinatesFromServer} from "../../../store/saga-actions/saga-actions";
import {setCleanerInitialStateAction, setCoordinatesListAction} from "../../../store/slice/map-slice";

const getNecessaryDataFromDataSource = (key: number) => {
  for (let index = 0; index < dataSource.length; index++) {
    if (dataSource[index].key === key) {
      return dataSource[index];
    }
  }
};

function TableElement(): JSX.Element {
  const dispatch = useAppDispatch();

  const isInitial = useAppSelector((state) => state.proposalReducer.isInitial);
  const currentTargetProposalKey = useAppSelector((state) => state.proposalReducer.key);

  const initialSelectedKey = 1;
  const [selectedKey, setSelectedKey] = useState(initialSelectedKey)

  useEffect(() => {
    if (!isInitial) {
      dispatch(setPrimaryInitialProposalAction(selectedKey));
      return;
    }
    if (selectedKey !== currentTargetProposalKey) {
      dispatch(setTargetProposalKeyAction(getNecessaryDataFromDataSource(selectedKey)));
      //
      dispatch(setCleanerInitialStateAction());
      dispatch(getConvertedCoordinatesFromServer());
      dispatch(setCoordinatesListAction(null));
    }
  }, [currentTargetProposalKey, dispatch, isInitial, selectedKey]);

  const handleRowSelectChange = (evt: React.Key[]): void => {
    const currentKey = Number(evt);
    setSelectedKey(currentKey);
  };

  return (
    <Table className="table" dataSource={dataSource} size="small" pagination={false} rowSelection={{
      type: "radio",
      onChange: handleRowSelectChange,
      selectedRowKeys: [selectedKey],
    }}>
      <Table.Column className="custom-table-cell" title="????????????" dataIndex="title" key="key" />
      <Table.Column className="custom-table-cell" title="?????????? ????????????????" dataIndex="loadingPoint" key="key" render={
        (loadingPoint: LoadingPointType[], data: DataType) => {
          return (<LoadingSelectElement loadingPoint={loadingPoint} data={data} />);
        }
      }/>
      <Table.Column className="custom-table-cell" title="?????????? ????????????????" dataIndex="unloadingPoint" key="key" render={
          (unloadingPoint: UnloadingPointType[], data: DataType) => {
            return (<UnloadingSelectElement unloadingPoint={unloadingPoint} data={data} />);
          }
        }/>
    </Table>
  );
}

export default TableElement;
