import {Select} from "antd";
import {setCurrentLoadingPointAction} from "../../../../features/counter/common-slice";
import {DataType, LoadingPointType} from "../../../../mocks/mocks";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

type LoadingSelectElementPropsType = {
  loadingPoint: LoadingPointType[],
  data: DataType,
}

function LoadingSelectElement({loadingPoint, data}: LoadingSelectElementPropsType) {
  const dispatch = useAppDispatch();
  const currentTargetProposalKey = useAppSelector((state) => state.key);

  const {key}: DataType = data;

  const handleLoadingSelectChange = (evt: string): void => {
    const currentSelect: string = evt;
    data.currentLoadingPoint = currentSelect;
    if (key === currentTargetProposalKey) {
      dispatch(setCurrentLoadingPointAction(currentSelect));
    }
  };

  return (
    <Select onChange={handleLoadingSelectChange} style={{width: '100%'}} size="middle" placeholder="Выберите точку погрузки">
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

export default LoadingSelectElement;
