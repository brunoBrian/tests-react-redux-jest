import faker from 'faker';


module.exports = {
    getPostsSuccessMock: {
        status: 200,
        response: [{
            title: faker.lorem.lines(),
            body: faker.lorem.lines()
        },{
            title: faker.lorem.lines(),
            body: faker.lorem.lines()
        },{
            title: faker.lorem.lines(),
            body: faker.lorem.lines()
        }]
    },
    getPostsError400Mock: {
        status: 400,
        response: { data: 'Request failed' }
    },
    getPostsError401Mock: {
        status: 401,
        response: { data: 'Unauthorized' }
    }
}

// const aaaa = request => ({
//     status: 200,
//     response: [{
//         title: faker.lorem.lines(),
//         body: faker.lorem.lines()
//     },{
//         title: faker.lorem.lines(),
//         body: faker.lorem.lines()
//     },{
//         title: faker.lorem.lines(),
//         body: faker.lorem.lines()
//     }]
// });

// export default aaaa;