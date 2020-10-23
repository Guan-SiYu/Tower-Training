import React, { Component } from "react";
class Ipt extends Component {
  render() {
    const { id, title, onChange, errObj, type, defaultValue } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{title}</label>
        <input
          value={defaultValue}
          id={id}
          type={type}
          className="form-control"
          onChange={(e) => {
            onChange(e, id);
          }}
        />
        {errObj && errObj[id] && (
          <div className="alert alert-danger">{errObj[id]}</div>
        )}
      </div>
    );
  }
}

export default Ipt;
