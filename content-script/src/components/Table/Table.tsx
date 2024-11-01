import "../../style/component/table.scss";
import { TablePropTypes } from "./Table.types";
function Table({ children }: TablePropTypes) {
  return (
    <table className="table">
      <tr>
        <td></td>
        <td>Linkedin data</td>
        <td>CRm data</td>
      </tr>
      {children}
    </table>
  );
}

export default Table;
