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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Bvc3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0QztBQUM1Qyx3REFBd0Q7QUFHeEQscUNBQXFDO0FBQ3JDLHNCQUFzQjtBQUN0QiwwRUFBMEU7QUFDMUUsdURBQXVEO0FBQ3ZELHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsVUFBVTtBQUVWLG9CQUFvQjtBQUNwQixJQUFJO0FBRUosNkNBQTZDO0FBRTdDLDBDQUEwQztBQUMxQyw4QkFBOEI7QUFFOUIsMkNBQTJDO0FBQzNDLGtDQUFrQztBQUNsQyxhQUFhO0FBQ2IsSUFBSTtBQUVKLCtDQUErQztBQUMvQyxtQ0FBbUM7QUFDbkMsZUFBZTtBQUVmLDJCQUEyQjtBQUMzQix1RUFBdUU7QUFDdkUsc0NBQXNDO0FBQ3RDLFlBQVk7QUFDWixRQUFRO0FBRVIsb0JBQW9CO0FBQ3BCLElBQUk7QUFFSix5Q0FBeUM7QUFDekMsYUFBYTtBQUViLDhDQUE4QztBQUM5QyxxQ0FBcUM7QUFDckMsa0NBQWtDO0FBQ2xDLHFCQUFxQjtBQUNyQixZQUFZO0FBQ1osUUFBUTtBQUNSLElBQUk7QUFFSiwyQ0FBMkM7QUFDM0MseUNBQXlDO0FBRXpDLDBDQUEwQztBQUMxQyw0QkFBNEI7QUFDNUIsZUFBZTtBQUNmLCtEQUErRDtBQUMvRCxRQUFRO0FBQ1IsSUFBSSIsImZpbGUiOiJzZXJ2aWNlcy9wb3N0U2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBJUG9zdCBmcm9tICcuLi9tb2RlbHMvcG9zdC9JUG9zdCc7XG4vLyBpbXBvcnQge0lQb3N0TW9kZWwsIFBvc3R9IGZyb20gJy4uL21vZGVscy9wb3N0L1Bvc3QnO1xuXG5cbi8vIGV4cG9ydCBsZXQgZ2V0UG9zdHMgPSBmdW5jdGlvbigpIHtcbi8vICAgICAvL3JldHVybiBwb3N0cztcbi8vICAgICB2YXIgcG9zdHMgPSBQb3N0LmZpbmQoe30sIGZ1bmN0aW9uKGVyciwgcG9zdHMpOiBBcnJheTxJUG9zdE1vZGVsPiB7XG4vLyAgICAgICAgIC8vcGFzc2luZyBib3RoIGVyciBhbmQgdXNlciB0byBuZXh0IGNhbGxiYWNrXG4vLyAgICAgICAgIChlcnIpID0+IGVycjtcbi8vICAgICAgICAgcmV0dXJuIHBvc3RzO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgcmV0dXJuIHBvc3RzO1xuLy8gfVxuXG4vLyBsZXQgcG9zdHM6IEFycmF5PElQb3N0TW9kZWw+ID0gZ2V0UG9zdHMoKTtcblxuLy8gZXhwb3J0IGxldCBnZXRQb3N0QnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4vLyAgICAgdmFyIHBvc3RzID0gZ2V0UG9zdHMoKTtcblxuLy8gICAgIHJldHVybiBwb3N0cy5maWx0ZXIoZnVuY3Rpb24ocG9zdCkge1xuLy8gICAgICAgICByZXR1cm4gcG9zdC5faWQgPT09IGlkO1xuLy8gICAgIH0pWzBdO1xuLy8gfVxuXG4vLyBleHBvcnQgbGV0IHVwZGF0ZVBvc3QgPSBmdW5jdGlvbihpZCwgcG9zdCkge1xuLy8gICAgIHZhciBfcG9zdCA9IGdldFBvc3RCeUlkKGlkKSxcbi8vICAgICAgICAga2V5O1xuXG4vLyAgICAgZm9yIChrZXkgaW4gX3Bvc3QpIHtcbi8vICAgICAgICAgaWYgKF9wb3N0Lmhhc093blByb3BlcnR5KGtleSkgJiYgcG9zdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4vLyAgICAgICAgICAgICBfcG9zdFtrZXldID0gcG9zdFtrZXldO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIF9wb3N0O1xuLy8gfVxuXG4vLyBleHBvcnQgbGV0IGRlbGV0ZVBvc3QgPSBmdW5jdGlvbihpZCkge1xuLy8gICAgIHZhciBpO1xuXG4vLyAgICAgZm9yIChpID0gMDsgaSA8IHBvc3RzLmxlbmd0aDsgaSArPSAxKSB7XG4vLyAgICAgICAgIGlmIChwb3N0c1tpXS5faWQgPT09IGlkKSB7XG4vLyAgICAgICAgICAgICBwb3N0cy5zcGxpY2UoaSwgMSk7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuLy8gZXhwb3J0IGxldCBjcmVhdGVQb3N0ID0gZnVuY3Rpb24ocG9zdCkge1xuLy8gICAgIHZhciBfcG9zdCA9IGdldFBvc3RCeUlkKHBvc3QuX2lkKTtcblxuLy8gICAgIGlmICh0eXBlb2YgX3Bvc3QgPT09ICd1bmRlZmluZWQnKSB7XG4vLyAgICAgICAgIHBvc3RzLnB1c2gocG9zdCk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3N0IHdpdGggdGhpcyBpZCBhbHJlYWR5IGV4aXN0cycpO1xuLy8gICAgIH1cbi8vIH0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
