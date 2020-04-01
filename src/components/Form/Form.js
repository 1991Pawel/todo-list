import React from "react";
import styles from "../Form/Form.module.scss";
import AppContext from "../../context";

class Form extends React.Component {
  state = {
    inputValue: ""
  };

  inputValueHandler = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleSubmit = (e, addTaskFn) => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim()) {
      addTaskFn(inputValue);

      this.setState({
        inputValue: ""
      });
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <AppContext.Consumer>
        {({ addTaskFn }) => (
          <div className={styles.wrapper}>
            <form
              onSubmit={e => this.handleSubmit(e, addTaskFn)}
              autoComplete="off"
              className={styles.form}
            >
              <label className={styles.form__label} htmlFor="task">
                What you need to do ?
              </label>
              <input
                className={styles.form__input}
                type="text"
                id="task"
                placeholder="task..."
                value={inputValue}
                required
                onChange={this.inputValueHandler}
                autoFocus
                maxLength="100"
              />
              <button type="submit" className={styles.form__btn}>
                Add Task
              </button>
            </form>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Form;
