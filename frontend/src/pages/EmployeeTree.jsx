import { Suspense } from 'react';
import '../../src/App.css';

import Layout from "../components/BaseLayout/Layout";

import useEmployees from "../hooks/useEmployees";

const EmployeeTree = () => {

    const { employees, loading, error } = useEmployees(`${import.meta.env.VITE_BACKEND_URL}/employee/get`);

    // *** Find the CEO (employee with no reporting manager)
    const findRootEmployee = () => employees?.find(emp => emp?.reportingManager === null);

    // *** Find employees who report to a specific manager
    const findSubordinates = (managerId) => employees?.filter(emp => emp?.reportingManager === managerId);

    // *** Recursive component to render an employee and their subordinates
    const renderEmployee = (employee) => {

        const subordinates = findSubordinates(employee?._id);

        return (
            <li key={employee?._id}>
                <div className={`employee-card ${employee?.designation === 'CEO' ? 'topCard' : ''}`}>
                    <div className="employee-image">
                        <Suspense fallback={<div>Loading image...</div>}>
                            <img
                                src={`${employee?.image}`}
                                alt={employee?.name}
                                loading="lazy"
                                width="50" height="50"
                            />
                        </Suspense>
                    </div>
                    <div className="employee-details">
                        <div className="employee-name">{employee?.name}</div>
                        <div className="employee-designation">{employee?.designation}</div>
                    </div>
                </div>

                {subordinates?.length > 0 && (
                    <ul className={`subordinates ${subordinates.length}`} style={{
                        paddingTop: subordinates.length == 1 && '20px'
                    }}>
                        {subordinates?.map(subordinate => renderEmployee(subordinate))}
                    </ul>
                )}
            </li>
        );
    };

    // *** Find Root Master CEO
    const rootEmployee = findRootEmployee();

    if (loading) return <Layout>Loading employees...</Layout>;
    if (error) return <Layout>Error: {error}</Layout>;

    return (
        <Layout>
            <section className="container">
                <div className="org-tree-container">
                    <h1>Organization Hierarchy</h1>
                    <div className="org-tree">
                        <ul className="tree">
                            {rootEmployee ? renderEmployee(rootEmployee) : <p>No CEO found</p>}
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default EmployeeTree;