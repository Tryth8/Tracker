import {useEffect, useState} from "react";
import useAxios from "../utils/useAxios";
import Layout from "../components/Layout";

function Profile(){
    const [user, setUser] = useState([]);
    const api = useAxios();

    useEffect(() => {
        getEntities();
    }, []);

    const getEntities = async () => {
        const response = await api.get(`/get_user_info/`);
        if (response.status === 200) {
            setUser(response.data);
        }
    };

    return(
        <Layout title="Todo | Profile" content="Profile Page" >
            <div className="text-white">
                <h1>Profile</h1>
                <h3>{user.email}</h3>
            </div>
        </Layout>
    )
}

export default Profile