import _ from 'lodash'
import { success, notFound } from '../../../services/response/'
import { Order } from '../.'
import { orderCreate, orderItemSchema } from '../order.model';

export const pay4Order = ({params, user}, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then((order) => {
      if (order.status == 'new'){
        order.status = 'paid';
        return order.save();
      }else{
        res.status(400).json({
          message: "Order was already paid"
        });
        return null;
      }
    })
    .then((order) => order ? order.view(true):null)
    .then(success(res, 201))
    .catch(next);
