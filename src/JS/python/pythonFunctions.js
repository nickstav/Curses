const lineFunction = `
def drawLine(lineParams, stdscr):
    # if line is vertical
    if lineParams.start[0] == lineParams.end[0]:
        for x in range(lineParams.start[1], lineParams.end[1]):
            stdscr.addch(x, lineParams.start[0], curses.ACS_VLINE) # coords are passed to curses as (y, x)
    # if line is horizontal
    elif lineParams.start[1] == lineParams.start[1]:
        for x in range(lineParams.start[0], lineParams.end[0]):
            stdscr.addch( lineParams.start[1], x, curses.ACS_HLINE)

def drawIrregularLine(filledSquares, stdscr):
    for coord in filledSquares:
        stdscr.addch(coord['y'], coord['x'], 'x')
`;

const rectFunction = `
def drawRectangle(rectData, window):
    rectangle(window, rectData.start[1], rectData.start[0], rectData.end[1], rectData.end[0])
`;

const progressFunction = `
def drawProgressBar(progressData, window, barColour, emptyColour):
    numberOfFilledBars = int(progressData.bars * (progressData.percentage / 100))
    numberOfEmptyBars = int(progressData.bars - numberOfFilledBars)
    filledBars = ' ' * numberOfFilledBars
    emptyBars =  ' ' * numberOfEmptyBars
    percString = ' ' + str(progressData.percentage) + '%'

    window.addstr(progressData.position[1], progressData.position[0], filledBars, barColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars, emptyBars, emptyColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars + numberOfEmptyBars, percString)
`;

const textFunction = `
def addText(textData, window):
    window.addstr(textData.position[1], textData.position[0], textData.message)
`;

export const objectFunctions = lineFunction + rectFunction + progressFunction + textFunction;