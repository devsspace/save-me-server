const mongoose = require('mongoose');
const { Schema } = mongoose;

// require mongoose-simple-slugify in your schema
const slugify = require('mongoose-simple-slugify');

const newsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        draft: {
            type: Boolean,
            default: true,
        },
        slug: {
            source: 'title',
            type: String,
            slugPaddingSize: 2
        },
        published: {
            type: Boolean,
            default: false,
        },
    },

    { timestamps: true },
)

newsSchema.plugin(slugify);

newsSchema.pre('save', async function (next) {
    // If the news goes on draft generate no slug 
    if (this.isNew && this.draft) {
        // await this.model(this.constructor.modelName).exists({ slug }))
        this.slug = null;
        next();
    }
    if (!this.isNew && this.slug === null) {
        console.log(this.slug);
        console.log(this.model);
        next();
    }

    // otherwise generating slug using slugify
    // keep previous slug on update
}), // registering the plugin



    module.exports = mongoose.model('News', newsSchema);


// .pre('save', async function () {
//     console.log(`this.isNew ${this.isNew}`)
//     console.log(slugify)

//     if (this.draft) {
//         this.slug = null;
//     } else if (!this.draft && this.published && this.isNew) {
//         // this.slug = slugify(this);
//     }
// }),