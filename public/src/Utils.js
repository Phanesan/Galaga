export class Utils {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static intervalTimer(frameCount, callback, intervalFrame) {
        if(frameCount % intervalFrame === 0) {
            callback();
        }
    }
}