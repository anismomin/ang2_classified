// import IPost from '../models/post/IPost';
// import {IPostModel, Post} from '../models/post/Post';


// export let getPosts = function() {
//     //return posts;
//     var posts = Post.find({}, function(err, posts): Array<IPostModel> {
//         //passing both err and user to next callback
//         (err) => err;
//         return posts;
//     });

//     return posts;
// }

// let posts: Array<IPostModel> = getPosts();

// export let getPostById = function(id) {
//     var posts = getPosts();

//     return posts.filter(function(post) {
//         return post._id === id;
//     })[0];
// }

// export let updatePost = function(id, post) {
//     var _post = getPostById(id),
//         key;

//     for (key in _post) {
//         if (_post.hasOwnProperty(key) && post.hasOwnProperty(key)) {
//             _post[key] = post[key];
//         }
//     }

//     return _post;
// }

// export let deletePost = function(id) {
//     var i;

//     for (i = 0; i < posts.length; i += 1) {
//         if (posts[i]._id === id) {
//             posts.splice(i, 1);
//             break;
//         }
//     }
// }

// export let createPost = function(post) {
//     var _post = getPostById(post._id);

//     if (typeof _post === 'undefined') {
//         posts.push(post);
//     } else {
//         throw new Error('Post with this id already exists');
//     }
// }