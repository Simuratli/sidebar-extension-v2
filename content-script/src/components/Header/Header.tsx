import { HeaderPropTypes } from "./Header.types";
import "../../style/component/header.scss";
function Header({ children }: HeaderPropTypes) {
  return <h1 className="header">{children}</h1>;
}

export default Header;
