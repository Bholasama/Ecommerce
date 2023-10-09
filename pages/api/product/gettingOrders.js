
import auth from '../../../middleware/auth';
import paidModels from "../../../models/paidModels";

const GetOrders = async(req, res) => {
    const result = await auth(req, res)
    const orders = await paidModels.find({user: result.id})
    res.json({
        orders,
        result: result
    })
    
    
}
 
export default GetOrders;