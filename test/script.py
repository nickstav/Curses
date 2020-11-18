import curses
import sys, os
from argparse import Namespace

from userData import getUserData
from objects.text import addText
from objects.lines import drawLine
from objects.rectangle import drawRectangle
from objects.progress import drawProgressBar

# ----------------------------------------------------------------------------------------------- #

# Get the required window size and objects
params = getUserData()
textData = Namespace(**params['text'])
lineData = Namespace(**params['line'])
rectData = Namespace(**params['rectangle'])
progressData = Namespace(**params['progress'])

# ----------------------------------------------------------------------------------------------- #

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
    userWindow = curses.newwin(params['height'], params['width'], 0, 0)

    # Loop where k is the last character key pressed
    while (k != ord('q')):

        # Get screen height & width
        height, width = stdscr.getmaxyx()

        # Define status bar
        statusBarString = "|Press 'q' to exit |"

        # Render status bar
        stdscr.addstr(height-1, int(width/2) - int(len(statusBarString)/2), statusBarString)

        # Add text object(s)
        addText(textData, userWindow)

        # Add line object(s)
        drawLine(lineData, userWindow)

        # Add rectangle object(s)
        drawRectangle(rectData, userWindow)

        # Add progress bar object(s)
        drawProgressBar(progressData, userWindow, curses.color_pair(1), curses.color_pair(2))

        # Refresh the screen & user window
        userWindow.refresh()
        stdscr.refresh()

        # Wait for next input
        k = stdscr.getch()

def main():
    curses.wrapper(draw_canvas)

if __name__ == "__main__":
    main()
