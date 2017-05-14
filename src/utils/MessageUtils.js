class MessageUtils {

    static sanitizeMessage(message){
        // Filter out any "command" prefixes
        let commandIndex = message.split(" ")
            .findIndex(item => item.toLowerCase().indexOf("broadcast") != -1);

        if(commandIndex != -1 && commandIndex < 3){ // Only search the first 3 words
            message = message.split(" ")
                .splice(commandIndex + 1, message.split(" ").length)
                .join(" ");
        }
        return message;
    }
}

export default MessageUtils
