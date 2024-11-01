import { InfoIcon } from "../../assets";
import "../../style//component/tutorial.scss";

function TutorialButton() {
  return (
    <a className="tutorial" target="__blank" href="https://youtube.com/">
      <InfoIcon /> Watch tutorial on YouTube
    </a>
  );
}

export default TutorialButton;
