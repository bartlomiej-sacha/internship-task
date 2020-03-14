import React from "react";
import { CircularProgress } from '@material-ui/core';
import './CustomTableLoader.css'

export default class CustomTableLoader extends React.Component {
	render() {
		return (
			<div className='-loading-active'>
				
				{this.props.loading ?
					<div className='-loading-inner'>
						
						<CircularProgress />
					</div>
					:
					<div />
				}
			</div>
		);
	}
}