import {MobileDetector} from '../helpers/MobileDetector';
import {MobileView} from '../view/MobileView';

class MobileController {

    constructor(){
        this._$ = document.querySelector.bind(document);

        this._headingElement = this._$('.heading');
        this._mobileElement = this._$('#mobileSection');

        this._mobileDetector =  new MobileDetector(window.innerWidth, window.innerHeight);

        this._mobileView = new MobileView(this._mobileElement);

        this._init()
    }

    _init(){
        if(this._mobileDetector.isMobile()){
            this._headingElement.parentNode.removeChild(this._headingElement);
            this._mobileView.update();
        }
    }
}

let mobileController =  new MobileController();

export function currentInstance() {

    return mobileController;

}