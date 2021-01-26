import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (<div id="app">
            <h1 id="js-calc-title">JavaScript Calculator</h1>
            <Calculator />
        </div>);
    }
}


class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayed : '0',
            firstClick: true,
            allowDecimal: true,
            allowOperator: false,
            firstDigit: true,
            allowEquals:false
        }
        
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleDecimalClick = this.handleDecimalClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleEqualsClick = this.handleEqualsClick.bind(this);
        this.handleZeroClick = this.handleZeroClick.bind(this);
    }

    handleClearClick(){
        this.setState({
            displayed : '0',
            firstClick: true,
            allowDecimal: true,
            allowOperator: false,
            firstDigit: true,
            allowEquals:false
        });
    }
    handleButtonClick(event){
        if(this.state.firstClick){
            this.setState({
                displayed: event.target.innerText,
                firstClick: false,
                allowOperator: true,
                firstDigit: false,
                allowEquals: true
            })
        }else{
            this.setState({
                displayed: this.state.displayed.concat(event.target.innerText),
                allowOperator: true,
                firstDigit: false,
                allowEquals: true
            })
        }   
    }
    handleDecimalClick(event){
        if(this.state.allowDecimal){
            this.setState({
                displayed: this.state.displayed.concat(event.target.innerText),
                allowDecimal: false,
                firstClick: false,
                allowOperator: false
            });
        }
    }
    handleOperatorClick(event){
        if(this.state.allowOperator){
            this.setState({
                displayed: this.state.displayed.concat(event.target.innerText),
                allowDecimal: true,
                firstClick: false,
                firstDigit: true,
                allowEquals: false
            });
        }
    }
    handleEqualsClick(){
        if(this.state.allowEquals){
            var formulaString = this.state.displayed;
        
            var formulaArray = formulaString.split('');

            var arrayWithTwo = [];
            
            for(let i = 0; i < formulaArray.length; i++){
                
                if(this.isOperator(formulaArray[i]) && this.isOperator(formulaArray[i+1]) && this.isOperator(formulaArray[i+2]) ){

                }else{
                    arrayWithTwo.push(formulaArray[i])
                }
            }

           
            for(let i = 0; i < arrayWithTwo.length; i++){
                if(this.isOperator(arrayWithTwo[i]) && this.isOperator(arrayWithTwo[i+1])){

                    if(arrayWithTwo[i+1] === '-'){
                        
                    }else{
                        arrayWithTwo.splice(i,1);
                    }
                }
            }
            
            var refinedFormula = arrayWithTwo.join('').replaceAll('x','*').replaceAll('--','+');
            
            
            this.setState({
                displayed: eval(refinedFormula).toString() ,
                allowOperator:true,
                allowDecimal:true
            });
        }
        
    }
    handleZeroClick(event){
        if(!this.state.firstDigit){
            this.handleButtonClick(event);
        }
    }

    isOperator = (c) => {
        return c === '+' || c === '-' || c === 'x' || c === '/';
    }

    render(){
        return (<div id="calculator">
            <div id="display">
                <h1 className="col-12">{this.state.displayed}</h1>
            </div>
            <div>
                <button className="calc-btn col-4" id="clear" onClick={this.handleClearClick}><strong>AC</strong></button>
                <button className="calc-btn col-4" id="divide" onClick={this.handleOperatorClick}>/</button>
                <button className="calc-btn col-4" id="multiply" onClick={this.handleOperatorClick}>x</button>
            </div>
            
            <div>
                <button className="calc-btn col-3" id="seven" onClick={this.handleButtonClick}>7</button>
                <button className="calc-btn col-3" id="eight" onClick={this.handleButtonClick}>8</button>
                <button className="calc-btn col-3" id="nine" onClick={this.handleButtonClick}>9</button>
                <button className="calc-btn col-3" id="subtract" onClick={this.handleOperatorClick}>-</button>
            </div>

            <div>
                <button className="calc-btn col-3" id="four" onClick={this.handleButtonClick}>4</button>
                <button className="calc-btn col-3" id="five" onClick={this.handleButtonClick}>5</button>
                <button className="calc-btn col-3" id="six" onClick={this.handleButtonClick}>6</button>
                <button className="calc-btn col-3" id="add" onClick={this.handleOperatorClick}>+</button>
            </div>
           
            <div>
                <button className="calc-btn col-3" id="one" onClick={this.handleButtonClick}>1</button>
                <button className="calc-btn col-3" id="two" onClick={this.handleButtonClick}>2</button>
                <button className="calc-btn col-3" id="three" onClick={this.handleButtonClick}>3</button>
                <button className="calc-btn col-3" id="decimal" onClick={this.handleDecimalClick}>.</button>
            </div>

            <div>
                <button className="calc-btn col-6" id="zero" onClick={this.handleZeroClick}>0</button>
                <button className="calc-btn col-6" id="equals" onClick={this.handleEqualsClick}>=</button>
            </div>
        </div>);
    }
}


ReactDOM.render(<App />, document.getElementById('root'));