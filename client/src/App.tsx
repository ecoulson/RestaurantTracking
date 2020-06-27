import React from 'react';
import './App.css';
import RestaurantPage from './Pages/ContactLogPages/RestaurantPage';
import Page from './Page';
import GeneralPage from './Pages/ContactLogPages/GeneralPage';
import StatusPage from './Pages/ContactLogPages/StatusPage';
import Status from './Pages/ContactLogPages/StatusPage/Status';
import IAppState from './IAppState';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
	faTimes, 
	faTimesCircle, 
	faCheck, 
	faCheckCircle, 
	faRedo,
	faChevronRight
} from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faTimesCircle, faCheck, faCheckCircle, faRedo, faChevronRight);


export default class App extends React.Component<{}, IAppState> {
	constructor(props : any) {
		super(props);
		const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");
		if (restaurantId) {
			this.state = {
				page: Page.RestaurantCheckIn,
				restaurantName: ""
			}
		} else {
			this.state = {
				page: Page.GeneralCheckIn,
				restaurantName: ""
			}
		}

		this.setApplicationState = this.setApplicationState.bind(this);
		this.setRestaurantName = this.setRestaurantName.bind(this);
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
			case Page.RestaurantCheckIn:
				return (<RestaurantPage 
							setRestaurantName={this.setRestaurantName}
							setPage={this.setApplicationState}
							restaurantId={this.getRestaurantId()}
							/>);
			case Page.GeneralCheckIn:
				return (<GeneralPage 
							setPage={this.setApplicationState}
							setRestaurantName={this.setRestaurantName}
							/>);
			case Page.Success:
				return (
					<StatusPage 
						status={Status.SUCCESS} 
						restaurant={this.state.restaurantName} />
				);
			case Page.Failure:
				return (
					<StatusPage 
						status={Status.FAILURE} 
						restaurant={this.state.restaurantName} />
				);
		}
	}

	private setRestaurantName(restaurantName : string) {
		this.setState({
			restaurantName
		})
	}

	private setApplicationState(state : Page) {
		this.setState({
			page: state
		})
	}

	private getRestaurantId() {
		return new URLSearchParams(window.location.search).get("restaurantId") as string;
	}
}
