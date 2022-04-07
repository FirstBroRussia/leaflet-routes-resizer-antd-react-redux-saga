import {Select} from "antd";
import { setCurrentUnloadingPointAction } from "../../../../features/counter/common-slice";
import {DataType, UnloadingPointType} from "../../../../mocks/mocks";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

type UnloadingSelectElementPropsType = {
  unloadingPoint: UnloadingPointType[],
  data: DataType,
};

function UnloadingSelectElement({unloadingPoint, data}: UnloadingSelectElementPropsType) {
  const dispatch = useAppDispatch();
  const currentTargetProposalKey = useAppSelector((state) => state.key);

  const {key}: DataType = data;

  const handleUnloadingSelectChange = (evt: string): void => {
    const currentSelect: string = evt;
    data.currentUnloadingPoint = currentSelect;
    if (key === currentTargetProposalKey) {
      dispatch(setCurrentUnloadingPointAction(currentSelect));
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
