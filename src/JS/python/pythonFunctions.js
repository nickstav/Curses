// object specific functions for the Python script to be generated

const lineFunction = `
def drawLine(lineParams, window, lineEndChars):
    # if line is vertical
    if lineParams.start[0] == lineParams.end[0]:
        window.addch(lineParams.start[1], lineParams.start[0], lineEndChars[3])
        window.addch(lineParams.end[1], lineParams.start[0], lineEndChars[2])
        for x in range(lineParams.start[1] + 1, lineParams.end[1]):
            window.addch(x, lineParams.start[0], curses.ACS_VLINE) # coords are passed to curses as (y, x)
    # if line is horizontal
    elif lineParams.start[1] == lineParams.start[1]:
        window.addch(lineParams.start[1], lineParams.start[0], lineEndChars[1])
        window.addch(lineParams.start[1], lineParams.end[0], lineEndChars[0])
        for x in range(lineParams.start[0] + 1, lineParams.end[0]):
            window.addch(lineParams.start[1], x, curses.ACS_HLINE)
def drawIrregularLine(filledSquares, window):
    for coord in filledSquares:
        window.addch(coord['y'] - 1, coord['x'], 'x')
`;

const rectFunction = `
def drawRectangle(rectData, window, lineEndChars):
    if rectData.start[1] == rectData.end[1]: # if rect function was used to draw a horizontal line
        window.addch(rectData.start[1], rectData.start[0], '╶')
        window.addch(rectData.start[1], rectData.end[0], '╴')
        for x in range(rectData.start[0] + 1, rectData.end[0]):
            window.addch( rectData.start[1], x, curses.ACS_HLINE)
    elif rectData.start[0] == rectData.end[0]: # if rect function was used to draw a vertical line
        window.addch(rectData.start[1], rectData.start[0], '╷')
        window.addch(rectData.end[1], rectData.start[0], '╵')
        for x in range(rectData.start[1] + 1, rectData.end[1]):
            window.addch(x, rectData.start[0], curses.ACS_VLINE)
    elif abs(rectData.start[1] - rectData.end[1]) == 1: # if rect has height = 1 (no verticals to add)
        window.addch(rectData.start[1], rectData.start[0], curses.ACS_ULCORNER)
        window.addch(rectData.end[1], rectData.start[0], curses.ACS_LLCORNER)
        window.addch(rectData.start[1], rectData.end[0], curses.ACS_URCORNER)
        window.addch(rectData.end[1], rectData.end[0], curses.ACS_LRCORNER)
        for x in range(rectData.start[0] + 1, rectData.end[0]):
            window.addch( rectData.start[1], x, curses.ACS_HLINE)
            window.addch( rectData.end[1], x, curses.ACS_HLINE)
    elif abs(rectData.start[0] - rectData.end[0]) == 1: # if rect has width = 1 (no horiz to add)
        window.addch(rectData.start[1], rectData.start[0], curses.ACS_ULCORNER)
        window.addch(rectData.end[1], rectData.start[0], curses.ACS_LLCORNER)
        window.addch(rectData.start[1], rectData.end[0], curses.ACS_URCORNER)
        window.addch(rectData.end[1], rectData.end[0], curses.ACS_LRCORNER)
        for x in range(rectData.start[1] + 1, rectData.end[1]):
            window.addch(x, rectData.start[0], curses.ACS_VLINE)
            window.addch(x, rectData.end[0], curses.ACS_VLINE)
    else:
        rectangle(window, rectData.start[1], rectData.start[0], rectData.end[1], rectData.end[0])
`;

const progressFunction = `
def drawProgressBar(progressData, window, barColour, emptyColour):
    numberOfFilledBars = int(progressData.bars * (progressData.percentage / 100))
    numberOfEmptyBars = int(progressData.bars - numberOfFilledBars)
    filledBars = ' ' * numberOfFilledBars
    emptyBars =  ' ' * numberOfEmptyBars
    percString = ' ' + str(progressData.percentage) + '%'
    showPercentage = (progressData.showPercentage == 'true')

    window.addstr(progressData.position[1], progressData.position[0], filledBars, barColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars, emptyBars, emptyColour)
    if showPercentage:
        window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars + numberOfEmptyBars, percString)
`;

const textFunction = `
def addText(textData, canvasData, window):
    if textData.newLine == 'toLeft':
        window.addstr(textData.position[1], textData.position[0], textData.message)
    else:
        for i in range(0, len(textData.message)):
            char = textData.message[i]
            indentedWidth = canvasData['width'] - textData.position[0]
            # move down to the next row for every completed indentedWidth 
            yCorrection = math.floor(i / indentedWidth)
            # start a new line indented below the start of the text
            xPosition =  (i + textData.position[0]) - (indentedWidth * yCorrection)

            window.addch(textData.position[1] + yCorrection, xPosition, char)
`;

export const objectFunctions = lineFunction + rectFunction + progressFunction + textFunction;