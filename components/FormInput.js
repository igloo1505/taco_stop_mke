import React, { useState, useEffect } from "react";
import styles from "../styles/PortalLeftTab.module.scss";
import { connect } from "react-redux";

const FormInput = ({
  props: { k, setFormData, formData, selected, selectedItem, setSelectedItem },
  UI: { isEditing },
}) => {
  const [booleanToggle, setBooleanToggle] = useState(false);
  useEffect(() => {
    console.log("Running in useEffect");
    console.log(selectedItem[k.display]);
    if (isEditing) {
      setBooleanToggle(selectedItem[k.display]);
    }
    if (!isEditing) {
      setBooleanToggle(false);
    }
  }, [isEditing, selectedItem]);
  const handleChange = (value) => {
    console.log(value, k.display);
    // console.log("Change: ", selected.name, formData, k.display, selectedItem);
    if (!isEditing) {
      setFormData({
        ...formData,
        [selected.name]: {
          ...formData[selected.name],
          [k.display]: value,
        },
      });
    }
    if (isEditing) {
      setSelectedItem({ ...selectedItem, [k.display]: value });
    }
  };

  const handleSwitchState = () => {
    debugger;
    console.log("Running switch state");
    if (isEditing) {
      return selectedItem[k.display];
    }
    if (!isEditing) {
      return booleanToggle;
    }
  };

  // TODO Add form validation on frontend to check password confirmation and validate password and email fields. Consider adding other fields for phone number and email.

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
            value={
              isEditing
                ? selectedItem[k.display]
                : formData[selected.name][k.display]
            }
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    case "textArea":
      return (
        <div className="mb-3">
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <textarea
            class="form-control"
            aria-label="With textarea"
            style={{ height: "115px" }}
            onChange={(e) => handleChange(e.target.value)}
            value={
              isEditing
                ? selectedItem[k.display]
                : formData[selected.name][k.display]
            }
          ></textarea>
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
            // value={formData[selected.name][k.display]}
            value={
              isEditing
                ? selectedItem[k.display]
                : formData[selected.name][k.display]
            }
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    case "boolean":
      console.log("k display in boolean iput", k.display);
      return (
        <div className="mb-1 form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            id={k.display}
            value={
              isEditing
                ? selectedItem[k.display]
                : formData[selected.name][k.display]
            }
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
            value={
              isEditing
                ? selectedItem[k.display]
                : formData[selected.name][k.display]
            }
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
            value={
              isEditing
                ? selectedItem[k.display]
                : formData[selected.name][k.display]
            }
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
  }
  return <div style={{ border: "2px solid red" }}>{k.display}</div>;
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(FormInput);

// <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
