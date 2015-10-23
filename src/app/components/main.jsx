'use strict';
/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
const ReactDOM = require('react-dom');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const LinkedStateMixin = require('react-addons-linked-state-mixin');

const Main = React.createClass({

	mixins: [LinkedStateMixin],

	childContextTypes: {
		muiTheme: React.PropTypes.object,
	},

	getInitialState() {
		return {
			muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
		};
	},

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme,
		};
	},

	componentWillMount() {
		let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
			accent1Color: Colors.deepOrange500,
		});
		
		this.setState({muiTheme: newMuiTheme});

		console.log(Math.random());
		if (localStorage.password == null)
		{
			console.log('poopy');
			this.setState({password: '12345'});
		}
		else
		{
			console.log('yay, localstorage');
			this.setState({password: localStorage.password});
		}
	},

	render() {

		let containerStyle = {
			textAlign: 'center',
			paddingTop: '200px',
		};

		let standardActions = [
			{ text: 'Save', onTouchTap: this._onPasswordSave},
		];

		return (
			<div style={containerStyle}>
				<Dialog
					title="Super Secret Password"
					actions={standardActions}
					ref="superSecretPasswordDialog">
					<TextField
						ref="passwordTextField"
						valueLink={this.linkState('password')}
						multiLine={true}
						hintText={'Type a thing.'}
						/>
				</Dialog>

				<h1>material-ui</h1>
				<h2>example project</h2>

				<RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

			</div>
		);
	},

	_onPasswordSave() {
		localStorage.setItem('password', this.state.password);
		this.refs.superSecretPasswordDialog.dismiss();
	},

	_handleTouchTap() {
		this.refs.superSecretPasswordDialog.show();
	},

});

module.exports = Main;
