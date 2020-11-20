let test = {
    width: 50,
    height: 20,
    text: [
        {
            message: "Och helloooo!",
            position: [4, 10]
        },
        {
            message: "Foibles!",
            position: [18, 2]
        }
    ],
    line: [
        {
            start: [35,10],
            end: [35, 20]
        },
        {
            start: [2,2],
            end: [20, 2]
        }
    ],
    rectangle: [
        {
            start: [20,10],
            end: [30, 16]
        },
        {
            start: [1, 1],
            end: [49, 18]
        }
    ],
    progress: [
        {
            position: [37,18],
            bars: 6,
            percentage: 50
        },
        {
            position: [3,13],
            bars: 4,
            percentage: 50
        }
    ]
}

module.exports = { test }