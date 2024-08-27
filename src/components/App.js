import React, { Component } from 'react';
import '../styles/App.css'
class App extends Component {
    constructor(){
        super();  // Call super() in constructor
        this.state={
            inputFirst: "",
            inputSecond: "",
            ans:""
        };

        // Bind the method
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(e, input){
        if (input === "first") {
            this.setState({
                inputFirst: e.target.value,  // Update inputFirst
            });
        } else if (input === "second") {
            this.setState({
                inputSecond: e.target.value,  // Update inputSecond
            });
        }
    }

    handleClick(e){
          const ans= this.getRelationshipStatus(this.state.inputFirst,this.state.inputSecond);
          this.setState({
            ...this.state,
            ans:ans
          })

    }

    getRelationshipStatus(name1, name2) {
        // Helper function to create a frequency map of characters in a string

        console.log({name1},{name2});
        function createFrequencyMap(str) {
            const freqMap = {};
            for (const char of str) {
                freqMap[char] = (freqMap[char] || 0) + 1;
            }
            return freqMap;
        }
    
        // Create frequency maps for both names
        const freqMap1 = createFrequencyMap(name1);
        const freqMap2 = createFrequencyMap(name2);
    
        // Remove common characters
        for (const char in freqMap1) {
            if (freqMap2[char]) {
                const minOccurrence = Math.min(freqMap1[char], freqMap2[char]);
                freqMap1[char] -= minOccurrence;
                freqMap2[char] -= minOccurrence;
            }
        }
    
        // Calculate the remaining length in both names
        const remainingLength1 = Object.values(freqMap1).reduce((sum, count) => sum + count, 0);
        const remainingLength2 = Object.values(freqMap2).reduce((sum, count) => sum + count, 0);
    
        // Calculate the total remaining length and its modulus by 6
        const totalLength = remainingLength1 + remainingLength2;
        const result = totalLength % 6;
    
        // Determine the relationship status based on the result
        const statusMap = {
            1: "Friends",
            2: "Love",
            3: "Affection",
            4: "Marriage",
            5: "Enemy",
            0: "Siblings"
        };
    
        return statusMap[result];
    }

    handleClear(e){
        this.setState({
            inputFirst:"",
            inputSecond:"",
            ans:""
        })
    }

    render() {
        return(
            <div id="main">
               <input data-testid="input1"
                   type="text" 
                   onChange={(e) => this.handleChange(e, "first")}// Correctly pass the event and input identifier
                   placeholder="Enter First Name" value={this.state.inputFirst}
               />
               <input data-testid="input2"
                   type="text" 
                   onChange={(e) => this.handleChange(e, "second")}  // Correctly pass the event and input identifier
                   placeholder="Enter Last Name" value={this.state.inputSecond}
               />
               <button data-testid="calculate_relationship" onClick={this.handleClick}>Calculate Future Relationship</button>
               <button data-testid="clear" onClick={this.handleClear}>Clear</button>
               <h3>{this.state.ans}</h3>
            </div>
        )
    }
}

export default App;
