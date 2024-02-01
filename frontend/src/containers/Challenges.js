import Layout from "../components/Layout";

import ManageEntities from "../utils/CRUD";

function Challenges() {

    return (
        <Layout title="Todo | Challenges" content="Challenges Page">
            <h1 className="text-center text-white">Challenges</h1>
            <ManageEntities inputs={['title', 'days', 'amount', 'description']} entityName="challenge" apiEndpoint="/challenges"></ManageEntities>
        </Layout>
    )
}

export default Challenges;