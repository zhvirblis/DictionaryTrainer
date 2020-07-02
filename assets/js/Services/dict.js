import userService from './user';

export default {
    get: function() {
        return fetch('/api/dictionary', {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    },
    add: function(name) {
        return fetch('/api/dictionary', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            },
            body: JSON.stringify({
                name: name
            })
        });
    }
}