/**
 * Created by samuel on 5/29/17.
 */
/**
 * Created by Samuel on 7/4/2016.
 */
declare var module;
import * as request from 'request-promise';
var bibleAPIkey = 'QNeyBv2cdkEefhkwNXjmF1NonK42cA7CmjDvGBRs';

export let createRequest = async function (url) {
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
        response = await request(requestOptions);

    } catch (ex) {
        console.log(ex);
    }
    return response;
};
