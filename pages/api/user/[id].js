import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await updateRole(req, res)
            break;
        
        case "DELETE":
            await deleteUser(req, res)
            break;
    }
}

const updateRole = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin' || !result.root) 
        return res.status(400).json({err: 'Authentication is not valid.'})
        const {id} = req.query
        const {role} = req.body
        await Users.findByIdAndDelete({_id: id}, {role})
        res.json({msg: 'Update Success!'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteUser = async (req, res) => {
    console.log("deleteUser endpoint accessed with ID:", req.query.id);
    try {
        const {id} = req.query;

        // Debugging: log the ID
        console.log("Received delete request for ID:", id);

        await Users.findByIdAndDelete(id);
        res.json({msg: 'Deleted a User'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({err: err.message});
    }
};
