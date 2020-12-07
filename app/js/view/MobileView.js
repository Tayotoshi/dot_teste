import {View} from './View';

export class MobileView extends View {
    
    constructor(elemento) {
        super(elemento);
    }
    
    template() {
        return `
        <div class="mobile-section">
            <div class="mobile-heading">
                <h1> LOREM IPSUM </h1>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
        </div>
        `;
    }
}
