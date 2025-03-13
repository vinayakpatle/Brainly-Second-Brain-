"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random = (len) => {
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * length))];
    }
    return ans;
};
exports.default = random;
