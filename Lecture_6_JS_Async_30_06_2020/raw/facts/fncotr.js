// fn constructor
function human(name, age) {
    this.name = name;
    this.age = age;
    this.showDetails = function () {
        console.log(this.name + " " + this.age);
        return "printed all details";
    }
}
let varun = new human("Varun", 20);
console.log(varun.showDetails());
// class => it's a syntax sugar that emulates classes of java
class human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    showDetails = function () {
        console.log(this.name + " " + this.age);
        return "printed all details";
    }
}


