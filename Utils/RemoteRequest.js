"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
var bibleAPIkey = 'QNeyBv2cdkEefhkwNXjmF1NonK42cA7CmjDvGBRs';
exports.createRequest = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let requestOptions = {
            url: url,
            auth: {
                'user': bibleAPIkey,
                'pass': '',
                'sendImmediately': false
            },
            json: true
        };
        try {
            response = yield request(requestOptions);
        }
        catch (ex) {
            console.log(ex);
        }
        return response;
    });
};
