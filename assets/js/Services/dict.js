import userService from './user';

export default {
    getInfo: function(id) {
        return fetch(`/api/dictionary/${id}`, {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    },
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
    },
    addTerm: function(id, origin, transcription, translate) {
        return fetch(`/api/dictionary/${id}/term`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            },
            body: JSON.stringify({
                origin,
                transcription,
                translate
            })
        });
    },
    deleteDict: function(id) {
        return fetch(`/api/dictionary/${id}`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    },
    deletetTerm: function(id) {
        return fetch(`/api/dictionary/${id}/term/${id}`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    },

}