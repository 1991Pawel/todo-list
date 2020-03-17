import React from "react";
import styles from "./DatePanel.module.scss";

const now = new Date();
const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

class DataPanel extends React.Component {
  
  state = {
    day: days[now.getDay()],
    month: `0${now.getMonth()}`,
    year: now.getFullYear()
  };

 

  render() {
      const {day,month,year} = this.state;

    return (

      <div className={styles.wrapper}>
        <span className={styles.day}>{day}</span>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
    );
  }
}

export default DataPanel;
