'use strict';
app
.service('NewsService',['_', function(_){

	var id_usuario = localStorage.getItem("id_user");
	var newsFavorites = (window.localStorage.newsFavorites)? JSON.parse(window.localStorage.newsFavorites) : [];
	function _favorite() {
		var arg = arguments[0];

		if(typeof arg === 'number'){ 
			newsFavorites = _.without(newsFavorites, _.findWhere(newsFavorites, {id: arg}));
		}

		if(typeof arg === 'object'){
			var existingPost = _.find(newsFavorites, function(post){ return post.id === arg.id; });

			if (!existingPost) {
				newsFavorites.push({
					id: arg.id,
					title : arg.news_title,
					image : arg.news_image,
					user: id_usuario,
				});
			}			
		}

		localStorage.newsFavorites = JSON.stringify(newsFavorites);
		return newsFavorites;
	}

	return{
		favorite: _favorite
		
	};

}]);
