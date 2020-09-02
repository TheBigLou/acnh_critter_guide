import React, { Component } from 'react';
import CritterTable from './CritterTable';
import TimeBox from './TimeBox';
import NavTab from './NavTab';
import { bugList, fishList, seaCreatureList } from './critList';
import 'tachyons';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      hem: 'north',
      bugList: bugList,
      fishList: fishList,
      seaCreatureList: seaCreatureList,
      playerMonth: new Date().getMonth(),
      playerHour: new Date().getHours(),
      clearFilter: true
    };
  }

  setHem = (hem) => {
    this.setState({hem: hem})
  }

  setPlayerMonth = (date) => {
    this.setState({playerMonth: date.getMonth()})
  }

  setPlayerHour = (time) => {
    this.setState({playerHour: time.getHours()})
  }

  critSeason = (crit) => {
    const { playerMonth, hem } = this.state;
    const [critStart, critEnd] = [crit.start_month[hem], crit.end_month[hem]];
    let crossYear = false;
    if (critStart[0] === 'Year-round') {
      return true;
    }
    const inSeason = critStart.map((start, i) => {
      start > critEnd[i] ? crossYear = true : crossYear = false;
      if (crossYear && !(playerMonth > critEnd[i] && playerMonth < start)) {
        return true;
      } else if (!crossYear && playerMonth >= start && playerMonth <= critEnd[i]) {
        return true;
      } else {
        return false;
      }
    })
    return inSeason.includes(true) ? true : false;
  }

  critTime = (crit) => {
    const { playerHour } = this.state;
    const critStart = crit.start_time;
    const critEnd = crit.end_time;
    let crossDay = false;
    if (critStart[0] === 'All day') {
      return true;
    }
    const rightTime = critStart.map((start, i) => {
      start > critEnd[i] ? crossDay = true : crossDay = false;
      if (crossDay && !(playerHour >= critEnd[i] && playerHour < start)) {
        return true;
      } else if (!crossDay && playerHour >= start && playerHour < critEnd[i]) {
        return true;
      } else {
        return false
      }
    })
    return rightTime.includes(true) ? true : false;
  }

  filterToggle = () => {
    const bState = document.getElementById("clearFilterToggle");
    if (bState.innerHTML === "Show All") {
      bState.innerHTML = "Show Filtered";
      this.setState({clearFilter: true});
    } else {
      bState.innerHTML = "Show All";
      this.setState({clearFilter: false})
    }
  }

  switchTab = (tab, table) => {
    const critTables = document.getElementsByClassName('ct');
    const navButtons = document.getElementsByClassName('navbar-button');
    let i;
    for (i = 0; i < critTables.length; i++) {
      critTables[i].style.display = 'none';
    }
    for (i = 0; i < critTables.length; i++) {
      navButtons[i].className = navButtons[i].className.replace(' bg-light-yellow', '')
    }
    document.getElementById(table).style.display = 'block';
    document.getElementById(tab).className +=' bg-light-yellow';
  }

  componentDidMount() {
    this.switchTab('bugTab', 'bugTable');
  }

  render() {
    const {bugList, fishList, seaCreatureList, hem, clearFilter} = this.state;
    const filteredBugs = bugList.filter(this.critSeason).filter(this.critTime);
    const filteredFish = fishList.filter(this.critSeason).filter(this.critTime);
    const filteredSeaCreatures = seaCreatureList.filter(this.critSeason).filter(this.critTime);
    return (
      <div>
        <div className='f1 f-headline-ns acnh-font tc gold'>Animal Crossing: New Horizons Critter Guide</div>
        <div className='flex justify-center w-100'>
          <TimeBox setHem={this.setHem} setPlayerHour={this.setPlayerHour} setPlayerMonth={this.setPlayerMonth} />
        </div>
        <div className='flex justify-center'>
          <div id='clearFilterToggle' className='tc f3 bg-light-yellow pa2 br2 ma3 pointer' onClick={() => this.filterToggle()}>Show Filtered</div>
        </div>
        <div id='table-area' className='flex flex-wrap justify-center'>
          <div className='w-50-ns w-80-m w-60-l mh2'>
            <NavTab switchTab={this.switchTab} />
            <div id='bugTable' className='f7 f5-ns ct'>
              { clearFilter ? 
                <CritterTable
                critlist={bugList}
                hem={hem}
                critType='bug'
                />
                : <CritterTable 
                critlist={filteredBugs}
                hem={hem}
                critType='bug'
                />
              }
            </div>
            <div id='fishTable' className='f7 f5-ns ct'>
            { clearFilter ? 
              <CritterTable
              critlist={fishList}
              hem={hem}
              critType='fish'
              />
              : <CritterTable 
              critlist={filteredFish}
              hem={hem}
              critType='fish'
              />
            }
            </div>
            <div id='creatureTable' className='f7 f5-ns ct'>
            { clearFilter ? 
              <CritterTable
              critlist={seaCreatureList}
              hem={hem}
              critType='sea creature'
              />
              : <CritterTable 
              critlist={filteredSeaCreatures}
              hem={hem} 
              critType='sea creature'
              />
             }
             </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
