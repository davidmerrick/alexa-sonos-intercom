import {expect} from "chai";
import MessageUtils from "../src/utils/MessageUtils";

describe("MessageUtils test", () => {

    it("Should filter out broadcast from beginning of message", () => {
        let message = "broadcast hello world";
        let sanitizedMessage = MessageUtils.sanitizeMessage(message);
        let expectedMessage = "hello world";
        expect(sanitizedMessage).to.equal(expectedMessage);
    });

    it("Should filter out broadcast and text before in beginning of message", () => {
        let message = "to say broadcast hello world";
        let sanitizedMessage = MessageUtils.sanitizeMessage(message);
        let expectedMessage = "hello world";
        expect(sanitizedMessage).to.equal(expectedMessage);
    });

    it("Should not filter out broadcast past position 3 in message", () => {
        let message = "hello world I just love to broadcast";
        let sanitizedMessage = MessageUtils.sanitizeMessage(message);
        expect(sanitizedMessage).to.equal(message);
    });
});



