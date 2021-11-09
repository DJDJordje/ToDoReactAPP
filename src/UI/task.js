import classes from './task.module.css';
import React, { useState } from 'react';
const Task = props => {
  const [isFocused, setIsfocused] = useState(false);
  const focused = () => {
    setIsfocused(prev => !prev);
  };
  const { monthToExpire, daysToExpire, yearsToExpire } = props.expireTime;
  const mounth =
    monthToExpire > 0
      ? `${
          monthToExpire > 1
            ? monthToExpire + ' months'
            : monthToExpire + ' month'
        }`
      : '';
  let isManthCountToYear = monthToExpire * -1 < 0;

  const monthAnotherYear =
    yearsToExpire > 0 && monthToExpire != 0 && !isManthCountToYear
      ? monthToExpire + 12 + ' months'
      : monthToExpire == 1
      ? monthToExpire + ' month'
      : '';
  const days =
    daysToExpire == 0 && !isManthCountToYear
      ? ''
      : daysToExpire == 0
      ? 'today'
      : `${daysToExpire + ' days'}`;

  const years =
    yearsToExpire > 1
      ? `${
          yearsToExpire > 1 && isManthCountToYear
            ? yearsToExpire + ' years'
            : yearsToExpire > 1 &&
              !isManthCountToYear &&
              yearsToExpire - 1 === 1
            ? yearsToExpire + ' years'
            : yearsToExpire + ' year'
        }`
      : '';

  let cntTimeText =
    daysToExpire < 0 && isManthCountToYear
      ? 'Expired'
      : daysToExpire == 0 && yearsToExpire == 0 && monthToExpire == 0
      ? 'Expire today'
      : `Expire in ${
          yearsToExpire > 0 ? monthAnotherYear : mounth
        } ${days} ${years}`;
  return (
    <li onMouseEnter={focused} onMouseLeave={focused}>
      <div className={classes.task}>
        <p className={!isFocused ? classes.text : classes.textFocused}>
          {props.task}
        </p>
        <div className={classes.dateHolder}>
          <div className={classes.taskDate}>
            <p>{props.date}</p>
          </div>
          <p className={classes.pForDays}>{cntTimeText}</p>
        </div>
      </div>
    </li>
  );
};
export default Task;
