export default class HandlerAsset {
    handler = null;

    constructor() {
        this.handler = [];
    }

    getHandler() {
        return this.handler;
    }

    add(key, assetElement) {
        this.handler.push({
            key: key,
            asset: assetElement
        });
    }

    remove(assetElement) {
        this.handler.splice(this.handler.indexOf(element => element.key == assetElement), 1);
    }

    get(key) {
        return this.handler.find(element => element.key == key).asset;
    }

    clear() {
        this.handler = [];
    }
}