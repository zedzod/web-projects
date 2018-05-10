var EventEmitter = require('events');
const CONFIG = require("./config").events;
const MAX_VOTES = 10;

global.LOG = ""; 

class Election extends EventEmitter {

    constructor(subject) {
        super();
        this.votes = 0;
        this.topic = 0;
        this.subject = subject;
    };

    
    increment() {
        if (this.subject.votes < MAX_VOTES) {
            this.subject.votes++;
            console.log(`${this.subject.topic} Incrementing sucsess`);
            AddToBody(`${this.subject.topic} Incrementing sucsess`);
            this.emit(CONFIG.INC, this.subject);
        } else {
            console.log(`${this.subject.topic} cannot Incremented ::: reached the maximum votes`);
            AddToBody(`${this.subject.topic} cannot Incremented ::: reached the maximum votes`);
            this.emit(CONFIG.MAX_votes, this.subject);
        }
    };

    getAll() {
        console.log(`${this.subject.topic}, number of Votes: ${this.subject.votes}`);
        AddToBody(`${this.subject.topic}, number of Votes: ${this.subject.votes}`);
    };

    reset() {
        this.subject.votes = 0;
        console.log(`${this.subject.topic} Reset votes`);
        AddToBody(`${this.subject.topic} Reset votes`);
        this.emit(CONFIG.RESET, this.subject);
    };

    getSubject() {
        return this.subject;
    }
    getTopic() {
        return this.topic;
    }
    getVotes() {
        return this.votes;
    }

}
var AddToBody = (string) => {
    LOG += `${string}  <br>`;
};

module.exports = (subject) => {

    var topic = new Election(subject);

    topic.increment();
    topic.getAll();
    topic.reset();
    topic.getTopic();
    topic.getVotes();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.increment();
    topic.getAll();
    topic.increment();
    
    topic.on(CONFIG.INC, (subject) => {
        console.log(`INC::: ${subject.topic}, Votes: ${subject.votes}`);
    });
    topic.on(CONFIG.RESET, (subject) => {
        console.log(`RESET::: ${subject.topic}, Votes: ${subject.votes}`);
    });
};