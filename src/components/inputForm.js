import classes from './input.module.css';
import Input from './input';
import React, { useRef, useState } from 'react';
const InputForm = props => {
  const [isDateCorrect, setDate] = useState(true);
  const [isTextCorrect, setText] = useState(true);
  const [isDatePicked, setIsDatePick] = useState(true);
  const dateRef = useRef();
  const textRef = useRef();
  const formData = new FormData();

  console.log('FORMDATAAAAAAAAAAaa', formData);
  const handleData = e => {
    e.preventDefault();
    console.log(dateRef.current.value, 'DATEREF');
    /*if (dateRef.current.value === NaN) {
      setDate(false);
      return;
    }*/
    let dateInputValue =
      dateRef.current.value === ''
        ? ''
        : Intl.DateTimeFormat('en', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).format(new Date(dateRef.current.value));

    //compute difference between current date and date that you pick
    const pickedMonth = new Date().getMonth() + 1;
    const pickedDay = Number(
      dateInputValue.substring(
        dateInputValue.indexOf('/') + 1,
        dateInputValue.lastIndexOf('/')
      )
    );
    const currentDay = new Date().getDate();
    const pickCorrectDay = () => {
      return (
        Number(
          new Date(
            new Date(new Date().getFullYear(), pickedMonth, 1) - 1
          ).getDate()
        ) - pickedDay
      );
    };

    const pickCorrectMonth = () => {
      return (
        Number(dateInputValue.substring(0, dateInputValue.indexOf('/'))) -
        Number(new Date().getMonth() + 1)
      );
    };

    const pickCorrectYear = () => {
      return (
        Number(dateInputValue.substring(dateInputValue.lastIndexOf('/') + 1)) -
        Number(new Date().getFullYear())
      );
    };
    /////////\\\\\\\\\\
    const pickedDate =
      pickedDay >= currentDay ||
      pickCorrectMonth() > 0 ||
      pickCorrectYear() > 0;
    console.log(
      pickedDate,
      pickedDay,
      currentDay,
      pickCorrectDay(),
      pickCorrectMonth(),
      pickCorrectYear(),
      new Date().getDate(),
      dateInputValue,
      Number(
        dateInputValue.substring(
          dateInputValue.indexOf('/') + 1,
          dateInputValue.lastIndexOf('/')
        )
      ),
      'PISCKDATE'
    );
    //check input truethnes
    if (dateInputValue === '') {
      setIsDatePick(false);
      return;
    } else if (dateInputValue != '') {
      setIsDatePick(true);
    }
    if (!pickedDate || pickCorrectYear() < 0 || pickCorrectDay() < 0) {
      setDate(false);
      return;
    } else if (pickedDate) {
      setDate(true);
    }
    if (!textRef.current.value.length < 2) {
      setText(true);

      if (textRef.current.value.length < 2) {
        setText(false);
        return;
      }
    }
    //gurad statement if check states is valid
    if (!isDateCorrect && !isTextCorrect && !isDatePicked) return;

    formData.append('text', textRef.current.value);
    formData.append('date', dateInputValue);

    props.InputHandler(formData);

    textRef.current.value = '';
    dateRef.current.value = '';
  };

  return (
    <div>
      <form className={classes.wrapper} onSubmit={handleData}>
        <Input class="textInput" type="text" ref={textRef} />
        <Input class="dateInput" type="date" ref={dateRef} />
        <button>Submit</button>
      </form>
      <div className={classes.alerts}>
        {!isDateCorrect && <h1>Pick date that not expire!</h1>}
        {!isDatePicked && <h1>Pick a date!</h1>}
        {!isTextCorrect && <h1>Tipe text longer then one char.</h1>}
      </div>
    </div>
  );
};

export default InputForm;
