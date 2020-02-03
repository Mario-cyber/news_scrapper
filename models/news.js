var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


// This is similar to a Sequelize model
var NewsSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true
    },

    // optional comment value that we import from our comment schema  
    // The ref property links the ObjectId to the comment model
    // This allows us to populate the News with an associated Article
    note: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", NewsSchema);

// Export the Article model
module.exports = Article;