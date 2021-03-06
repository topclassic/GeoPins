const { gql } = require('apollo-server')

module.exports = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
    }

    type Pin {
        _id: ID
        title: String
        author: User
        comments: [Comment]
    }
    
    type Comment {
        text: String
        createAt: String
        author: User
    }

    type Query {
        me: User
    }
`