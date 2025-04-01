

export const request = async (method, url, data, options = {}) => {

    if (method !== 'GET') {
        options.method = method
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        }
    }

    const responce = await fetch(url, options);

    if (!responce.ok) {
        throw await responce.json()
    }


    if (responce.status === 204) {
        return;
    }

    const result = await responce.json();

    return result
}