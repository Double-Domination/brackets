module.exports = function check(str, bracketsConfig) {
    // your solution
    // Working with openining and closing characters ...bracketsConfig
    let config = {};
    for (let index = 0; index < bracketsConfig.length; index++) {
        // Accesing current pair of openining and closing symbol pair from bracketsConfig
        const element = bracketsConfig[index];

        //deconstructuring into opening and closing char
        let [openingChar, closingChar] = [...element];
        //creating current specification object
        const elementSpecName = "spec" + index;
        config[elementSpecName] = {
            openingChar: openingChar,
            closingChar: closingChar,
        };
    }
    //Build opening/closing character staack
    let equalCharacterStack = [];
    let openningCharactersStack = [];
    let closingCharactersStack = [];

    function checkCurrentCharacter(char) {
        for (const currentSpec in config) {
            if (Object.hasOwnProperty.call(config, currentSpec)) {
                const element = config[currentSpec];
                if (
                    element.openingChar === char &&
                    element.openingChar === element.closingChar
                ) {
                    if (equalCharacterStack[0] === char) {
                        equalCharacterStack.shift();
                    } else {
                        equalCharacterStack.unshift(char);
                    }
                } else if (
                    element.openingChar === char &&
                    element.openingChar !== element.closingChar
                ) {
                    openningCharactersStack.unshift(char);
                } else if (
                    element.closingChar === char &&
                    element.openingChar !== element.closingChar
                ) {
                    if (openningCharactersStack[0] === element.openingChar) {
                        openningCharactersStack.shift();
                    } else {
                        closingCharactersStack.unshift(char);
                    }
                }
            }
        }
    }
    //iterating triugh the string and check it by symbol
    for (let index = 0; index < str.length; index++) {
        checkCurrentCharacter(str.charAt(index));
    }

    // console.table(openningCharactersStack);
    // console.table(closingCharactersStack);
    // console.table(equalCharacterStack);

    if (
        openningCharactersStack.length === 0 &&
        closingCharactersStack.length === 0 &&
        equalCharacterStack.length === 0
    ) {
        return true;
    } else {
        return false;
    }
};
