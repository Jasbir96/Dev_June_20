# Promise Basics
* Promise are future value
* Promise => inital value => pending
* Promise state  => final value => settled
    Resolve=> when resolved is called 
    Reject=> when reject is called
* then /catch() are used to attach cb to the promise and also return a promise that will  be in sync with the cb inside that promise
* callbacks are async and run only when promise is settled
* promise=> resolve => scb will run
            reject=> fcb will run