def addText(textData, window):
    window.addstr(textData.position[1], textData.position[0], textData.message)