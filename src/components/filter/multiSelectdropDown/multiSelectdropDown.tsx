import React from "react";
import { CheckPicker } from "rsuite";
import "./multiSelectdropDown.scss";
type AppMultiSelectDropDownProps = {
  data?: any,
  placeholder?: string,
  onChangeHandler?: (...args: any[]) => any,
  isOpen?: boolean,
  onCloseHandler?: (...args: any[]) => any,
  onCleanHandler?: (...args: any[]) => any,
  onOpenHandler?: (...args: any[]) => any,
  label?: any
};
const AppMultiSelectDropDown: React.FC<AppMultiSelectDropDownProps> = ({ label, onChangeHandler, data, ...props }) => (
  <>
    <div className="multiselect-dropdown-wrapper">
      <div className="dropdown-label">
        <span>{label}</span>
      </div>
      <div className={`${props.isOpen ? "is-dropdown-open" : ""} check-picker-wrap`}>
        <CheckPicker block placeholder={props.placeholder} onChange={onChangeHandler} size="lg" onOpen={props.onOpenHandler} onClose={props.onCloseHandler} onClean={props.onCleanHandler} data={data} searchable={false} style={{ width: 224 }} />
      </div>
    </div>
  </>
);
export default AppMultiSelectDropDown;
