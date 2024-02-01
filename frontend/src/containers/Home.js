import '../assets/static/Home.css';
import Layout from "../components/Layout";
import {Link} from "react-router-dom";
import {Bubbles} from "../components/components";

function Home() {
    return (
        <Layout title="Todo | Home" content="Home Page">
            {/*<div className="spinner"></div>*/}
            <div className="homepage">
                <div className="get-started d-flex flex-column justify-content-center align-items-center">
                    <p className="lead text-center">Welcome on MyTracker Website</p>
                    <Link to="/login" className="btn btn-primary">Get Started</Link>
                </div>
                {/*<div className="features">*/}
                {/*    <h2 className="text-center">Features</h2>*/}
                {/*    <Bubbles></Bubbles>*/}
                {/*</div>*/}
                {/*<div className="send-message">*/}
                {/*    <h2 className="text-center">Send message</h2>*/}
                {/*</div>*/}
            </div>
        </Layout>
    )
}

export default Home;
