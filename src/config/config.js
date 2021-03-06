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
(function (config) {
    console.log('MUX_CONFIG INIT');
    // const host = 'http://localhost:8081'
    const host = 'https://mux-world.github.io/assets';
    const configs = new Map([
        ['token', 'config/assets/token.json'],
    ]);
    if (!config) {
        window.MUX_CONFIG = config = {
            configs: {},
            onResolve: (configKey) => __awaiter(this, void 0, void 0, function* () {
                if (configKey instanceof Array) {
                    return Promise.all(configKey.map(key => window.MUX_CONFIG.configs[key]));
                }
                else {
                    return window.MUX_CONFIG.configs[configKey];
                }
            })
        };
    }
    const fetchFunc = (uri, retryTimes = 5) => __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fetch(`${host}/${uri}`);
        }
        catch (e) {
            if (retryTimes > 0) {
                console.log('retry fetch time', 6 - retryTimes, uri);
                return yield fetchFunc(uri, retryTimes - 1);
            }
            throw e;
        }
    });
    configs.forEach((uri, key) => {
        window.MUX_CONFIG.configs[key] = (() => __awaiter(this, void 0, void 0, function* () {
            return (yield fetchFunc(uri)).json();
        }))();
    });
})(window.MUX_CONFIG);
