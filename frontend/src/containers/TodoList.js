import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import ManageEntities from "../utils/CRUD";


function TodoList() {
    return (
        <Layout title="Todo | Todo List" content="List Page">
            <h1 className="text-center text-white">ToDo List</h1>
            <ManageEntities inputs={['title', 'category', 'description', 'due_date']} entityName="task" apiEndpoint="/tasks"></ManageEntities>
        </Layout>
    )
}

export default TodoList;