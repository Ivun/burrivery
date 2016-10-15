import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Order } from '.'
import {orderCreate, orderItemSchema} from './order.model';

export const create = (req, res, next) =>
  orderCreate(req).then((order)=> Order.create(order))
    .then((order) => order.view(true))
    .then(success(res, 201))
    .catch(next);


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Order.find(query, select, cursor)
    .then((orders) => orders.map((order) => order.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then((order) => order ? order.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then((order) => order ? _.merge(order, body).save() : null)
    .then((order) => order ? order.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then((order) => order ? order.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const addProduct = ({bodymen:{body}, user}, res, next) => {
  return ensureOrder(user._id)
    .then((order)=>{
      console.log(body);

      var existingProduct = order.items.find((x)=>{return x.productId == body.productId});
      if (existingProduct){
        existingProduct.quantity += body.quantity;
      }else{
        order.items.push({productId: body.productId, quantity: body.quantity});
      }

      return order.save();
  }).then(success(res, 201))
    .catch(next);
}

function ensureOrder(userId){
  return Order.findOne({clientId:userId, status: 'new'},null,{sort:{createdAt:-1}}).then((order)=>{
    if (!order){
      return Order.create({clientId:userId, status:'new'});
    }

    return order;
  });
}
