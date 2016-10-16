import BaseApiClient from './baseApiClient';

class OrdersApiClient extends BaseApiClient{
    ensure(){
        return super.post(`orders/require`);
    }

    add(orderId, productId, quantity){
        return super.post(`orders/${orderId}/products/${productId}/add`, {quantity});
    }

    remove(orderId, productId, quantity){
        return super.post(`orders/${orderId}/products/${productId}/remove`, {quantity});
    }
}

export default new OrdersApiClient();
