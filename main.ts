function servo_init () {
    def_pos = 20
    servo1_pos = def_pos
    servo2_pos = def_pos
    pins.servoWritePin(AnalogPin.P0, servo1_pos)
    pins.servoWritePin(AnalogPin.P1, servo2_pos)
    s1_min = 20
    s2_min = 20
    s1_max = 120
    s2_max = 120
    updt_s1 = 0
    updt_s2 = 0
    pins.servoSetPulse(AnalogPin.P0, 1500)
    pins.servoSetPulse(AnalogPin.P1, 1500)
}
function s2_set (num: number) {
    if (num >= s2_min && num <= s2_max) {
        pins.servoWritePin(AnalogPin.P1, num)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
}
function set_servo (num: number) {
    if (num >= s1_min && num <= s1_max) {
        pins.servoWritePin(AnalogPin.P0, num)
    } else {
        basic.showIcon(IconNames.SmallDiamond)
    }
}
let updt_s2 = 0
let updt_s1 = 0
let s2_max = 0
let s1_max = 0
let s2_min = 0
let s1_min = 0
let servo2_pos = 0
let servo1_pos = 0
let def_pos = 0
let result = " "
basic.showIcon(IconNames.Heart)
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
servo_init()
basic.forever(function () {
    result = serial.readString()
    if (result == "up") {
        basic.showNumber(0)
        servo1_pos += 10
        updt_s1 = 1
    } else if (result == "down") {
        basic.showNumber(1)
        servo1_pos += -10
        updt_s1 = 1
    } else if (result == "open") {
        basic.showNumber(2)
        servo2_pos += 10
        updt_s2 = 1
    } else if (result == "close") {
        basic.showNumber(3)
        servo2_pos += -10
        updt_s2 = 1
    } else if (result == "nothing") {
        basic.showNumber(4)
        updt_s1 = 0
    } else if (result == "reset") {
        basic.showNumber(5)
        servo1_pos = def_pos
        servo2_pos = def_pos
        updt_s1 = 1
        updt_s2 = 1
    }
    if (updt_s1 == 1) {
        set_servo(servo1_pos)
        updt_s1 = 0
    }
    if (updt_s2 == 1) {
        s2_set(servo2_pos)
        updt_s2 = 0
    }
    basic.clearScreen()
})
