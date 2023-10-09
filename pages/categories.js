import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { DataContext } from '../store/GlobalState';
import { postData, putData } from "../utils/fetchData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
    const [name, setName] = useState('');
    const {state, dispatch} = useContext(DataContext);
    const { categories, auth } = state;
    const [id, setId] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // Assuming you have a function to fetch categories, trigger it on reload.
        // fetchCategories(); // Uncomment and replace this with actual function call.
    }, [reload]);

    const createCategory = async () => {
        try {
            // Check for name and id and accordingly call postData or putData functions
            let res;
            if (id) {
                // Update category
                res = await putData(`categories/${id}`, {name}, auth.token);
            } else {
                // Create category
                res = await postData('categories', {name}, auth.token);
            }

            if (res.err) throw new Error(res.err);
            
            // Reset name and id
            setName('');
            setId('');
            setReload(!reload); // Trigger reload
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleEditCategory = (category) => {
        setId(category._id);
        setName(category.name);
    };
    const handleDeleteCategory = async (categoryId) => {
        try {
            console.log('Attempting to delete:', categoryId);
            if (!confirm("Do you want to delete this category?")) return;
    
            const res = await fetch(`/api/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
    
            const data = await res.json();
            
            if (!res.ok) {
                console.error('Error data:', data); // For Debugging
                // Add your UI error handling here
                return;
            }
    
            console.log('Delete success:', data); // For Debugging
            // Update UI upon successful deletion
    
        } catch (err) {
            console.error('Delete operation error:', err.message); 
            alert('Error during deletion: ' + err.message);
            // For Debugging
            // Handle fetch or network errors here
        }
    };
    
    

    return (
        <div className="col-md-6 mx-auto my-3">
            <Head>
                <title>Categories</title>
            </Head>
            <div className="input-group mb-3">
                <input type="text" className="form-control" 
                       placeholder="Add a new category" value={name}
                       onChange={e => setName(e.target.value)} />
                <button className="btn btn-secondary ml-1"
                        onClick={createCategory}>
                    { id ? "Update" : "Create" }
                </button>
            </div>
            {
                categories && categories.map(category => (
                    <div key={category._id} className="card my-2 text-capitalize">
                        <div className="card-body d-flex justify-content-between">
                            {category.name}
                            <div style={{cursor: 'pointer'}}>
                                <FontAwesomeIcon icon={faEdit} className="mr-2 text-info" onClick={() => handleEditCategory(category)} />
                                <FontAwesomeIcon icon={faTrashAlt} className="text-danger" onClick={() => handleDeleteCategory(category._id)} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Categories;
