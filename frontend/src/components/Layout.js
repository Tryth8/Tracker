import {Helmet} from "react-helmet";
import '../assets/static/components.css'

import Header from "./Header";

const Layout = ({ title, content, children }) =>(
    <div className="layout">
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={content}/>
        </Helmet>
        <Header/>
        <div className="container">
            {children}
        </div>
    </div>
)

export default Layout
