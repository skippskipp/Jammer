    //use a loop to go through all elements in the points array, so the argument has to be the result of pointsArray
function forEach(element, callback) {
    //execute a callback for each element
    for (var i = 0; i < element.length; i++) {
        callback(i);
    }
};