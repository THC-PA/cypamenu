export class Prices {

    price: number;
    weight: number;
    post_tax_price: number;

    constructor(price: number, weight: number, postTaxPrice: number) {
        this.price = price;
        this.weight = weight;
        this.post_tax_price = postTaxPrice;
    }
}