import React, { useRef, useEffect, useState, useCallback } from 'react';
import Section from '../UI/section';
import InputForm from './inputForm';
import Task from '../UI/task';
import classes from './work.module.css';
const Work = props => {
  /*const [keys, getKeys] = useState([]);
  const [values, getValues] = useState([]);*/
  const [cnt, setCnt] = useState(0);
  const [expireTime, setExpireTime] = useState({});
  //const [last, setLastKey1] = useState();
  const inputRef1 = useRef();
  const InputHadnler1 = (data, e) => {
    //  e.preventDefault();
    console.log(data);
    localStorage.setItem(props.lastKey + 1 + props.prefix, data.get('text'));
    localStorage.setItem(
      props.lastKey + 1 + props.prefix + 'd',
      data.get('date')
    );
    props.change();
  };
  const deleteItem = (idt, idd) => {
    localStorage.removeItem(idt);
    localStorage.removeItem(idd);
    props.change();
  };

  console.log(localStorage);
  const { tasks, dates } = props.values;
  let li1 = props.values.tasks.map((el, i) => {
    console.log(props.keyList, props.values, dates[i], 'KEYLISTSTSTSTST');
    const { taskKeys, dateKeys } = props.keyList[props.prefix];
    let idT = taskKeys[i];
    let idD = dateKeys[i];
    let date = dates[i];
    let dateNow = Intl.DateTimeFormat('en', {
      day: '2-digit',
      mounth: '2-digit',
      year: 'numeric',
    }).format(new Date());
    const dayToExpire =
      Number(date.substring(date.indexOf('/') + 1, date.lastIndexOf('/'))) -
      Number(
        dateNow.substring(dateNow.indexOf('/') + 1, dateNow.lastIndexOf('/'))
      );
    const dateValue = Intl.DateTimeFormat('en', {
      dateStyle: 'short',
    }).format(new Date());
    /////////////// set expire time values and set props to task component
    const pickCorrectDay = () => {
      return Number(
        date.substring(date.indexOf('/') + 1, date.lastIndexOf('/')) -
          Number(new Date().getDate())
      );
    };

    const pickCorrectMonth = () => {
      return (
        Number(date.substring(0, date.indexOf('/'))) -
        Number(new Date().getMonth() + 1)
      );
    };

    const pickCorrectYear = () => {
      return (
        Number(date.substring(date.lastIndexOf('/') + 1)) -
        Number(new Date().getFullYear())
      );
    };
    const expireTime = {
      monthToExpire: pickCorrectMonth(),
      daysToExpire: pickCorrectDay(),
      yearsToExpire: pickCorrectYear(),
    };
    /////////
    console.log(
      localStorage,
      expireTime,
      pickCorrectMonth(),
      pickCorrectDay(),
      pickCorrectYear(),
      date,
      new Date().getDate(),
      dayToExpire,
      date.indexOf('/'),
      date.lastIndexOf('/'),
      date.substring(date.indexOf('/') + 1, date.lastIndexOf('/')),
      date.substring(date.lastIndexOf('/') + 1),
      date.substring(0, date.indexOf('/')),
      'DAYTOEXPIRE'
    );
    return (
      <section>
        <div className={classes.lispacing}>
          <Task task={el} date={date} expireTime={expireTime} />
          <button
            className={classes.cancel}
            type="button"
            onClick={deleteItem.bind(null, idT, idD)}
          >
            X
          </button>
        </div>
      </section>
    );
  });
  //console.log(li1);
  const wrapColore = `${classes.colore} ${classes[props.prefix]}`;
  return (
    <React.Fragment>
      <div className={classes.work}>
        <div className={wrapColore}>
          <Section>
            <InputForm InputHandler={InputHadnler1} />
          </Section>
          <ul>{li1}</ul>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Work;
