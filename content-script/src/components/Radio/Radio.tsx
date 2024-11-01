import { RadioIcon } from "../../assets";
import "../../style/component/radio.scss";
import { RadioPropTypes } from "./Radio.types";
function Radio({ checked, id, onClick }: RadioPropTypes) {
  return (
    <label onClick={onClick} htmlFor={id} className="radioContainer">
      <RadioIcon checked={checked} />
      <input checked={checked} id={id} type="radio" className="radio" />
    </label>
  );
}

export default Radio;
