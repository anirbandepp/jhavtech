// *** Find the CEO (employee with no reporting manager)
const findRootEmployee = async (employees) => {
    return employees?.find(emp => emp?.reportingManager === null)
};

// *** Find employees who report to a specific manager
const findSubordinates = async (managerId, employees) => {
    return employees?.filter(emp => emp?.reportingManager === managerId)
};

export { findRootEmployee, findSubordinates };