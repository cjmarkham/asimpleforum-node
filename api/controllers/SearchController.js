/**
 * SearchController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

    get: function (req, res) {
        var query = req.param('query');

        Post.find({
            where: {
                or: [{
                    name: {
                        contains: query
                    }                    
                }, {
                    raw: {
                        contains: query
                    }
                }]
            }
        })
        .populate('author')
        .populate('topic')
        .populate('forum')
        .populate('likes')
        .sort({ createdAt: 'desc' })
        .exec(function (error, posts) {
            if (error) {
                return res.json({
                    error: res.__(error.summary)
                }, 400);
            }

            return res.view({
                title: 'Search - ' + query,
                section: 'search',
                query: query,
                posts: posts,
                layout: req.xhr ? '../layout-ajax.swig' : '../layout.swig'
            });
        });
    }  

};
