const API_URL = '/aluno';

export const userService = {
    login,
    logout,
};

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

function login(username, password) {
    let user = {};
    user.authdata = window.btoa(username + ':' + password);
    localStorage.setItem('user', JSON.stringify(user));
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...authHeader()
        }
    };

    return fetch(`${API_URL}/login`, requestOptions)
        .then(handleResponse)
        .then(mensagem => {
            return mensagem;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        if (!response.ok) {
            return Promise.reject("Senha ou Email inválido");
        }
        return text;
    });
}