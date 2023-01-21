export class Request {
    floor = 0
    numberOfPeople = 0
    type = ""

    constructor(floor, numberOfPeople, type) {
        this.floor = floor
        this.numberOfPeople = numberOfPeople
        this.type = type
    }
}