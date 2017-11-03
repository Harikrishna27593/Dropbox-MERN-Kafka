const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';


const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const dosignup = (payload) =>
    fetch(`${api}/dosignup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/upload`, {
        method: 'POST',
        body: payload,
         credentials:'include',
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const star = (payload) =>
    fetch(`${api}/star`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const Unstar = (payload) =>
    fetch(`${api}/unstar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const Share = (payload) =>
    fetch(`${api}/share`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const deletefile = (payload) =>
    fetch(`${api}/delete`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const getImages = () =>
    fetch(`${api}/getimg`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const showActivity = () =>
    fetch(`${api}/showActivity`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getDetails = () =>
    fetch(`${api}/getdetails`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const doprofile = (payload) =>
    fetch(`${api}/profile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const issessionexists = () =>
    fetch(`${api}/getuser`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });