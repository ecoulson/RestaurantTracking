import React from 'react';
import './App.css';
import RestaurantPage from './RestaurantPage';
import ApplicationState from './ApplicationState';
import GeneralPage from './GeneralPage';
import StatusPage from './StatusPage';
import Status from './StatusPage/Status';

export default class App extends React.Component<{}, { page : ApplicationState}> {
	constructor(props : any) {
		super(props);
		const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");
		if (restaurantId) {
			this.state = {
				page: ApplicationState.Restaurant
			}
		} else {
			this.state = {
				page: ApplicationState.General
			}
		}
	}

	render() {
		return (
			<div className="app">
				<div className="container">
					{this.getPage()}
				</div>
			</div>
		);
	}

	getPage() {
		switch(this.state.page) {
			case ApplicationState.Restaurant:
				return (<RestaurantPage />);
			case ApplicationState.General:
				return (<GeneralPage />);
			case ApplicationState.Succes:
				return (
					<StatusPage 
						status={Status.SUCCESS} 
						restaurant="Bob's Burgers" />
				);
			case ApplicationState.Failure:
				return (
					<StatusPage 
						status={Status.FAILURE} 
						restaurant="Bob's Burgers" />
				);
		}
	}
}
