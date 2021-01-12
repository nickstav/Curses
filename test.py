import curses
import json
import sys
import math
from argparse import Namespace
from curses.textpad import Textbox, rectangle

canvasData = {"width":80,"height":22,"objects":[{"objectNumber":0,"objectType":"line","objectInfo":{"start":[6,0],"end":[24,0]}},{"objectNumber":1,"objectType":"rectangle","objectInfo":{"start":[28,0],"end":[42,21]}},{"objectNumber":2,"objectType":"text","objectInfo":{"message":"Hello","position":[47,0],"newLine":"indented"}},{"objectNumber":3,"objectType":"text","objectInfo":{"message":"Hello","position":[6,2],"newLine":"indented"}},{"objectNumber":4,"objectType":"progress","objectInfo":{"position":[56,0],"bars":4,"percentage":50,"showPercentage":"true"}},{"objectNumber":5,"objectType":"progress","objectInfo":{"position":[6,4],"bars":4,"percentage":50,"showPercentage":"true"}},{"objectNumber":6,"objectType":"progress","objectInfo":{"position":[14,21],"bars":4,"percentage":50,"showPercentage":"true"}},{"objectNumber":7,"objectType":"progress","objectInfo":{"position":[48,21],"bars":4,"percentage":50,"showPercentage":"true"}},{"objectNumber":8,"objectType":"line","objectInfo":{"start":[70,0],"end":[70,19]}},{"objectNumber":9,"objectType":"line","objectInfo":{"start":[64,21],"end":[75,21]}}]}
    
# EDIT PERCENTAGE VALUE OF PROGRESS BARS HERE... 
canvasData["objects"][4]["objectInfo"]["percentage"] = 75
canvasData["objects"][5]["objectInfo"]["percentage"] = 75
canvasData["objects"][6]["objectInfo"]["percentage"] = 25
# canvasData["objects"][7]["objectInfo"]["percentage"] = ____ 

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
    showPercentage = (progressData.showPercentage == 'true')

    window.addstr(progressData.position[1], progressData.position[0], filledBars, barColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars, emptyBars, emptyColour)
    if showPercentage:
        window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars + numberOfEmptyBars, percString)

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
                addText(textInfo, canvasData, userWindow)
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

