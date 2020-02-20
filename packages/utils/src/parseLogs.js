"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
function parseLogs(logs, abi) {
    var iface = new ethers_1.ethers.utils.Interface(abi);
    return logs
        .map(function (log) { return iface.parseLog(log); })
        .filter(function (item) { return item != null; })
        .map(function (item) {
        var result = {
            name: item.name,
            signature: item.signature,
            values: {}
        };
        var keys = Object.keys(item.values);
        var values = Object.values(item.values);
        var start = item.values.length;
        for (var i = start; i <= start * 2 - 1; i++) {
            result.values[keys[i]] = values[i];
        }
        return result;
    });
}
exports.parseLogs = parseLogs;
