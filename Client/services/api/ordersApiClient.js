import BaseApiClient from './baseApiClient';

class OrdersApiClient extends BaseApiClient{
    ensure(){
        return super.post(`orders/require`);
    }

    add(orderId, productId, quantity){
        return super.post(`orders/${id}/products/${productId}/add`, {quantity});
    }
}

export default new OrdersApiClient();
