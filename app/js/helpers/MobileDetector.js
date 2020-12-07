export class MobileDetector {

    constructor(width, height){
        this._width = width;
        this._height = height;
        Object.freeze(this);
    }

    isMobile (){
        return ((this._width <= 800) && (this._height <= 900));
    }
}

