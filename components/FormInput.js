import React, { useState } from "react";
import styles from "../styles/PortalLeftTab.module.scss";

const FormInput = ({ k, setFormData, formData, selected }) => {
  const [booleanToggle, setBooleanToggle] = useState(false);
  const handleChange = (value) => {
    console.log("Change: ", selected.name, formData, k.display);
    setFormData({
      ...formData,
      [selected.name]: {
        ...formData[selected.name],
        [k.display]: value,
      },
    });
  };

  switch (k.type) {
    case "string":
      return (
        <div className="mb-3">
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <input
            type="email"
            className="form-control"
            id={k.display}
            aria-describedby="emailHelp"
            value={formData[selected.name][k.display]}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    case "password":
      return (
        <div className="mb-3">
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <input
            type="password"
            className="form-control"
            id={k.display}
            aria-describedby="emailHelp"
            value={formData[selected.name][k.display]}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    case "boolean":
      return (
        <div className="mb-1 form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            id={k.display}
            value={formData[selected.name][k.display]}
            onChange={(e) => {
              handleChange(!booleanToggle);
              setBooleanToggle(!booleanToggle);
            }}
            checked={booleanToggle}
          />
          <label className="form-check-label" for={k.display}>
            {k.display}
          </label>
        </div>
      );
    case "select":
      return (
        <div className="mb-3">
          <label className="form-check-label" for={k.display}>
            {k.display}
          </label>
          <select
            className="form-select form-select-sm"
            aria-label="Category"
            id={k.display}
            value={formData[selected.name][k.display]}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option selected>{k.display}</option>
            {k.dataSet.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </select>
        </div>
      );
    case "number":
      return (
        <div className="mb-3">
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <input
            type="number"
            className="form-control"
            id={k.display}
            aria-describedby="emailHelp"
            value={formData[selected.name][k.display]}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
  }
  return <div style={{ border: "2px solid red" }}>{k.display}</div>;
};

export default FormInput;

// <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
