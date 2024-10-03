bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    reset()
    basic.showIcon(IconNames.No)
})
function stopMoteurDirection () {
    servos.P0.stop()
    servos.P1.stop()
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.SemiColon), function () {
    traitemementMessage2()
})
function commandeMoteurGauche () {
    servos.P0.run(puissanceRotation)
}
function traitemementMessage2 () {
    message = bluetooth.uartReadUntil(serial.delimiters(Delimiters.SemiColon))
    if (message == "down_haut") {
        commandeMoteurAvancer()
    } else if (message == "up_haut") {
        stopMoteur()
    } else if (message == "down_bas") {
        commandeMoteurReculer()
    } else if (message == "up_bas") {
        stopMoteur()
    } else if (message == "down_droite") {
        commandeMoteurDroite()
    } else if (message == "up_droite") {
        stopMoteurDirection()
    } else if (message == "down_gauche") {
        commandeMoteurGauche()
    } else if (message == "up_gauche") {
        stopMoteurDirection()
    }
}
function commandeMoteurDroite () {
    servos.P0.run(0 - puissanceRotation)
}
function stopMoteur () {
    servos.P1.stop()
    servos.P2.stop()
}
function commandeMoteurReculer () {
    servos.P2.run(0 - puissanceMoteur)
    servos.P1.run(puissanceMoteur)
}
function reset () {
    puissanceMoteur = 100
    puissanceRotation = 50
}
function commandeMoteurAvancer () {
    servos.P2.run(puissanceMoteur)
    servos.P1.run(0 - puissanceMoteur)
}
let puissanceMoteur = 0
let message = ""
let puissanceRotation = 0
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
reset()
