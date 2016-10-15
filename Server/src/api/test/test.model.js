import mongoose, { Schema } from 'mongoose'

const testSchema = new Schema({
  title: {
    type: String
  },
  price: {
    type: String
  }
}, {
  timestamps: true
})

testSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Test', testSchema)
