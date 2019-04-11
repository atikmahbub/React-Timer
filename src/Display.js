import React, { Component } from 'react';
import {Body} from './timer';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle,faStopCircle,faSync } from '@fortawesome/free-solid-svg-icons';
library.add(faPlayCircle,faStopCircle,faSync)


var clickCount =0;
var newSecond='',newMin='';
const initialState={
	minute:"00",
	second : "00",
	isOn: false,
	show:true
}
export class Display extends Component{
	constructor(){
		super();
		this.state= initialState

		this.handleClick = this.handleClick.bind(this);
		this.startClick = this.startClick.bind(this);
		this.pauseClicked= this.pauseClicked.bind(this);
		this.resetClicked= this.resetClicked.bind(this);
		
	}

	handleClick(e){

		clickCount+=1;
		console.log(clickCount);

		if(clickCount <= 2){
		newSecond = newSecond + e;
			this.setState({
				second:newSecond
			})	
		}
		else if(clickCount <= 4){
			newMin = newMin + e;
			this.setState({
				minute: newMin
			})
		}

	}


	startClick(){

		if(this.state.second > 60 ){
			this.setState({
				second:this.state.second - 60,
				minute: parseInt(this.state.minute) + 1
			})
			}

		if(this.state.second==0){
				this.setState({
				second: 59,
				minute: this.state.minute - 1
			})
		}	
		
		if(parseInt(this.state.minute) > 0 || parseInt(this.state.second) > 0) {


		this.intervalId = setInterval(()=>{
		this.setState({
     		 second: this.state.second - 1,
     		 show: false
     		 
    	})

		if( parseInt(this.state.second)===0 && parseInt(this.state.minute)===0){

			this.setState(initialState);
			clearInterval(this.intervalId);
			newSecond =  newMin = '';
			clickCount=0;

		}
		else if(this.state.second===0 && parseInt(this.state.minute) > 0){
			this.setState({
				second: 60,
				minute: this.state.minute - 1
			})
		}
		}  ,1000)
	}

	}
	pauseClicked(){
	 	clearInterval(this.intervalId)
	}

	resetClicked(){

		this.setState(initialState);
		clearInterval(this.intervalId);
		newSecond =  newMin = '';
		clickCount=0;
	}

	render(){
		return (

			<div id="body">

			<div id="timerOnly">

			<div id="mainDisplay">

			<div className="action">
			<button onClick={this.startClick  }><FontAwesomeIcon className="play" icon="play-circle"/></button>
			<button onClick={this.pauseClicked}><FontAwesomeIcon className= "pause" icon="stop-circle"/></button>
			<button onClick={this.resetClicked}><FontAwesomeIcon className="reset" icon="sync"/></button>
			</div>

			<div className = "timerDisplay">
			{this.state.minute}:{this.state.second}
			</div>

			</div>

			</div>
			<div className="keypad">
			{  this.state.show ? (<Body click = {this.handleClick} />) : null }
			</div>
			 </div>

			);
	}
}