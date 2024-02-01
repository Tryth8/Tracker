import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import ManageEntities from "../utils/CRUD";
function Skills() {

    return (
        <Layout title="Todo | Skills" content="Skills Page">
            <h1 className="text-center text-white">Skills</h1>
            <ManageEntities inputs={['title', 'levels', 'learning_time']} entityName="skill" apiEndpoint="/skills"></ManageEntities>
        </Layout>
    )

}

export default Skills;