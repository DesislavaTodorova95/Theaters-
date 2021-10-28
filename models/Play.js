const mongoose= require('mongoose');
const PlaySchema = new mongoose.Schema({

title:{ type: String, required: true},
description:{ type: String, required: true, maxlength:50},
imageUrl:{ type: String, required: true},
public:{type: Boolean,  default: false},
createdAt:{type: Date, default: Date.now},
usersLiked:[{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
author: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
})
module.exports = mongoose.model('Play', PlaySchema)