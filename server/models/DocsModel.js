const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

docsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const DocsModel = mongoose.model('Docs', docsSchema);
module.exports = DocsModel;
