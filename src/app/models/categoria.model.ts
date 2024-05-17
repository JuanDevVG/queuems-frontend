export class Categoria {
    categoryId: number;
    categoryName: string;
    active: boolean;

    constructor () {
        this.categoryId = 0;
        this.categoryName = '';
        this.active = false;
    }
}