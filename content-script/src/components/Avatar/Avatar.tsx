import { Button } from "../";
import { ReloadIcon } from "../../assets";
import { BUTTON_ENUM } from "../../types/global.types";
import { AvatarPropTypes } from "./Avatar.types";
import "../../style/component/avatar.scss";
function Avatar({ image, onClick }: AvatarPropTypes) {
  return (
    <div className="avatar">
      <img src={image} alt="" />
      <Button
        onClick={onClick}
        icon={<ReloadIcon />}
        type={BUTTON_ENUM.RELOAD}
      />
    </div>
  );
}

export default Avatar;
