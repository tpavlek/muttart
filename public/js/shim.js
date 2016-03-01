/*
 A shim for non ES5 supporting browsers.
 Adds function bind to Function prototype, so that you can do partial application.
 Works even with the nasty thing, where the first word is the opposite of extranet, the second one is the profession of Columbus, and the version number is 9, flipped 180 degrees.
 */

Function.prototype.bind = Function.prototype.bind || function(to){
        // Make an array of our arguments, starting from second argument
        var	partial	= Array.prototype.splice.call(arguments, 1),
        // We'll need the original function.
            fn	= this;
        var bound = function (){
            // Join the already applied arguments to the now called ones (after converting to an array again).
            var args = partial.concat(Array.prototype.splice.call(arguments, 0));
            // If not being called as a constructor
            if (!(this instanceof bound)){
                // return the result of the function called bound to target and partially applied.
                return fn.apply(to, args);
            }
            // If being called as a constructor, apply the function bound to self.
            fn.apply(this, args);
        }
        // Attach the prototype of the function to our newly created function.
        bound.prototype = fn.prototype;
        return bound;
    };

// Or minified... (285 bytes)
Function.prototype.bind=Function.prototype.bind||function(d){var a=Array.prototype.splice.call(arguments,1),c=this;var b=function(){var e=a.concat(Array.prototype.splice.call(arguments,0));if(!(this instanceof b)){return c.apply(d,e)}c.apply(this,e)};b.prototype=c.prototype;return b};

// To try it out, let's make a function called x that logs it's arguments and it's "this" context.

function x(){
    console.log(arguments, this);
}
// Then create a bound version of it, called bound, bound to 5 with partially applied arguments 1, 2, 3

var bound = x.bind(5,1,2,3);

// Call it
bound(4); //log: [1, 2, 3, 4] 5

// Now let's try and make a new instance of it
var newBound = new bound(4); //log: [1, 2, 3, 4] Function.bind.bound

// Note that in the native version that would have been [1, 2, 3, 4] x
// But that's not a really useful feature compared to the complexity it requires to be implemented.

// Now let's see if our instanceof operator still works

console.log(newBound instanceof bound); // log: true
console.log(newBound instanceof x); // log: true

// So, yay, it works, have fun!
