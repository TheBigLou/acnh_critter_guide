import React from 'react';

const NavTab = ({switchTab}) => {
	return (
	<div className='flex justify-between bg-white-80 f5 f4-ns mb1'>
		<div id='bugTab' className='navbar-button w-third bg-light-yellow' onClick={() => switchTab('bugTab', 'bugTable')}>Bugs</div>
		<div id='fishTab' className='navbar-button w-third' onClick={() => switchTab('fishTab', 'fishTable')}>Fish</div>
		<div id='creatureTab' className='navbar-button w-third' onClick={() => switchTab('creatureTab', 'creatureTable')}>Sea Creatures</div>
	</div>
	);
}

export default NavTab;
