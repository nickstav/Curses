from curses.textpad import Textbox, rectangle

def drawRectangle(rectData, window):
    rectangle(window, rectData.start[1], rectData.start[0], rectData.end[1], rectData.end[0])