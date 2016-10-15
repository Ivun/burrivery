import _ from 'lodash'
import { success, notFound } from '../../../services/response/'
import { Order } from '../.'
import { orderCreate, orderItemSchema } from '../order.model';

export const acceptOrder = ({params, user}, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then((order) => {
      if (order.status == 'accepted' && order.courierId == user._id){
        return order;
      }

      if (order.status == 'paid'){
        order.courierId = user._id;
        order.status = 'accepted';
        return order.save();
      }else{
        res.status(400).json({
          message: "Order was already accepted by another courier"
        }).end();
        return null;
      }
    })
    .then((order) => order? order.view(true):null)
    .then(success(res, 201))
    .catch(next);
