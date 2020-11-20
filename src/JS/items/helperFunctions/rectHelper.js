// get the grid square coords for the rectangle verticals
function getVerticalCoords(coords) {
    let height = Math.abs(coords.bottomLeft.y - coords.topLeft.y);

    let squaresToFill = {
        leftSide: [],
        rightSide: []
    };

    for (let i = 1; i < height; i++) {
        let verticalCoordinate_A, verticalCoordinate_B; // A and B correspond to both sides
    
        if (coords.bottomLeft.y > coords.topLeft.y) {
            // draw vertical downwards
            verticalCoordinate_A = {x: coords.topLeft.x, y: coords.topLeft.y + i};
            verticalCoordinate_B = {x: coords.topRight.x, y: coords.topRight.y + i};
        } else {
            // draw vertical upwards
            verticalCoordinate_A = {x: coords.topLeft.x, y: coords.topLeft.y - i};
            verticalCoordinate_B = {x: coords.topRight.x, y: coords.topRight.y - i};
        }

        squaresToFill.leftSide.push(verticalCoordinate_A);
        squaresToFill.rightSide.push(verticalCoordinate_B);
    }

    return squaresToFill;
}


// get the grid square coords for the rectangle horizontals
function getHorizontalCoords(coords) {
    let width = Math.abs(coords.topRight.x - coords.topLeft.x);

    let squaresToFill = {
        top: [],
        bottom: []
    };

    for (let i = 1; i < width; i++) {
        let horizCoordinate_A, horizCoordinate_B; // A and B correspond to top and bottom

        if (coords.topLeft.x < coords.bottomRight.x) {
            //draw horizontal to the right
            horizCoordinate_A = {x: coords.topLeft.x + i, y: coords.topLeft.y};
            horizCoordinate_B = {x: coords.bottomLeft.x + i, y: coords.bottomLeft.y};
        } else {
            //draw horizontal to the left
            horizCoordinate_A = {x: coords.topLeft.x - i, y: coords.topLeft.y};
            horizCoordinate_B = {x: coords.bottomLeft.x - i, y: coords.bottomLeft.y};
        }

        squaresToFill.top.push(horizCoordinate_A);
        squaresToFill.bottom.push(horizCoordinate_B);
    }

    return squaresToFill;
}

export { getVerticalCoords, getHorizontalCoords }