// Example usage
const input = {
    name: 'Anirban',
    age: 25,
    department: {
        name: 'Full Stack Developer',
        section: 'Technical',
        branch: {
            name: 'Bangalore',
            timezone: 'IST',
            address: {
                city: 'xyz',
                address: 'test addrees'
            }
        }
    },
    company: {
        name: 'Jhavtech Studios'
    },
    skills: ['javascript', 'node.js', 'html']
};

function flattenObject(obj, prefix = '') {
    let result = {};

    // console.log(prefix);

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = prefix ? `${prefix}.${key}` : key;

            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                Object.assign(result, flattenObject(obj[key], newKey));

            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
}

console.log(flattenObject(input));
// flattenObject(input)