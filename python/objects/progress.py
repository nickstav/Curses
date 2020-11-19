def drawProgressBar(progressData, window, barColour, emptyColour):
    numberOfFilledBars = int(progressData.bars * (progressData.percentage / 100))
    numberOfEmptyBars = int(progressData.bars - numberOfFilledBars)
    filledBars = ' ' * numberOfFilledBars
    emptyBars =  ' ' * numberOfEmptyBars
    percString = ' ' + str(progressData.percentage) + '%'

    window.addstr(progressData.position[1], progressData.position[0], filledBars, barColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars, emptyBars, emptyColour)
    window.addstr(progressData.position[1], progressData.position[0] + numberOfFilledBars + numberOfEmptyBars, percString)
