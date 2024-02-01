import React from 'react'
import '../assets/static/NotFound.css';
import Layout from "../components/Layout";
const NotFound = (props) => {
    return (
        <Layout title="Todo | Not Found" content="Not Found Page" className="not-found">
            <h3>OOPS! PAGE NOT FOUND</h3>
            <h1 className="not-found-text1">404</h1>
            <h2 className="not-found-text2">WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h2>
        </Layout>
    )
}

export default NotFound
