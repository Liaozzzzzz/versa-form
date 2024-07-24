import upperFirst from "lodash/upperFirst";

export const isEmpty = (value) => ['', null, undefined].includes(value);

export const noop = (v) => v;

export const isObject = v => Object.prototype.toString.call(v).toLocaleLowerCase() === '[object object]';

export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export function toArray(origin) {
    if (origin === null || origin === undefined) {
        return [];
    }
    if (Array.isArray(origin)) {
        return origin;
    }
    return [origin];
}

export const gen = () => Math.random().toString(36).slice(2);

export const formatEventName = (obj = {}) => {
    const res = {};
    for (const name in obj) {
        res[/^on[A-Z].*/.test(name) ? name : `on${upperFirst(name)}`] = obj[name];
    }
    return res;
}