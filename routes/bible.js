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
const express = require("express");
const RemoteRequest = require("../Utils/RemoteRequest");
const booksurl = 'https://bibles.org/v2/versions/spa-RVR1960/books.js?include_chapters=true';
let booksCache = [];
let versesCache = {};
let router = express.Router();
/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send(["hi"]);
});
//let ApiRequestHandler:any;
//ApiRequestHandler.onGetApiBooks =
//ApiRequestHandler.onGetApiVerses = ;
//ApiRequestHandler.onGetApiSingleVerse = ;
let sendResponse = (nodeResponse, content) => {
    nodeResponse.set("Content-Type", "application/json");
    nodeResponse.send(content);
};
let getBooks = () => __awaiter(this, void 0, void 0, function* () {
    let books;
    if (booksCache.length > 0) {
        console.log('Cache Hit');
        books = booksCache;
        return books;
        // sendResponse(nodeResponse, books);
    }
    let returnedData = yield RemoteRequest.createRequest(booksurl);
    books = returnedData.response.books.map((book) => {
        let mappedBook = {
            id: book.id,
            order: book.ord,
            testament: book.testament,
            name: book.name,
            chapters: book.chapters
        };
        return mappedBook;
    });
    booksCache = books;
    return books;
});
router.get("/books", (nodeRequest, nodeResponse) => __awaiter(this, void 0, void 0, function* () {
    let books = yield getBooks();
    sendResponse(nodeResponse, books);
}));
router.get("/verses/:chapterId", (nodeRequest, nodeResponse) => __awaiter(this, void 0, void 0, function* () {
    let chapterId = nodeRequest.params.chapterId;
    let versesurl = `https://bibles.org/v2/chapters/${chapterId}/verses.js`;
    let verses = yield getVerses(versesurl, chapterId);
    sendResponse(nodeResponse, verses);
}));
let getVerses = (versesurl, chapterId) => __awaiter(this, void 0, void 0, function* () {
    let verses;
    if (versesCache && versesCache[chapterId]) {
        verses = versesCache[chapterId];
        return verses;
    }
    let returnedData = yield RemoteRequest.createRequest(versesurl);
    verses = returnedData.response.verses.map((verse) => {
        let mappedVerse = {
            id: verse.id,
            next: verse.next,
            parent: verse.parent,
            previous: verse.previous,
            reference: verse.reference,
            text: verse.text,
        };
        return mappedVerse;
    });
    versesCache[chapterId] = verses;
    return verses;
});
router.get("/getSingleVerse/:chapterId/:verseId/", (nodeRequest, nodeResponse) => __awaiter(this, void 0, void 0, function* () {
    let chapterId = nodeRequest.params.chapterId;
    let verseId = nodeRequest.params.verseId;
    var versesurl = `https://bibles.org/v2/verses/${verseId}.js`;
    let verse;
    if (versesCache[chapterId]) {
        verse = versesCache[chapterId].filter((verse) => {
            return verse.id = verseId;
        })[0];
        return sendResponse(nodeResponse, verse);
    }
    let verses = yield getVerses(versesurl, chapterId);
    verse = verses.filter((verse) => {
        return verse.id = verseId;
    })[0];
    sendResponse(nodeResponse, verse);
}));
//router.get("/api/getMyVerses", auth.ensureAuthenticated,ApiRequestHandler.onGetMyFavoriteVerses);
//router.post("/api/addToFavorite", auth.ensureAuthenticated, ApiRequestHandler.onAddToFavorites);
//router.post("/api/removeFromFavorites", auth.ensureAuthenticated, ApiRequestHandler.onRemoveFromFavorites);
//router.get("/bible", auth.ensureAuthenticated,ViewsRequestHandler.onGetBibleView);
//router.get("/FavoriteVerses", auth.ensureAuthenticated,ViewsRequestHandler.onGetMyFavoriteVersesView);
module.exports = router;
