import React from 'react';
import classnames from 'classnames';
import styles from './InputItem.module.css';
import buttonImg from './img/add.svg';

class InputItems extends React.Component {
  state = {
    inputValue: '',
    error: false,
    repeat: false
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.inputValue === '') {
      this.setState({
          error: true,
          repeat: false
      })
    } else if (this.props.items.find(item => item.value === this.state.inputValue)) {
      this.setState({
          repeat: true
      })
    } else {
      this.setState({
          inputValue: '',
          error: false,
          repeat: false
      })
      this.props.onClickAdd(this.state.inputValue);
    }
  }

  render() {
    const { onClickAdd, items } = this.props;

    return (
      <form
        onSubmit={this.onSubmit}
        className={classnames({
          [styles.form]: true,
          [styles.error]: this.state.error,
          [styles.repeat]: this.state.repeat
        })}>
        <input
          type='text'
          placeholder={'Просто введите сюда название дела...'}
          value={this.state.inputValue}
          onChange={event => this.setState({inputValue: event.target.value})}
          className={styles.input}
        />
        <button className={styles.btn}>
          <img src={buttonImg} alt='Button'/>
        </button>
      </form>);
  }
};

export default InputItems;
