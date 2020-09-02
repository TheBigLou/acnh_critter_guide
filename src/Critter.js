import React from 'react';

const Critter = ({crit, hem}) => {
	return (
			<tr className='striped--table h2'>
				<td>{crit.name}</td>
				<td style={{whiteSpace:"pre-wrap", wordWrap:"break-word"}}>{crit.where}</td>
				{(crit.shadow !== undefined) && 
					<td>{crit.shadow}</td>}
				<td>{crit.value}</td>
				{(crit.start_time[0] === 'All day') ?
					<td style={{whiteSpace:"pre-wrap", wordWrap:"break-word"}}>All day</td>
					: <td style={{whiteSpace:"pre-wrap", wordWrap:"break-word"}}>
					{crit.start_time.map((time, i) => {
						const sT = new Date();
						const eT = new Date();
						sT.setHours(time);
						sT.setMinutes(0);
						eT.setHours(crit.end_time[i]);
						eT.setMinutes(0);
						return `${sT.toLocaleTimeString(navigator.language, {hour: '2-digit'})} - ${eT.toLocaleTimeString(navigator.language, {hour: '2-digit'})}\n`
					})}
					</td>
				}
				{(crit.start_month[hem][0] === 'Year-round') ?
					<td style={{whiteSpace:"pre-wrap", wordWrap:"break-word"}}>Year-round</td>
					: <td style={{whiteSpace:"pre-wrap", wordWrap:"break-word"}}>
					{crit.start_month[hem].map((month, i) => {
						const sM = new Date();
						const eM = new Date();
						sM.setMonth(month);
						eM.setMonth(crit.end_month[hem][i]);
						return `${sM.toLocaleDateString(navigator.language, {month: 'short'})} - ${eM.toLocaleDateString(navigator.language, {month: 'short'})}\n`
					})}
					</td>
				}
			</tr>
	)
}

export default Critter;