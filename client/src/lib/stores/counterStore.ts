import {makeAutoObservable} from 'mobx';

export default class CounterStore {
    title = "Counter store";
    count = 3;
    events: string[] = [
        `Initial count is ${this.count}`
    ]
    // using the this keyword specifies that we're accessing class properties
    constructor() {
        makeAutoObservable(this)
    }

    // Using an arrow function binds the function to the class, which is not automatic
    // we rarely use this, but mobx is still using classes for its functionality
    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} - count is now ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} - count is now ${this.count}`);
    }

    get eventCount() {
        return this.events.length
    }
}