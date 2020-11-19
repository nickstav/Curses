import curses

def drawLine(lineParams, stdscr):
    # if line is vertical
    if lineParams.start[0] == lineParams.end[0]:

        for x in range(lineParams.start[1], lineParams.end[1]):
            stdscr.addch(x, lineParams.start[0], curses.ACS_VLINE) # coords are passed to curses as (y, x)

    # if line is horizontal
    elif lineParams.start[1] == lineParams.start[1]:

        for x in range(lineParams.start[0], lineParams.end[0]):
            stdscr.addch( lineParams.start[1], x, curses.ACS_HLINE)
