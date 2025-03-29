export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: credentials.email,
            password: credentials.password,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur de connexion');
    }

    return response.json();
};


export const registerUser = async (userData) => {
    const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            is_botanist: userData.is_botanist || false
        }),
        credentials: 'include',
        mode: 'cors'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Erreur lors de la création du compte");
    }

    return response.json();
};