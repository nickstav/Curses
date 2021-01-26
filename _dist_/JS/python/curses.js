// elements of the Python script to be generated

const imports = 
`import curses
import json
import sys
import platform
import math
from argparse import Namespace
from curses.textpad import Textbox, rectangle

`;

const userSystemCheck = `
# get current platform, and define line end points array. These will change depending on Windows/Mac
userSystem = platform.system()
lineEndChars = []
`

const cursesScript = `
def draw_canvas(stdscr):
    k = 0

    # find if the user is using Windows or Mac/other and define the characters to draw end points of a line
    # Note: This is because the end points that are used for Windows do not align with the line on a Mac system
    global lineEndChars
    if userSystem == 'Windows':
        lineEndChars = ['╴', '╶', '╵', '╷']
    else:
        lineEndChars = [curses.ACS_HLINE, curses.ACS_HLINE, curses.ACS_VLINE, curses.ACS_VLINE]

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
                drawLine(lineInfo, userWindow, lineEndChars)
            elif canvasObject["objectType"] == 'irregularLine':
                markedSquares = canvasObject['objectInfo']
                drawIrregularLine(markedSquares, userWindow)
            elif canvasObject["objectType"] == 'rectangle':
                rectInfo = Namespace(**canvasObject['objectInfo'])
                drawRectangle(rectInfo, userWindow, lineEndChars)
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
`;

export { imports, userSystemCheck, cursesScript }