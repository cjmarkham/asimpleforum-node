/**
 * HomeController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	index: function (req, res) {

		var parentId = 0,
			forums = {},
			subforums = {},
			parents = {};

		var rootData = {
			forumId: 0
		};

		var branchRoot = rootData.forumId;

		Forum.find()
			.populate('lastTopic')
			.populate('lastPost')
			.populate('lastAuthor')
		.done(function (error, results) {

			for (var i in results) {

				var value = results[i];
				var forumId = value.id;

				if (value.parent == rootData.forumId || value.parent == branchRoot) {
					var parentId = forumId;

					forums[forumId] = value;

					if (value.parent == rootData.forumId) {
						branchRoot = forumId;
					}
				}				

			}

			for (var j in forums) {

				var value = forums[j];

				if (value.parent == rootData.forumId) {
					parents[value.id] = value;

					continue;
				}

				var forumId = value.id;
				var subforumList = [];
		
				if (subforums.hasOwnProperty(forumId)) {

					for (var k in subforums[forumId]) {
						var subforumRow = subforums[forumId][k];

						if (subforumRow.hasOwnProperty('name')) {
							subforumList.push(subforumRow);
						} else {
							delete subforums[forumId][k];
						}
					}

				}	

				if (!parents[value.parent].hasOwnProperty('forums')) {
					parents[value.parent].forums = {};
				}

				parents[value.parent].forums[value.id] = value;

				if (subforums.hasOwnProperty(value.id)) {
					parents[value.parent].forums[value.id].forums = subforums[value.id];
				}			

			}

			res.view({
				title: 'Home',
				section: 'index',
				forums: parents
			});

		});

	}

};
