class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(meters: number = 0) {
        alert(this.name + " moved " + meters + "m.");
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(meters = 5) {
        alert("Slithering...");
        super.move(meters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(meters = 45) {
        alert("Galloping...");
        super.move(meters);
    }
}

class SecondHorse extends Horse {
    constructor(name: string) {
        super(name);
    }

    moveBy(meters = 45) {
        super.move(meters);
    }
}

var sam = new Snake("Sammy the Python");
var tom: Animal = new Horse("Tommy the Palomino");
var tomJr = new SecondHorse("Tommny Jr the Brown");

sam.move();
tom.move(34);
tomJr.moveBy(35);
