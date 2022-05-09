import React, { useState, useEffect } from 'react';
import './count.css';

export const Count = ({count}) => {

	return (
		<>
	      <div className="count">
			{count}
	      </div>
	    </>
	);

}