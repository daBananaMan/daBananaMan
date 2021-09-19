class ScratchFetch {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Fetch",
            "name": "Fetch",
            "blocks": [
                        {
                            "opcode": "fetchURL",
                            "blockType": "reporter",
                            "text": "fetch data from [url]",
                            "arguments": {
                                "url": {
                                    "type": "string",
                                    "defaultValue": "https://api.weather.gov/stations/KNYC/observations"
                                },
                            }
                        },
                        {
                            "opcode": "jsonExtract",
                            "blockType": "reporter",
                            "text": "extract [name] from [data]",
                            "arguments": {
                                "name": {
                                    "type": "string",
                                    "defaultValue": "temperature"
                                },
                                "data": {
                                    "type": "string",
                                    "defaultValue": '{"temperature": 12.3}'
                                },
                            }
                        },
                        {
                            "opcode": "substring",
                            "blockType": "reporter",
                            "text": "a substring of [str] starting at [a] and ending at [b]",
                            "arguments": {
                                "str": {
                                    "type": "string",
                                    "defaultValue": ""
                                },
                                "a": {
                                    "type": "number",
                                    "defaultValue": "0"
                                },
                                "b": {
                                    "type": "number",
                                    "defaultValue": "0"
                                },
                            }
                        },
                        {
                            "opcode": "join",
                            "blockType": "reporter",
                            "text": "join [a] with [b]",
                            "arguments": {
                                "a": {
                                    "type": "string",
                                    "defaultValue": "Hello"
                                },
                                "b": {
                                    "type": "string",
                                    "defaultValue": "World"
                                },
                            }
                        },
                ],
        };
    }
    
    fetchURL({url}) {
        return fetch(url).then(response => response.text())
    }
    join({a,b}){
        return a + b
    }
    substring({str,a,b}){
        return str.substring(a, b)
    }
    
    jsonExtract({name,data}) {
        var parsed = JSON.parse(data)
        if (name in parsed) {
            var out = parsed[name]
            var t = typeof(out)
            if (t == "string" || t == "number")
                return out
            if (t == "boolean")
                return t ? 1 : 0
            return JSON.stringify(out)
        }
        else {
            return ""
        }
    }
}

Scratch.extensions.register(new ScratchFetch())
