import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    root:{
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dyfawgloj/image/upload/v1668937782/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396_nqq1vg.jpg'
    }
}, {
    timestamps: true

})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset