import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";

const Users = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth, users, modal } = state;

    if (!auth.user) return null;
    const handleDelete = async (id) => {
        console.log("handleDelete called with ID:", id);

    
        try {
            // Ensure the URL is correct
            const response = await fetch(`/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if needed
                },
            });
           window.location.href=""; 

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    

    return (
        <div className="table-responsive">
            <Head>
                <title>Users</title>
            </Head>
            <table className="table w-100">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={user._id} style={{ cursor: 'pointer' }}>
                                <td>{index + 1}</td>
                                <td>{user._id}</td>
                                <td>
                                    <img src={user.avatar} alt={user.avatar}
                                        style={{ width: '30px', height: '30px', overflow: 'hidden', objectFit: 'cover' }} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? '✔️' : '❌'}
                                </td>
                                <td>
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(user._id)} title="Delete User">
                                        🗑️
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Users;
