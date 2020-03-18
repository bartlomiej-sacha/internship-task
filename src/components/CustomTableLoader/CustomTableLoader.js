import React from "react";
import { CircularProgress } from '@material-ui/core';
import './CustomTableLoader.css'



/** custom loading component used by React Table */
export class CustomTableLoader extends React.Component {
	render() {
		return (
			<div className='-loading-active'>
				
				{this.props.loading ?
					<div className='-loading-inner'>
						
						<CircularProgress size ={80} />
					</div>
					:
					<div />
				}
			</div>
		);
	}
}

export default CustomTableLoader;