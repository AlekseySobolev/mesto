export class Section{
    constructor({items, renderer}, container){
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    addItem(card, element){
        this._container.prepend((card)); 
        this._element= element;    
    }

    renderItems(items, userId){
        items.forEach(element => {
            this._container.append(this._renderer(element, userId));    
        });    
    }
}