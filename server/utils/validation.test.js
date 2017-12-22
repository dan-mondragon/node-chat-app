const expect = require('expect');
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var isString = isRealString(12);
        expect(isString).toBe(false)
    })

    it('should reject string with only spaces', () => {
        var isString = isRealString('                   ');
        expect(isString).toBe(false)
    })

    it('should allow string with non-space characters', () => {
        var isString = isRealString('daniel@gigigo.com');
        expect(isString).toBe(true)
    })
});


