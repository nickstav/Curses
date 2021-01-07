import curses
import json
import sys
import math
from argparse import Namespace
from curses.textpad import Textbox, rectangle

canvasData = {"width":80,"height":22,"objects":[{"objectNumber":0,"objectType":"rectangle","objectInfo":{"start":[3,1],"end":[36,20]}},{"objectNumber":1,"objectType":"progress","objectInfo":{"position":[7,3],"bars":4,"percentage":50}},{"objectNumber":2,"objectType":"progress","objectInfo":{"position":[7,5],"bars":4,"percentage":50}},{"objectNumber":3,"objectType":"progress","objectInfo":{"position":[7,7],"bars":4,"percentage":50}},{"objectNumber":4,"objectType":"progress","objectInfo":{"position":[7,9],"bars":4,"percentage":50}},{"objectNumber":5,"objectType":"line","objectInfo":{"start":[6,3],"end":[21,3]}},{"objectNumber":6,"objectType":"text","objectInfo":{"message":"indenteeeeeeeeeeeeeeeeeeeeeeeeeeeed","position":[71,10],"newLine":"indented"}},{"objectNumber":7,"objectType":"irregularLine","objectInfo":[{"x":6,"y":15},{"x":7,"y":15},{"x":8,"y":15},{"x":9,"y":16},{"x":10,"y":16},{"x":11,"y":16},{"x":12,"y":16},{"x":13,"y":16},{"x":14,"y":17},{"x":15,"y":17},{"x":16,"y":17},{"x":17,"y":17},{"x":18,"y":17},{"x":19,"y":18},{"x":20,"y":18},{"x":21,"y":18},{"x":22,"y":18},{"x":23,"y":18},{"x":24,"y":19},{"x":25,"y":19},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":20},{"x":30,"y":20},{"x":31,"y":20}]},{"objectNumber":8,"objectType":"irregularLine","objectInfo":[{"x":39,"y":15},{"x":40,"y":15},{"x":41,"y":15},{"x":42,"y":15},{"x":43,"y":15},{"x":44,"y":16},{"x":45,"y":16},{"x":46,"y":16},{"x":47,"y":16},{"x":48,"y":16},{"x":49,"y":16},{"x":50,"y":16},{"x":51,"y":16},{"x":52,"y":16},{"x":53,"y":16},{"x":54,"y":17},{"x":55,"y":17},{"x":56,"y":17},{"x":57,"y":17},{"x":58,"y":17},{"x":59,"y":17},{"x":60,"y":17},{"x":61,"y":17},{"x":62,"y":17},{"x":63,"y":18},{"x":64,"y":18},{"x":65,"y":18},{"x":66,"y":18},{"x":67,"y":18},{"x":68,"y":18},{"x":69,"y":18},{"x":70,"y":18},{"x":71,"y":18},{"x":72,"y":18},{"x":73,"y":19},{"x":74,"y":19},{"x":75,"y":19},{"x":76,"y":19},{"x":77,"y":19}]},{"objectNumber":9,"objectType":"text","objectInfo":{"message":"this should overwrite other stuff and start on the left hand siiiiiiiiiiiide","position":[63,18],"newLine":"toLeft"}}]}
    
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
        stdscr.addch(coord['y'] - 1, coord['x'], 'x')

def drawRectangle(rectData, window):
    rectangle(window, rectData.start[1], rectData.start[0], rectData.end[1], rectData.end[0])

def drawProgressBar(progressData, window, barColour, emptyColour):
    numberOfFilledBars = int(progressData.bars * (progressData.percentage / 100))
    numberOfEmptyBars = int(progressData.bars - numberOfFilledBars)
    filledBars = ' ' * numberOfFilledBars
    emptyBars =  ' ' * numberOfEmptyBars
    percString = ' ' + str(progressData.percentage) + '%'

    window.addstr(progressData.position[1], progressData.position[0], filledBars, barColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars, emptyBars, emptyColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars + numberOfEmptyBars, percString)

def addText(textData, window):
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

def draw_canvas(stdscr):
    k = 0

    # Clear and refresh the screen for a blank canvas
    stdscr.clear()
    stdscr.refresh()

    # define colours to fill the progress bar
    curses.start_color()
    curses.init_color(curses.COLOR_CYAN, 400, 400, 400)
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)
    curses.init_pair(2, curses.COLOR_BLACK, curses.COLOR_CYAN)

    # define the userWindow (format: lines, columns, start line, start column)
    userWindow = curses.newwin(canvasData['height'], canvasData['width'], 0, 0)

    # Loop where k is the last character key pressed
    while (k != ord('q')):

        # Get screen height & width
        height, width = stdscr.getmaxyx()

        # Define status bar
        statusBarString = "|Press 'q' to exit |"

        # Render status bar
        stdscr.addstr(height-1, int(width/2) - int(len(statusBarString)/2), statusBarString)

        # add each object from canvasData in order to the curses window
        for canvasObject in canvasData["objects"]:
            if canvasObject["objectType"] == 'text':
                textInfo = Namespace(**canvasObject['objectInfo'])
                addText(textInfo, userWindow)
            elif canvasObject["objectType"] == 'line':
                lineInfo = Namespace(**canvasObject['objectInfo'])
                drawLine(lineInfo, userWindow)
            elif canvasObject["objectType"] == 'irregularLine':
                markedSquares = canvasObject['objectInfo']
                drawIrregularLine(markedSquares, userWindow)
            elif canvasObject["objectType"] == 'rectangle':
                rectInfo = Namespace(**canvasObject['objectInfo'])
                drawRectangle(rectInfo, userWindow)
            elif canvasObject["objectType"] == 'progress':
                progressInfo = Namespace(**canvasObject['objectInfo'])
                drawProgressBar(progressInfo, userWindow, curses.color_pair(1), curses.color_pair(2))

        # Refresh the screen & user window
        userWindow.refresh()
        stdscr.refresh()

        # Wait for next input
        k = stdscr.getch()

def main():
    curses.wrapper(draw_canvas)

if __name__ == "__main__":
    main()