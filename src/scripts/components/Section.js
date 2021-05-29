export class Section{
    constructor({items, renderer}, container){
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    addItem(card){
        this._container.prepend((card));    
    }
    renderItems(){
        this._items.forEach(element => {
            this._container.append(this._renderer(element));    
        });    
    }
}