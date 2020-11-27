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
    edit: function(newName, id) {
        return fetch(`/api/dictionary/${id}/edit`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            },
            body: JSON.stringify({
                name: newName
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
    deleteTerm: function(dictId, termId) {
        return fetch(`/api/dictionary/${dictId}/term/${termId}`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    },
    editTerm: function(dictId, termId, origin, transcription, translate) {
        return fetch(`/api/dictionary/${dictId}/term/${termId}/edit`, {
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
    increaseRightAnswer: function(dictId, termId) {
        return fetch(`/api/dictionary/${dictId}/term/${termId}/right`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    },
    increaseWrongAnswer: function(dictId, termId) {
        return fetch(`/api/dictionary/${dictId}/term/${termId}/wrong`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                ...userService.authHeader()
            }
        });
    }
}
