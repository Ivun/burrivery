import BaseApiClient from './baseApiClient';

class ProductsApiClient extends BaseApiClient{
    list(){
        return super.get("products");
    }

    get(id){
        return super.get(`products/${id}`);
    }
}

export default new ProductsApiClient();
