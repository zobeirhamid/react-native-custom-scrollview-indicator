const App = require("./App")

// @ponicode
describe("scrollToIndex", () => {
    let inst

    beforeEach(() => {
        inst = new App.default("George")
    })

    test("0", () => {
        let callFunction = () => {
            inst.scrollToIndex(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.scrollToIndex(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.scrollToIndex(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.scrollToIndex(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.scrollToIndex(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.scrollToIndex(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
