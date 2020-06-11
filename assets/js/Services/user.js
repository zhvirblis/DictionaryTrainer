export default {
    login: function(userName, password) {
        return fetch('/api/token', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        });
    },
    logout() {
        localStorage.removeItem("user");
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    },
    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.accessToken) {
            return { Authorization: 'Bearer ' + user.accessToken };
        } else {
            return {};
        }
    }
}