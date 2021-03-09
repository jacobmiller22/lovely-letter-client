import map from "lodash/map";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { ArrowUpCircleFill, ArrowDownCircleFill } from "react-bootstrap-icons";

import "./LetterListControl.css";

const LetterListControl = ({ fields, active, setActive, dir, setDir }) => {
  const renderDropdown = () => {
    const renderFields = () => {
      return map(fields, (field) => (
        <Dropdown.Item key={field.key} onSelect={() => setActive(field)}>
          {field.text}
        </Dropdown.Item>
      ));
    };

    return (
      <Dropdown className="sort-field">
        <Dropdown.Toggle>{active.text}</Dropdown.Toggle>
        <Dropdown.Menu>{renderFields()}</Dropdown.Menu>
      </Dropdown>
    );
  };

  const renderToggle = () => {
    const onClick = () => setDir(dir === "ASC" ? "DESC" : "ASC");

    return dir === "ASC" ? (
      <ArrowDownCircleFill onClick={onClick} className="arrow" size={40} />
    ) : (
      <ArrowUpCircleFill onClick={onClick} className="arrow" size={40} />
    );
  };

  return (
    <div>
      {renderDropdown()}
      {renderToggle()}
    </div>
  );
};
export default LetterListControl;
