import React from 'react';
import { Link } from 'react-router-dom';
import Layout from "../components/BaseLayout/Layout";

const PageNotFound = () => {
    return (
        <Layout>
            <div className="text-center">

                <h1 className="text-danger">404</h1>

                <h2 className="">Oops ! Page Not Found</h2>

                <Link to="/" className="">
                    Go Back
                </Link>
            </div>
        </Layout>
    )
}

export default PageNotFound;