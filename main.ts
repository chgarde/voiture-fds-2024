bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Heart)
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
    traitemementMessage()
})
function commandeMoteurGauche () {
    servos.P0.run(puissanceRotation)
}
function traitemementMessage () {
    message = bluetooth.uartReadUntil(serial.delimiters(Delimiters.SemiColon))
    if (message == "down_haut") {
        moteur = 1
        tournerHoraire = 1
    } else if (message == "up_haut") {
        tournerHoraire = 0
    } else if (message == "down_bas") {
        moteur = 1
        tournerAntiHoraire = 1
    } else if (message == "up_bas") {
        tournerAntiHoraire = 0
    } else if (message == "down_droite") {
        moteur = 0
        tournerHoraire = 1
    } else if (message == "up_droite") {
        tournerHoraire = 0
    } else if (message == "down_gauche") {
        moteur = 0
        tournerAntiHoraire = 1
    } else if (message == "up_gauche") {
        tournerAntiHoraire = 0
    }
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
    servos.P0.run(puissanceRotation)
}
function stopMoteur () {
    servos.P1.stop()
    servos.P2.stop()
}
function commandeMoteurReculer () {
    if (tournerHoraire == 1) {
        servos.P2.run(0 - puissanceMoteur)
        servos.P1.run(0 - puissanceMoteur)
    }
}
function reset () {
    puissanceMoteur = 100
    puissanceRotation = 50
}
function commandeMoteurAvancer () {
    if (tournerHoraire == 1) {
        servos.P2.run(puissanceMoteur)
        servos.P1.run(puissanceMoteur)
    }
}
let puissanceMoteur = 0
let tournerAntiHoraire = 0
let tournerHoraire = 0
let moteur = 0
let message = ""
let puissanceRotation = 0
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
reset()
basic.forever(function () {
    if (moteur == 0) {
        commandeMoteurDroite()
    } else {
        commandeMoteurAvancer()
    }
})
