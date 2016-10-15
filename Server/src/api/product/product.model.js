import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageSrc: {
    type: String
  }
}, { timestamps: true })

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      title: this.title,
      subtitle: this.subtitle,
      price: this.price,
      imageSrc: this.imageSrc
    }
  console.log(123);
    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Product', productSchema)
