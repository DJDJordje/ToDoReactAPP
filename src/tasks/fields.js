import classes from './fields.module.css';
import React, { useState } from 'react';
const Fields = props => {
  const [worksOn, setWorksOn] = useState(false);
  const [hobbyOn, setHobbyOn] = useState(false);
  const [friendsOn, setfriendsOn] = useState(false);
  const [eventsOn, setEventsOn] = useState(false);
  let hobi = `${classes.field} ${
    hobbyOn ? classes.HobbyField : classes.hobbyActive
  }`;
  let work = `${classes.field}  ${
    worksOn ? classes.WorkField : classes.workActive
  } `;
  let friends = `${classes.field} ${
    friendsOn ? classes.FriendsField : classes.friendsActive
  }`;
  let events = `${classes.field} ${
    eventsOn ? classes.EventsField : classes.eventsActive
  }`;

  const hobiB = `${classes.fieldBased} ${classes.hobby}`;
  const workB = `${classes.fieldBased} ${classes.work}`;
  const friendsB = `${classes.fieldBased} ${classes.friends}`;
  const eventsB = `${classes.fieldBased} ${classes.events}`;
  const handleWorks = () => {
    props.showWorks();
    setHobbyOn(false);
    setfriendsOn(false);
    setEventsOn(false);
    setWorksOn(true);
  };
  const handleHobby = () => {
    props.showHobby();
    setHobbyOn(true);
    setfriendsOn(false);
    setEventsOn(false);
    setWorksOn(false);
  };
  const handleEvents = () => {
    props.showEvents();
    setHobbyOn(false);
    setfriendsOn(false);
    setEventsOn(true);
    setWorksOn(false);
  };
  const handleFriends = () => {
    props.showFriends();
    setHobbyOn(false);
    setfriendsOn(true);
    setEventsOn(false);
    setWorksOn(false);
  };
  return (
    <div
      className={
        !props.show ? classes.fieldsConainer : classes.transformedFields
      }
    >
      <div className={props.show ? hobi : hobiB} onClick={handleHobby}>
        <h1>Hobby</h1>
      </div>
      <div className={props.show ? work : workB} onClick={handleWorks}>
        <h1>Work</h1>
      </div>
      <div className={props.show ? friends : friendsB} onClick={handleFriends}>
        <h1>Friends</h1>
      </div>
      <div className={props.show ? events : eventsB} onClick={handleEvents}>
        <h1>Events</h1>
      </div>
    </div>
  );
};

export default Fields;
