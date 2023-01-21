import {Request} from "./Request.js"

class Elevator {
    CAPACITY = 6
    
    requests = []
    elevPosition = 0
    visitedFloors = []
    currentCapacity = 0

    getDirection = () => {
        if (this.requests.length === 0)
            return "idle"

        let direction = this.requests[0].floor > this.elevPosition ? "up" : "down"    
        return direction
    }

    visitFloor = (request) => {
        this.requests.push(request)
        this.requests.sort((a, b) => a.floor < b.floor) ? 1 : (a.floor > b.floor) ? -1 : 0
        requestsP.textContent = JSON.stringify(this.requests)
        console.log(this.requests)

        let delay = setInterval(() => {
            
            if (this.getDirection() === "up") {
                this.elevPosition += 1
                elevPositionP.textContent = this.elevPosition     
                console.log(this.elevPosition)       
            } else if (this.getDirection() === "down") {
                this.elevPosition -= 1
                elevPositionP.textContent = this.elevPosition
            } else {
                this.elevPosition += 0
                elevPositionP.textContent = this.elevPosition
            }
            
            if (this.requests.length > 0 && 
                this.requests[this.requests.length - 1].floor === this.elevPosition) {
                
                if (this.requests[this.requests.length - 1].type === "outer" &&
                    this.requests[this.requests.length - 1].numberOfPeople + this.currentCapacity <= this.CAPACITY) {
                    
                        this.visitedFloors.push(this.requests[this.requests.length - 1].floor)
                        this.currentCapacity += this.requests[this.requests.length - 1].numberOfPeople
                        capacityP.textContent = this.currentCapacity
                        this.requests.pop()
                        requestsP.textContent = JSON.stringify(this.requests)
                    } else if (this.requests[this.requests.length - 1].type === "inner") {
                        this.visitedFloors.push(this.requests[this.requests.length - 1].floor)
                        this.currentCapacity -= this.requests[this.requests.length - 1].numberOfPeople
                        capacityP.textContent = this.currentCapacity
                        this.requests.pop()
                        requestsP.textContent = JSON.stringify(this.requests)
                    }
            }
            if (this.requests.length > 0 && this.requests[0].floor === this.elevPosition) {
                
                if (this.requests[0].type === "outer" &&
                    this.requests[0].numberOfPeople + this.currentCapacity <= this.CAPACITY) {
                        this.visitedFloors.push(this.requests[0].floor)
                        this.currentCapacity += this.requests[0].numberOfPeople
                        capacityP.textContent = this.currentCapacity
                        this.requests.shift()
                        requestsP.textContent = JSON.stringify(this.requests)
                    } else if (this.requests[0].type === "inner") {
                        this.visitedFloors.push(this.requests[0].floor)
                        this.currentCapacity -= this.requests[0].numberOfPeople
                        capacityP.textContent = this.currentCapacity
                        this.requests.shift()
                        requestsP.textContent = JSON.stringify(this.requests)
                    }
            }

            if (this.requests.length === 0){
                clearInterval(delay)
                visitedFloorsP.textContent = JSON.stringify(this.visitedFloors)
                // reset elevator to floor 0 when idle
                // setTimeout(() => {
                //     this.elevPosition = 0
                //     elevPositionP.textContent = this.elevPosition
                // }, 10000)
            }
        }, 3000)
    }
}

let elevator = new Elevator()

let floorInput = document.querySelector(".floor-input")
let elevPositionP = document.querySelector(".elev-position-p")
elevPositionP.textContent = elevator.elevPosition

let requestsP = document.querySelector(".requests-p")
requestsP.textContent = JSON.stringify(elevator.requests)

let visitedFloorsP = document.querySelector(".visited-floors-p")
let capacityP = document.querySelector(".capacity-p")
capacityP.textContent = 0

document.querySelector(".gotofloor-btn").addEventListener("click", () => {
    const inputs = floorInput.value.split(" ")
    
    const request = new Request(
        parseInt(inputs[0]),
        parseInt(inputs[1]),
        inputs[2]
    )

    elevator.visitFloor(request)
    floorInput.value = ""
})
