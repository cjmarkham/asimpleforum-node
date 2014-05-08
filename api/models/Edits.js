/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

    tableName: 'edits',

    attributes: {
        
        postId: {
            model: 'Post'
        },
        user: {
            model: 'User'
        },
        old: 'text'
    }

};
