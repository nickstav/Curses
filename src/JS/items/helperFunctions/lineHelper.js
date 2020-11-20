function getSquaresForShallowLine(xInit, yInit, xFinal, deltaX, deltaY, keyCharacter) {
    // start at inital point on the line
    let x = xInit;
    let y = yInit;

    // define variable in which to store square location
    let squaresToFill = {
        add: [],
        clear: []
    }

    // store information of square to be cleared
    squaresToFill.clear.push({x: x, y: y + 1});
    // store location of square to be filled and its associated character
    squaresToFill.add.push({x, y, char:keyCharacter});

    // as per Bresenham's Algorithm
    let diffBetweenPoints = 2 * Math.abs(deltaY) - Math.abs(deltaX);
      
    for (let i = 0; x < xFinal; i++) {
        // iterate for each x integer value from xInit to xFinal
        x = x + 1;
   
        // if gradient is negative, remain on current y value & update difference
        if (diffBetweenPoints < 0) {
            diffBetweenPoints = diffBetweenPoints + 2 * Math.abs(deltaY);
        //if gradient is positive, move up/down to the next point & update difference
        } else {

            if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                // line is in octant bounded by the line y = x
                y = y + 1;
            } else {
                // line is in octant bounded by the line y = -x
                y = y - 1;
            };

        diffBetweenPoints = diffBetweenPoints + 2 * (Math.abs(deltaY) - Math.abs(deltaX));
        };

        // store information of square to be cleared
        squaresToFill.clear.push({x: x, y: y + 1});
        // store location of square to be filled and its associated character
        squaresToFill.add.push({x, y, char:keyCharacter});
    };

    return squaresToFill;
}

function getSquaresForSteepLine(xInit, yInit, yFinal, deltaX, deltaY, keyCharacter) {
    // start at inital point on the line
    let x = xInit;
    let y = yInit;

    // define variable in which to store square location
    let squaresToFill = {
        add: [],
        clear: []
    }
   
    // store information of square to be cleared
    squaresToFill.clear.push({x: x, y: y + 1});
    // store location of square to be filled and its associated character
    squaresToFill.add.push({x, y, char:keyCharacter});

    // as per Bresenham's Algorithm
    let diffBetweenPoints = 2 * Math.abs(deltaX) - Math.abs(deltaY);

    for (let i = 0; y < yFinal; i++) {
        // iterate for each y integer value from yInit to yFinal
        y = y + 1;  

        // if gradient is negative, remain on current x value & update difference
        if (diffBetweenPoints <= 0) {
             diffBetweenPoints = diffBetweenPoints + 2 * Math.abs(deltaX);
        //if gradient is positive, move across/back to the next point & update difference
        } else {
            if ((deltaX < 0 && deltaY<0) || (deltaX > 0 && deltaY > 0)) {
                // line is in octant bounded by the line y = x
                x = x + 1;
            } else {
                // line is in octant bounded by the line y = -x
                x = x - 1;
            };
            diffBetweenPoints = diffBetweenPoints + 2 * (Math.abs(deltaX) - Math.abs(deltaY));
        };

        // store information of square to be cleared
        squaresToFill.clear.push({x: x, y: y + 1});
        // store location of square to be filled and its associated character
        squaresToFill.add.push({x, y, char:keyCharacter});
    };

    return squaresToFill;
}

export { getSquaresForShallowLine, getSquaresForSteepLine }