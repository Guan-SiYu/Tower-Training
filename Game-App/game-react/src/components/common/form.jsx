import React, { Component } from "react";
import Joi from "joi-browser";
import Ipt from "./ipt";
// import Select from "./select";
class Form extends Component {
  // state = {data:{},errObj:{}};

  validateChange = (e) => {
    const schemaTarget = { [e.currentTarget.id]: e.currentTarget.value };
    const sonSchema = { [e.currentTarget.id]: this.schema[e.currentTarget.id] };
    const joi = Joi.validate(schemaTarget, sonSchema);
    return joi.error ? joi.error.details[0].message : null;
  };
  handleChange = (e, iptId) => {
    const errMessage = this.validateChange(e);
    const errObj = { ...this.state.errObj };
    if (errMessage) errObj[iptId] = errMessage;
    else delete errObj[iptId];

    const { data } = { ...this.state };
    data[iptId] = e.currentTarget.value;
    this.setState({ data, errObj });
  };

  validate() {
    const abortEarly = { abortEarly: false };
    const joi = Joi.validate(this.state.data, this.schema, abortEarly);
    if (joi.error === null) return null;
    const errObj = {};
    for (let item of joi.error.details) errObj[item.path[0]] = item.message;
    return errObj;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      errObj: this.validate(),
    });
    this.doSubmit();
  };

  renderInput(id, title, defaultValue, type = "text") {
    return (
      <Ipt
        type={type}
        id={id}
        title={title}
        defaultValue={defaultValue}
        onChange={this.handleChange}
        errObj={this.state.errObj}
      />
    );
  }

  renderButton(btnName) {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {btnName}
      </button>
    );
  }
}

export default Form;
