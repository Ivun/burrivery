import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Order } from '.'
import { Product } from '../product'
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

export const activeOrders = ({ user }, res, next) =>
  Order.find({status:{$in:['paid','accepted','ordered','shipping']}})
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

export const addProduct = ({params, body }, res, next) => {
  const orderId = params.id;
  const productId = params.productId;
  const quantity = body.quantity;

  return Order.findById(orderId)
    .then(notFound(res))
    .then((order)=>{
      var existingProduct = order.items.find((x)=>{return x.productId == productId});
      if (existingProduct){
        existingProduct.quantity += quantity;
      }else{
        console.log(productId);
        return Product.findById(productId).then((p)=>{
          order.items.push({productId: productId, quantity: quantity, price: p.price});
          return order.save();
        })
      }

      return order.save();
    })
    .then(order=>order?order.view():null)
    .then(success(res, 201))
    .catch(next);
}

export const removeProduct = ({params, body }, res, next) => {
  const orderId = params.id;
  const productId = params.productId;
  const quantity = body.quantity;

  return Order.findById(orderId)
    .then((order)=>{
      var existingProduct = order.items.find((x)=>{return x.productId == productId});
      if (existingProduct){
        existingProduct.quantity -= quantity;

        if (existingProduct.quantity <= 0){
          order.items = [...order.items.filter(x=>x.quantity > 0)];
        }
      }

      return order.save();
    })
    .then(order=>order?order.view():null)
    .then(success(res, 201))
    .catch(next);
}

export const requireOrder = ({user}, res, next) => {
  return ensureOrder(user._id)
    .then(notFound(res))
    .then(order=>order?order.view():null)
    .then(success(res, 201))
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
