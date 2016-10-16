import mongoose, { Schema } from 'mongoose'

export const orderStatuses =['new','paid','accepted','ordered','shipping','delivered','cancelled']

export const orderItemSchema = new Schema({
  quantity: {type:Number, min:0,required:true},
  productId: {type:Schema.ObjectId, required: true},
  price:{type:Number}
})

const orderSchema = new Schema({
  status: {
    type: String,
    enum: orderStatuses,
    required: true
  },
  comment:{type: String},
  courierId: {
    type: Schema.ObjectId
  },
  clientId: {
    type: Schema.ObjectId,
    required: true
  },
  items: {
    type: [orderItemSchema]
  }
}, {
  timestamps: true
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      status: this.status,
      courierId: this.courierId,
      clientId: this.clientId,
      items: this.items,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export const orderCreate = (order)=>{
  console.log(order.user);
  order.status = 'new';
  order.clientId = null;
  return Promise.resolve(order);
}


export const schema = orderSchema;
export default mongoose.model('Order', orderSchema)
