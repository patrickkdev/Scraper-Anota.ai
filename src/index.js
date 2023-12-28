"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var inactiveClients = [];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function finish() {
            return __awaiter(this, void 0, void 0, function () {
                var _i, inactiveClients_1, inactiveClient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isFinished = true;
                            return [4 /*yield*/, browser.close()];
                        case 1:
                            _a.sent();
                            console.log("\n\nInactive Clients:\n\n");
                            for (_i = 0, inactiveClients_1 = inactiveClients; _i < inactiveClients_1.length; _i++) {
                                inactiveClient = inactiveClients_1[_i];
                                console.log(inactiveClient);
                            }
                            console.log("Finished");
                            return [2 /*return*/];
                    }
                });
            });
        }
        function clickOnInactiveClientsTab() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, page.waitForSelector(inactiveClientsTabButton)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, page.click(inactiveClientsTabButton)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function showMaxItensPerPage() {
            return __awaiter(this, void 0, void 0, function () {
                var numberOfOptions, lastOption;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, page.waitForSelector(selectOfAmountOfItensPerPage)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, page.click(selectOfAmountOfItensPerPage)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, page.$eval(containerWithOptionsForAmountOfItemsPerPage, function (element) { return element.children.length; })];
                        case 3:
                            numberOfOptions = _a.sent();
                            return [4 /*yield*/, page.waitForSelector(lastOptionSelector(numberOfOptions))];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, page.$(lastOptionSelector(numberOfOptions))];
                        case 5:
                            lastOption = _a.sent();
                            lastOption === null || lastOption === void 0 ? void 0 : lastOption.click();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function goToNextPage(currentPage) {
            return __awaiter(this, void 0, void 0, function () {
                var numberOfPages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getNumberOfPages()];
                        case 1:
                            numberOfPages = _a.sent();
                            if (currentPage >= numberOfPages)
                                finish();
                            return [4 /*yield*/, page.waitForSelector(nextPageButton)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, page.click(nextPageButton)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function getNumberOfPages() {
            return __awaiter(this, void 0, void 0, function () {
                var newNumberOfPages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (numberOfTablePages)
                                return [2 /*return*/, numberOfTablePages];
                            return [4 /*yield*/, page.waitForSelector(pageCountSelector)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, page.$eval(pageCountSelector, function (element) { return element.textContent; })];
                        case 2:
                            newNumberOfPages = _a.sent();
                            if (newNumberOfPages) {
                                numberOfTablePages = parseInt(newNumberOfPages);
                                return [2 /*return*/, numberOfTablePages];
                            }
                            else
                                throw new Error("Nâo foi possível obter o número de páginas.");
                            return [2 /*return*/];
                    }
                });
            });
        }
        var isFinished, browser, page, numberOfTablePages, fetchTableItemsUrl, inactiveClientsTabButton, selectOfAmountOfItensPerPage, containerWithOptionsForAmountOfItemsPerPage, lastOptionSelector, nextPageButton, pageCountSelector;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting");
                    isFinished = false;
                    return [4 /*yield*/, puppeteer_1["default"].launch({
                            userDataDir: "./user_data",
                            headless: false,
                            defaultViewport: null
                        })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    numberOfTablePages = undefined;
                    fetchTableItemsUrl = "auth/client/v2/report/dataclient/new-report?page";
                    inactiveClientsTabButton = "#anota-template > div > div.tabs-container > anota-tabs > div > div > anota-tabs-item:nth-child(2) > button";
                    selectOfAmountOfItensPerPage = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-select > div > div.sm.select-container.select-container__outline";
                    containerWithOptionsForAmountOfItemsPerPage = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-select > div > div.container-options.show-container-options.container-options--open > div";
                    lastOptionSelector = function (numberOfOptions) { return "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-select > div > div.container-options.show-container-options.container-options--open > div > div:nth-child(".concat(numberOfOptions, ")"); };
                    nextPageButton = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > anota-icon:nth-child(6)";
                    pageCountSelector = "#anota-template > div > div.tabs-container > anota-tabs > div > anota-tabs-content:nth-child(3) > div > customer-table-header > div > div.info-table > anota-pagination > div > span:nth-child(3)";
                    // Navigate the page to a URL
                    return [4 /*yield*/, page.goto('https://admin.anota.ai/main/reports/client')];
                case 3:
                    // Navigate the page to a URL
                    _a.sent();
                    return [4 /*yield*/, clickOnInactiveClientsTab()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, showMaxItensPerPage()
                        // Intercept responses
                    ];
                case 5:
                    _a.sent();
                    // Intercept responses
                    page.on('response', function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var searchParams, page, limit, listOfInactiveClients, _i, listOfInactiveClients_1, inactiveClient, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!response.url().includes(fetchTableItemsUrl))
                                        return [2 /*return*/];
                                    searchParams = new URL(response.url()).searchParams;
                                    page = searchParams.get('page');
                                    limit = searchParams.get('limit');
                                    console.log('Intercepted response URL:', response.url());
                                    console.log("Current Page:", page);
                                    if (limit === "10") {
                                        console.log("only 10 items");
                                        return [2 /*return*/];
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, , 6]);
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    listOfInactiveClients = _a.sent();
                                    for (_i = 0, listOfInactiveClients_1 = listOfInactiveClients; _i < listOfInactiveClients_1.length; _i++) {
                                        inactiveClient = listOfInactiveClients_1[_i];
                                        inactiveClients.push(inactiveClient._id.phone);
                                    }
                                    return [4 /*yield*/, sleep((Math.random() * 4 + 1) * 1000)];
                                case 3:
                                    _a.sent();
                                    if (listOfInactiveClients.length === 0) {
                                        finish();
                                    }
                                    return [4 /*yield*/, goToNextPage(parseInt(page || "0") + 1)];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    e_1 = _a.sent();
                                    console.error(e_1);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Return a Promise that resolves when finish() is called
                    return [2 /*return*/, new Promise(function (resolve) {
                            (function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!isFinished) return [3 /*break*/, 2];
                                            // Your main logic goes here
                                            return [4 /*yield*/, sleep(1000)];
                                        case 1:
                                            // Your main logic goes here
                                            _a.sent(); // Adjust the interval as needed
                                            return [3 /*break*/, 0];
                                        case 2:
                                            resolve();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })();
                        })];
            }
        });
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { setTimeout(resolve, ms); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
