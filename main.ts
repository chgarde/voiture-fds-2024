function commandeMoteurRotation () {
    if (tournerHoraire == 1) {
        servos.P0.run(puissanceRotation)
    } else {
        if (tournerAntiHoraire == 1) {
            servos.P0.run(0 - puissanceRotation)
        } else {
            servos.P0.stop()
        }
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    reset()
    basic.showIcon(IconNames.No)
})
function commandeMoteurTreuil () {
    if (tournerHoraire == 1) {
        servos.P2.run(puissanceTreuil)
    } else {
        if (tournerAntiHoraire == 1) {
            servos.P2.run(0 - puissanceTreuil)
        } else {
            servos.P2.stop()
        }
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.SemiColon), function () {
    traitemementMessage()
})
function traitemementMessage () {
    message = bluetooth.uartReadUntil(serial.delimiters(Delimiters.SemiColon))
    if (message == "down_haut") {
        basic.showString("T")
        moteur = 1
        tournerHoraire = 1
    } else if (message == "up_haut") {
        tournerHoraire = 0
    } else if (message == "down_bas") {
        basic.showString("T")
        moteur = 1
        tournerAntiHoraire = 1
    } else if (message == "up_bas") {
        tournerAntiHoraire = 0
    } else if (message == "down_droite") {
        basic.showString("R")
        moteur = 0
        tournerHoraire = 1
    } else if (message == "up_droite") {
        tournerHoraire = 0
    } else if (message == "down_gauche") {
        basic.showString("R")
        moteur = 0
        tournerAntiHoraire = 1
    } else if (message == "up_gauche") {
        tournerAntiHoraire = 0
    }
}
function reset () {
    moteur = 0
    tournerHoraire = 0
    tournerAntiHoraire = 0
    puissanceTreuil = 30
    puissanceRotation = 20
}
function afficherDirection () {
    if (tournerHoraire == 1) {
        if (moteur == 0) {
            basic.showLeds(`
                . . . # .
                . # # # #
                # . . # .
                # . . . .
                . # # # .
                `)
        } else if (moteur == 1) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
        }
    } else {
        if (tournerAntiHoraire == 1) {
            if (moteur == 0) {
                basic.showLeds(`
                    . # . . .
                    # # # # .
                    . # . . #
                    . . . . #
                    . # # # .
                    `)
            } else if (moteur == 1) {
                basic.showLeds(`
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    `)
            }
        }
    }
}
let moteur = 0
let message = ""
let puissanceTreuil = 0
let tournerAntiHoraire = 0
let puissanceRotation = 0
let tournerHoraire = 0
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
reset()
basic.forever(function () {
    afficherDirection()
    if (moteur == 0) {
        commandeMoteurRotation()
    } else {
        commandeMoteurTreuil()
    }
})
