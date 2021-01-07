import curses
import json
import sys
import math
from argparse import Namespace
from curses.textpad import Textbox, rectangle

canvasData = {"width":80,"height":22,"text":[{"message":"to the leeeeeeeeeeeeeeeeeeeeeft","position":[69,2],"newLine":"toLeft"},{"message":"indenteeeeeeeeed","position":[73,9],"newLine":"indented"}],"line":[],"irregularLines":[],"rectangle":[],"progress":[]}
    
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



# Get the required window size and objects
textData = canvasData['text']
lineData = canvasData['line']
irregularLines = canvasData['irregularLines']
rectData = canvasData['rectangle']
progressData = canvasData['progress']

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

        # Add text object(s)
        for textObject in textData:
            textInfo = Namespace(**textObject)
            addText(textInfo, canvasData, userWindow)

        # Add line object(s)
        for lineObject in lineData:
            lineInfo = Namespace(**lineObject)
            drawLine(lineInfo, userWindow)

        for markedSquares in irregularLines:
            drawIrregularLine(markedSquares, userWindow)

        # Add rectangle object(s)
        for rectObject in rectData:
            rectInfo = Namespace(**rectObject)
            drawRectangle(rectInfo, userWindow)

        # Add progress bar object(s)
        for progressObject in progressData:
            progressInfo = Namespace(**progressObject)
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