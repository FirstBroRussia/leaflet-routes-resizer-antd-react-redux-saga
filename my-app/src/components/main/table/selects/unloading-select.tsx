import {Select} from "antd";
import { setCurrentUnloadingPointAction } from "../../../../store/slice/proposal-slice";
import {DataType, UnloadingPointType} from "../../../../mocks/mocks";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getConvertedCoordinatesFromServer } from "../../../../store/saga-actions/saga-actions";
import { setCoordinatesListAction } from "../../../../store/slice/map-slice";

type UnloadingSelectElementPropsType = {
  unloadingPoint: UnloadingPointType[],
  data: DataType,
};

function UnloadingSelectElement({unloadingPoint, data}: UnloadingSelectElementPropsType) {
  const dispatch = useAppDispatch();
  const currentTargetProposalKey = useAppSelector((state) => state.proposalReducer.key);

  const {key}: DataType = data;

  const handleUnloadingSelectChange = (evt: string): void => {
    const currentSelect: string = evt;
    data.currentUnloadingPoint = currentSelect;
    if (key === currentTargetProposalKey) {
      dispatch(setCurrentUnloadingPointAction(currentSelect));
      dispatch(getConvertedCoordinatesFromServer());
      dispatch(setCoordinatesListAction(null));
    }
  };

  return (
    <Select onChange={handleUnloadingSelectChange} style={{width: '100%'}} size="middle" placeholder="Выберите точку выгрузки">
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

export default UnloadingSelectElement;
