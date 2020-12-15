import React from 'react';

export default class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            symbol : "/"
        }
        this.symbols = ["\\","|","/","-"];
        this.start = 0;
        this.interval;
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({symbol: this.symbols[this.start%4]});
            ++this.start;
        }, 100);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    
    render(){
        const {symbol} = this.state;
        return(
            <div>
                {symbol}
            </div>
        ); 
    }
}