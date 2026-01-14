import { Schema, model } from "mongoose";

const aboutSchema = new Schema({
    aboutImage: {
        type: String,
        trim: true,
        required: [true, 'About image is required!'],
        match: [/^https?:\/\//, 'About Image Url is invalid']
    }, 
    slogan: {
        type: String,
        trim: true,
        required: [true, 'Slogan is required!'],
        minLength: [5, 'Slogan should be at least 5 characters long!']
    }, 
    summary: {
        type: String,
        trim: true,
        required: [true, 'Summary is required!'],
        minLength: [10, 'Summary should be at least 10 characters long!']
    }, 
    info: {
        type: String,
        trim: true,
        required: [true, 'Info is required!'],
        minLength: [20, 'Info should be at least 10 characters long!']
    }
}, { timestamps: true, strict: true });

export const About = model('About', aboutSchema, 'abouts');