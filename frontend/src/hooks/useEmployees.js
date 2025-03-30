import { useState, useEffect } from 'react';

function useEmployees(apiUrl) {

    // *** State for employees data, loading, and error
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // *** Fetch employees data
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                let response = await fetch(apiUrl);
                const { result } = await response.json();
                setEmployees(result);
                setError(null);
            } catch (error) {
                console.log(error?.response?.data?.message);
                setError('Faild the fetch Employees');
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [apiUrl]);

    return { employees, loading, error };
}

export default useEmployees;