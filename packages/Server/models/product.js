const mongoose = require('mongoose')

const deepPopulate = require('mongoose-deep-populate')(mongoose)
const mongooseAlgolia = require('mongoose-algolia')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    image: String,
    title: String,
    descripcion: String,
    price: Number,
    created: {type:Date, default: Date.now()}
},{
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})

ProductSchema
    .virtual('averageRating')
    .get(function(){
        var rating = 0;
        if(this.reviews.length == 0){
            rating = 0
        } else {
            this.reviews.map((review)=>{
                rating +=review.rating
            })
            rating = rating /this.reviews.length
        }
        return rating
    })

ProductSchema.plugin(deepPopulate)
ProductSchema.plugin(mongooseAlgolia,{
    appId: '8YPSG6XWED',
    apiKey: '5b908e163b505c4c92f349ab8294af8b',
    indexName: 'Amazono1',
    selector: '_id title image reviews description price owner created averageRating',
    populate: {
        path: 'owner reviews',
        select: 'name rating'
    }, defaults: {
        authos: 'uknown'
    }, mappings: {
        title: function(value){
            return `${value}`
        }
    }, virtuals: {
        averageRating: function(doc){
            var rating = 0;
            if(doc.reviews.length == 0){
                rating = 0
            } else {
                doc.reviews.map((review)=>{
                    rating +=review.rating
                })
                rating = rating /doc.reviews.length
            }
            return rating
        }
    },
    debug: true
})
let Model = mongoose.model('Product', ProductSchema)

Model.SyncToAlgolia()
Model.SetAlgoliaSettings({
    searchableAttributes: ['title']
})
module.exports = Model