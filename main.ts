basic.forever(function () {
    serial.writeLine("" + (custom.getButtonData(MyEnum1.ButtonX)))
    basic.pause(200)
})
