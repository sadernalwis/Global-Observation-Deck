import { Credentials } from '../console/credentials.js';


export let Stack = {
    stack: [],
    increase_height: function() {
        this.stack.push(0);
        return this.stack.length;
    },
    decrease_height: function() {
        return this.stack.pop();
    },
    increment_last: function() {
        (this.stack.length) ? this.stack[this.stack.length - 1]++: null;
        return this.stack.length;
    },
    decrement_last: function() {
        (this.stack.length) ? (this.stack[this.stack.length - 1]) ? this.stack[this.stack.length - 1]--: null: null;
    },
    increment_level: function(level) {
        (this.stack.length > level) ? this.stack[level]++: null;
        return this.stack.length;
    },
    decrement_level: function(level) {
        (this.stack.length > level) ? (this.stack[level]) ? this.stack[level]--: null: null;
    },
    get_sub_stack_to: function(level) {

    },
    get_sub_stack_from: function(level) {

    },
    get_sub_stack: function(from_level, to_level) {

    }
};