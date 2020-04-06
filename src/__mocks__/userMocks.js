import faker from 'faker';

module.exports = {
    getUserSuccessMock: {
        status: 200,
        response: [{
            login: faker.name.firstName(),
            id: faker.random.number(99999),
            url: faker.internet.url(),
            html_url: faker.internet.url(),
        }]
    },
    getUserError400Mock: {
        status: 400,
        message: 'Not Found'
    },
    getUserError401Mock: {
        status: 401,
        message: 'Unauthorized'
    }
}