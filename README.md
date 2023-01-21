## Author information
Marek Dorko - student of Informatics at UPJS

## Description of a solution
When a request (to certain floor) is made, this request is stored in array which is in descending order. Elevator goes in one direction first and tries to satisfy requests in that direction. Then elevator changes direction and tries to satisfy these requests.
    
Request is represented as an object with requested floor, number of people and type (outer/inner) properties.

Elevator has its capacity implemented which means that when there is e.g. a request to 5th floor and 3 persons and the capacity of the elevator is 6 and the current capacity of the elevator is already 4, this request cannot be successfully satisfied. 

## Used technologies
Javascript, HTML

## Description of an elevator algorithm
see section 'Description of a solution'

## Steps for compilation
1. open index.html file in a browser
2. send a request in the form 'floor numberOfPeople type', e.g. '5 3 outer' or '5 3 inner' 
    


