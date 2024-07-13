
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
    basic.showString("last:" + groupStr + "and" + valueStr)
})
input.onButtonPressed(Button.AB, function () {
    shouldShowSerialMsgs = (shouldShowSerialMsgs + 1) % 2
    basic.showString("" + (shouldShowSerialMsgs))
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Happy)
})
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    groupStr = serial.readUntil(serial.delimiters(Delimiters.Colon))
    valueStr = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    led.toggle(0, 0)
    if (shouldShowSerialMsgs == 1) {
        basic.showString(valueStr)
        serial.writeLine("got " + groupStr + "and " + valueStr)
    }
    radio.setGroup(parseFloat(groupStr))
    radio.sendNumber(parseFloat(valueStr))
    led.plotBarGraph(
        parseFloat(valueStr),
        255
    )
})
let shouldShowSerialMsgs = 0
let valueStr = ""
let groupStr = ""
basic.showIcon(IconNames.House)

