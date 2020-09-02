import React from 'react';
import Critter from './Critter';

const CritterTable = ({critlist, hem, critType}) => {
	return (
		<table className='ba collapse'>
			<thead>
				<tr className='ba h2 bg-white-80'>
					<th>Name</th>
					<th>Where Found</th>
					{(critType === 'fish' || critType === 'sea creature') &&
						<th>Shadow Size</th>
					}
					<th>Sell Price</th>
					<th>Times Active</th>
					<th>Months Active</th>
				</tr>
			</thead>
			<tbody>
				{critlist.map((crit) => {
					return (
						<Critter 
						key={crit.id}
						crit={crit}
						hem={hem}
						/>
					);
				})}
			</tbody>
		</table>
	)
}

export default CritterTable;