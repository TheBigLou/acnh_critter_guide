import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeBox = ({setHem, setPlayerMonth, setPlayerHour}) => {
    const [startDateTime, setStartDateTime] = useState(new Date());
    return (
        <form>
            <fieldset>
                <legend>Month and Hour</legend>
                <DatePicker
                selected={startDateTime}
                onChange={(date) => {
                    setStartDateTime(date)
                    setPlayerMonth(date)
                }}
                dateFormat="MMMM"
                showMonthYearPicker
                />
                <DatePicker
                selected={startDateTime}
                onChange={(time) => {
                    setStartDateTime(time)
                    setPlayerHour(time)
                }}
                dateFormat="h aa"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                />
            </fieldset>
            <fieldset>
                <legend>Hemisphere</legend>
                <input type="radio" id="north" name="hem" value="north" defaultChecked onClick={() => setHem('north')}/>
                <label className='' htmlFor="north">Northern Hemisphere</label><br />
                <input type="radio" id="south" name="hem" value="south" onClick={() => setHem('south')}/>
                <label className='' htmlFor="south">Southern Hemisphere</label><br />
            </fieldset>
        </form>
    );
}

export default TimeBox;