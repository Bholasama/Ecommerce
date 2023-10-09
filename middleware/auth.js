import jwt from 'jsonwebtoken';
import Users from '../models/userModel';

const auth = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({err: 'Invalid Authentication.'});

        // Handle different kinds of errors
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return res.status(400).json({err: 'Token is invalid or expired.'});
        }

        const user = await Users.findOne({_id: decoded.id});
        if (!user) return res.status(400).json({err: 'User does not exist.'});

        return {id: user._id, role: user.role, root: user.root};
    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        return res.status(500).json({err: 'Internal Server Error'});
    }
}

export default auth;
