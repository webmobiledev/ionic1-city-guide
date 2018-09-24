'use strict';
app
.service('PlacesService',['_', function(_){

	var id_usuario = localStorage.getItem("id_user");
	var placesFavorites = (window.localStorage.placesFavorites)? JSON.parse(window.localStorage.placesFavorites) : [];
	function _favorite() {
		var arg = arguments[0];

		if(typeof arg === 'number'){ 
			placesFavorites = _.without(placesFavorites, _.findWhere(placesFavorites, {id: arg}));
		}

		if(typeof arg === 'object'){
			var existingPost = _.find(placesFavorites, function(post){ return post.id === arg.id; });

			if (!existingPost) {
				placesFavorites.push({
					id: arg.id,
					title : arg.place_name,
					image : arg.place_image,
					user: id_usuario,
				});
			}			
		}

		localStorage.placesFavorites = JSON.stringify(placesFavorites);
		return placesFavorites;
	}

	return{
		favorite: _favorite
		
	};

}]);
