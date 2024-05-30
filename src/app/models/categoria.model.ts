export class Categoria {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
    active: boolean;

    constructor () {
        this.categoryId = 0;
        this.categoryName = '';
        this.active = false;
        this.categoryDescription = '';
    }
}