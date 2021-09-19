class Utils {
    constructor(runtime) {
        this.runtime = runtime
        this.currentMSecs = -1
        this.previousButtons = []
        this.currentButtons = []
    }
    
    getInfo() {
        return {
            "id": "Utils",
            "name": "Utils",
            "blocks": [{
                        "opcode": "buttonPressedReleased",
                        "blockType": "hat",
                        "text": "button [b] [eventType]",
                        "arguments": {
                            "b": {
                                "type": "number",
                                "defaultValue": "0"
                            },
                            "eventType": {
                                "type": "number",
                                "defaultValue": "1",
                                "menu": "pressReleaseMenu"
                            },
                        },
                    },
            ],
            "menus": {
                "pressReleaseMenu": [{text:"press",value:1}, {text:"release",value:0}],
            }            
        };
    }
    
    update() {
        if (this.runtime.currentMSecs == this.currentMSecs) 
            return // not a new polling cycle
        this.currentMSecs = this.runtime.currentMSecs
        var gamepads = navigator.getGamepads()
        if (gamepads == null || gamepads.length == 0 || gamepads[0] == null) {
            // different number of buttons, so new gamepad
            this.previousButtons = []
            this.currentButtons = []
            return
        }
        var gamepad = gamepads[0]
        if (gamepad.buttons.length != this.previousButtons.length) {
            this.previousButtons = []
            for (var i = 0; i < gamepad.buttons.length; i++) 
                this.previousButtons.push(false)
        }
        else {
            this.previousButtons = this.currentButtons
        }
        this.currentButtons = []
        for (var i = 0; i < gamepad.buttons.length; i++) 
            this.currentButtons.push(gamepad.buttons[i].pressed)
    }
    
    
}

(function() {
    var extensionInstance = new Utils(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
