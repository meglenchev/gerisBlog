import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String, 
        trim: true,
        required: [true, 'Title is required!'], 
        minLength: [5, 'Title should be at least 5 characters long!'],
    }, 
    imageUrl: {
        type: String, 
        trim: true,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image Url is invalid']
    },
    content: {
        type: String, 
        required: [true, 'Content is required!'],
        minLength: [10, 'Content should be at least 10 characters long!']
    }, 
    category: {
        type: String, 
        index: true,
        lowercase: true,
        trim: true,
        required: [true, 'Blog Category is required!'],
        minLength: [3, 'Blog Category should be at least 3 characters long!']
    },
    owner: { // Single Relation Property
        type: Types.ObjectId,
        ref: 'User', 
        required: [true, 'Blog should have creator!']
    }
}, { timestamps: true });

export const Blog = model('Blog', blogSchema, 'blogs');