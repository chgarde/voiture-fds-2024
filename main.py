def on_bluetooth_connected():
    basic.show_icon(IconNames.YES)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.NO)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_uart_data_received():
    basic.show_icon(IconNames.HEART)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.CARRIAGE_RETURN),
    on_uart_data_received)

bluetooth.start_uart_service()
basic.show_icon(IconNames.SQUARE)