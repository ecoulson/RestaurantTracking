import React from 'react';
import './App.css';
import RestaurantPage from './Components/RestaurantPage';
import Page from './Page';
import GeneralPage from './Components/GeneralPage';
import StatusPage from './Components/StatusPage';
import Status from './Components/StatusPage/Status';

export default class App extends React.Component<{}, { page : Page}> {
	constructor(props : any) {
		super(props);
		const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");
		if (restaurantId) {
			this.state = {
				page: Page.RestaurantCheckIn
			}
		} else {
			this.state = {
				page: Page.GeneralCheckIn
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
			case Page.RestaurantCheckIn:
				return (<RestaurantPage 
							setPage={this.setApplicationState}
							restaurantId={this.getRestaurantId()}
							/>);
			case Page.GeneralCheckIn:
				return (<GeneralPage setPage={this.setApplicationState}/>);
			case Page.Success:
				return (
					<StatusPage 
						status={Status.SUCCESS} 
						restaurant="Bob's Burgers" />
				);
			case Page.Failure:
				return (
					<StatusPage 
						status={Status.FAILURE} 
						restaurant="Bob's Burgers" />
				);
		}
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
