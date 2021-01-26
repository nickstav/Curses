// the minimum size of the on-screen canvas
const minDimensions = {
    width: 5, 
    height: 5
};

// the maximum size of the on-screen canvas
const maxDimensions = {
    width: 100, 
    height: 100
};

// the dimension of the grid square (in pixels) 
// corresponding to a single character size in command prompt
const gridDimension = {
    x: 11, 
    y: 23
};

// since a given location on the canvas will refer to the bottom corner of a grid square, we need to
// ensure that all characters are bounded by the grid square (e.g. such as g, p j, etc)
// so define a constant to "lift" all characters above the bottom line of the grid square
const yAlignment = 5;

export { minDimensions, maxDimensions, gridDimension, yAlignment }