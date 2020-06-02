import React from 'react';
import './App.css';
import RestaurantPage from './Components/RestaurantPage';
import ApplicationState from './ApplicationState';
import GeneralPage from './Components/GeneralPage';
import StatusPage from './Components/StatusPage';
import Status from './Components/StatusPage/Status';

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

		this.setApplicationState = this.setApplicationState.bind(this);
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

	private getPage() {
		switch(this.state.page) {
			case ApplicationState.Restaurant:
				return (<RestaurantPage 
							setApplicationState={this.setApplicationState}
							restaurantId={this.getRestaurantId()}
							/>);
			case ApplicationState.General:
				return (<GeneralPage />);
			case ApplicationState.Success:
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

	private setApplicationState(state : ApplicationState) {
		this.setState({
			page: state
		})
	}

	private getRestaurantId() {
		return new URLSearchParams(window.location.search).get("restaurantId") as string;
	}
}
