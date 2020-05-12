const graphql = require('graphql');
const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');

const{
        GraphQLObjectType , 
        GraphQLString , 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
    } = graphql;
const _=require('lodash');  //for search algo

//dummy data
/*
let books = [
    {name : 'Name of the wind' , genre: 'Fantasy' , id: '1' , authorid: '1'},
    {name : 'The Final Empire' , genre: 'Fantasy' , id: '2' , authorid : '2'},
    {name : 'The Long Earth' , genre: 'Sci-Fi' , id: '3' , authorid : '3'},
    {name : 'The Hero of Ages' , genre: 'Fantasy' , id: '4' , authorid : '2'},
    {name : 'The Colour of Magoc' , genre: 'Fantasy' , id: '5' , authorid : '3'},
    {name : 'The Light Fantastic' , genre: 'Fantasy' , id: '6' , authorid : '3'}
];
let authors = [
    {name: 'Patrick Rothfuss' , age: 44 ,id: '1'},
    {name: 'Bradson Sanderson' , age: 42 ,id: '2'},
    {name: 'Terry Partchett' , age: 66 ,id: '3'}
]; 
*/

//---------create object type---------

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        author : {
            type : AuthorType, //its not define yet , therefore we use a func in fields
            resolve(parent, args){
                console.log("author parent : ",parent);
                //return _.find(authors, { id: parent.authorid});
                return Author.findById(parent.authorid);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id: {type:GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, { authorid : parent.id});
                return Book.find({ authorid : parent.id });
            }
        }
    })
});

//------------creating queries-----------------
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id:{type : GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                console.log("book parent : ",parent);
                //return _.find(books , {id : args.id}); //we habe access to all parameters of books
                return Book.findById(args.id);
            }
        },
        author : {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //return _.find(authors, {id:args.id})
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent , args){
                //return books;
                return Book.find({});
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors;
                return Author.find({});
            }
        }
    }
});

//---------------------mutation----------------
const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor: {
            type : AuthorType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent , args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
                return author.save();               
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                genre : { type : new GraphQLNonNull(GraphQLString) },
                authorid : { type : new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent , args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorid : args.authorid
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});