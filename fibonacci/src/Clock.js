import React, { Component } from 'react';
import './Clock.css';



//const fibClock() = () => {

    class Rectangle extends React.Component {
        constructor(props) {
            super(props);
            this.state = {xpos:props.xpos, ypos:props.ypos, width:props.width,
                          height:props.height, stroke: "white",
                          fillColor : "black"}
        }
        componentDidMount() {
            this.timerID = setInterval(() => this.newTime(), 3000);
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        newTime() {
            this.setState({
                fillColor : this.getFillColor(this.props.fillColor)
            });
        }

        getFillColor(time) {
            switch (Number(time)) {
            case 1:
                return "blue"
                break;
            case 2:
                return "green"
                break;
            case 3:
                return "red"
                break;
            default:
                return "black"
            }
        }

        render() {
            return (
                    <rect
                className="rectClass"
                x={this.state.xpos}
                y={this.state.ypos}
                width={this.state.width}
                height={this.state.height}
                fill={this.state.fillColor}
                stroke={this.state.stroke}
                flex="1"
                    />
            );
        }
    };

    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = { date: new Date(), zeroFill: 0, oneFill : 0,
                           twoFill : 0, threeFill: 0,
                           fiveFill : 0, meridian : ""};

        }

        componentDidMount() {
            this.tick();
            this.timerID = setInterval(() => this.tick(), 3000);
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        parseTime(hour, minute, rectVal) {
            var hourVal = (hour >= rectVal) ? 1 : 0;
            var minuteVal = (minute >= rectVal) ? 2 :0;
            return hourVal + minuteVal;
        }

        tick() {
            this.setState({
                date: new Date()
            });
            var hour = this.state.date.getHours()%12;
            if (this.state.date.getHours() >=12) { this.setState({ meridian :"white"})};
            var minute = Math.floor(this.state.date.getMinutes()/5);
            console.log(minute);
            this.setState( {
                fiveFill: this.parseTime(hour,minute,5)
            });
            var fiveHour = (hour >= 5) ? hour - 5 : hour;
            var fiveMin = (minute >= 5) ? minute - 5 : minute;
            this.setState( {
                threeFill : this.parseTime(fiveHour, fiveMin, 3)
            });
            var threeHour = (fiveHour >= 3) ?  fiveHour -3 : fiveHour;
            var threeMin = (fiveMin >= 3) ? fiveMin -3 : fiveMin;
            this.setState( {
                twoFill : this.parseTime(threeHour, threeMin, 2)
            });
            var twoHour = (threeHour >= 2) ?  threeHour - 2 : threeHour;
            var twoMin = (threeMin >= 2) ? threeMin -2: threeMin;
            this.setState( {
                oneFill : this.parseTime(twoHour, twoMin, 1)
            });
            var oneHour = (twoHour >= 1) ? twoHour -1 : twoHour;
            var oneMin = (twoMin >= 1) ? twoMin -1: twoMin;
            this.setState( {
                zeroFill : this.parseTime(oneHour, oneMin, 1)
            });
            console.log(this.state.meridian);
        }

        render() {
            return (
                    <svg width="100%" height="100%" flex="1"
                stroke="white" stroke-width="100">
                    <Rectangle
                xpos="25%"
                ypos="20%"
                width="12.5%"
                height="20%"
                fillColor={this.state.zeroFill}
                    />
                    <Rectangle
                xpos="25%"
                ypos="0"
                width="12.5%"
                height="20%"
                fillColor={this.state.oneFill}
                    />
                    <Rectangle
                xpos="00"
                ypos="00"
                width="25%"
                height="40%"
                fillColor={this.state.twoFill}
                    />
                    <Rectangle
                xpos="00"
                ypos="40%"
                width="37.5%"
                height="60%"
                fillColor={this.state.threeFill}
                    />
                    <Rectangle
                xpos="37.5%"
                ypos="0"
                width="62.5%"
                height="100%"
                fillColor={this.state.fiveFill}
                    />
                    <rect
                x= "93.75%"
                y="0"
                width="6.25%"
                height="10%"
                fill={this.state.meridian}
                    />

                </svg>
            );
        }
    };

//ReactDOM.render(<Clock />, document.getElementById("root"));
export default Clock;
