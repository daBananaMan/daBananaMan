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
                        "opcode": "substring
                        "blockType": "reporter",
                        "text": "create a substring of [str] starting at [a] and ending at [b]",
                        "arguments": {
                            "str": {
                                "type": "string",
                                "defaultValue": "Hello World"
                            },
                            "a": {
                                "type": "number",
                                "defaultValue": "6",
                            },
                            "b": {
                                "type": "number",
                                "defaultValue": "11",
                            },
                        },
                    },
            ],   
        };
    }
    
    
    
}

substring({str, a, b}){
    return str.substring(a, b);
}

Scratch.extensions.register(new Utils());
