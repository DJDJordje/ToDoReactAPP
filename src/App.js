import './App.css';
import Work from './components/work';
import Fields from './tasks/fields';
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [keysHobies, getKeysHobies] = useState({});
  const [keysWork, getKeysWork] = useState([]);
  const [keysFriends, getKeysFriends] = useState([]);
  const [keysEvents, getKeysEvents] = useState([]);
  const [lastKey, setLastKey] = useState();
  const [hobies, setHobies] = useState({});
  const [work, setWork] = useState([]);
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState([]); //data States
  const [show, setIsShow] = useState(false); //conditions States
  const [showWork, setIsShowWork] = useState(false);
  const [showHobi, setIsShowHobi] = useState(false);
  const [showFriends, setIsShowFriends] = useState(false);
  const [showEvents, setIsShowEvents] = useState(false);
  const [changed, setChange] = useState(true);
  const [values, getValues] = useState([]);
  const getTasks = (listKeys, storage) => {
    let list = [];
    listKeys.forEach(element => {
      list.push(storage[element]);
    });
    return list;
  };
  const handleHobies = data => {
    setHobies(data);
  };
  const handleWork = data => {
    setWork(data);
  };
  const handleFriends = data => {
    setFriends(data);
  };
  const handleEvents = data => {
    setEvents(data);
  };

  const handleLastKey = data => {
    setLastKey(data);
    //console.log(data.length);
    //setCnt(data.length);
  };
  const handleshowWorks = e => {
    //setIsShow(false);
    setIsShowWork(true);
    setIsShowEvents(false);
    setIsShowHobi(false);
    setIsShowFriends(false);
    setIsShow(true);
  };
  const handleshowHobby = e => {
    //e.preventDefault();
    //setIsShow(false);
    setIsShowWork(false);
    setIsShowEvents(false);
    setIsShowHobi(true);
    setIsShowFriends(false);
    setIsShow(true);
  };
  const handleshowFriends = () => {
    setIsShowWork(false);
    setIsShowEvents(false);
    setIsShowHobi(false);
    setIsShowFriends(true);
    setIsShow(true);
  };
  const handleshowEvents = () => {
    setIsShowWork(false);
    setIsShowEvents(true);
    setIsShowHobi(false);
    setIsShowFriends(false);
    setIsShow(true);
  };

  console.log(showEvents, showFriends, showHobi, showWork);

  const handleStorage = useCallback((apllayKeys, applayLastKey) => {
    const storage = JSON.stringify(localStorage);
    const JSONStorage = JSON.parse(storage);
    const keysData = Array.from(Object.keys(JSONStorage));
    //const valuesData = Array.from(Object.values(JSONStorage));
    const hobbyK = keysData
      .filter(el => el.includes('h') && !el.includes('d'))
      .sort((a, b) => {
        let indexA = a.indexOf('h');
        let indexB = b.indexOf('h');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const hobbyD = keysData
      .filter(el => el.includes('hd'))
      .sort((a, b) => {
        let indexA = a.indexOf('hd');
        let indexB = b.indexOf('hd');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    console.log(hobbyD, 'HOBBBBYDATE');
    const workK = keysData
      .filter(el => el.includes('w') && !el.includes('d'))
      .sort((a, b) => {
        let indexA = a.indexOf('w');
        let indexB = b.indexOf('w');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const workD = keysData
      .filter(el => el.includes('wd'))
      .sort((a, b) => {
        let indexA = a.indexOf('wd');
        let indexB = b.indexOf('wd');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const friendsK = keysData
      .filter(el => el.includes('f') && !el.includes('d'))
      .sort((a, b) => {
        let indexA = a.indexOf('f');
        let indexB = b.indexOf('f');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const friendsD = keysData
      .filter(el => el.includes('fd'))
      .sort((a, b) => {
        let indexA = a.indexOf('fd');
        let indexB = b.indexOf('fd');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const eventsK = keysData
      .filter(el => el.includes('e') && !el.includes('d'))
      .sort((a, b) => {
        let indexA = a.indexOf('e');
        let indexB = b.indexOf('e');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const eventsD = keysData
      .filter(el => el.includes('ed'))
      .sort((a, b) => {
        let indexA = a.indexOf('ed');
        let indexB = b.indexOf('ed');
        return Number(a.substring(0, indexA)) - Number(b.substring(0, indexB));
      });
    const hobby = getTasks(hobbyK, JSONStorage);
    const hobbyDates = getTasks(hobbyD, JSONStorage);
    const work = getTasks(workK, JSONStorage);
    const workDates = getTasks(workD, JSONStorage);
    const friends = getTasks(friendsK, JSONStorage);
    const friendsDates = getTasks(friendsD, JSONStorage);
    const events = getTasks(eventsK, JSONStorage);
    const eventsDates = getTasks(eventsD, JSONStorage);
    let kd = keysData.length;
    applayLastKey(kd);
    apllayKeys(
      { taskKeys: hobbyK, dateKeys: hobbyD },
      { taskKeys: workK, dateKeys: workD },
      { taskKeys: friendsK, dateKeys: friendsD },
      { taskKeys: eventsK, dateKeys: eventsD }
    );
    handleHobies({ tasks: hobby, dates: hobbyDates });
    handleWork({ tasks: work, dates: workDates });
    handleFriends({ tasks: friends, dates: friendsDates });
    handleEvents({ tasks: events, dates: eventsDates });
  }, []);
  console.log(hobies, work, 'HOBISEESSSEEES');
  console.log(lastKey);

  const handleKeys = (h, w, f, e) => {
    getKeysHobies({ h });
    getKeysWork({ w });
    getKeysFriends({ f });
    getKeysEvents({ e });
  };
  const checkChange = () => {
    setChange(true);
  };

  useEffect(() => {
    handleStorage(handleKeys, handleLastKey);
    const tm = setTimeout(() => {
      setChange(false);
    }, 10);
    return () => {
      clearTimeout(tm);
    };
  }, [changed]);
  //values={values} keys={keys} lastKey={lastKey
  return (
    <React.Fragment>
      <div className="App">
        {
          <Fields
            show={show}
            showWorks={handleshowWorks}
            showHobby={handleshowHobby}
            showEvents={handleshowEvents}
            showFriends={handleshowFriends}
          ></Fields>
        }
        <div>
          {show && showWork && (
            <Work
              prefix="w"
              values={work}
              lastKey={lastKey}
              keyList={keysWork}
              change={checkChange}
            />
          )}
          {show && showHobi && (
            <Work
              prefix="h"
              values={hobies}
              lastKey={lastKey}
              keyList={keysHobies}
              change={checkChange}
            />
          )}
          {show && showFriends && (
            <Work
              prefix="f"
              values={friends}
              lastKey={lastKey}
              keyList={keysFriends}
              change={checkChange}
            />
          )}
          {show && showEvents && (
            <Work
              prefix="e"
              values={events}
              lastKey={lastKey}
              keyList={keysEvents}
              change={checkChange}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
