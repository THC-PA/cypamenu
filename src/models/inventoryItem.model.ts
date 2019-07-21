import { Product } from 'src/models/product.model';
import { ProductStrain } from 'src/models/productStrain.model';

export class InventoryItem {
    id: number;
    location_id: number;
    name: string;
    bt_remaining_quantity: number;
    updated: string;
    category: string;
    product_id: number;
    brand: string;
    product_strain_id: number;
    bt_potency_thc: number;
    bt_potency_thca: number;
    cultivator: string;
    product: Product;
    productStrain: ProductStrain;
    //store: Store;
}