'use strict';
app
.service('OffersService',['_', function(_){

	var id_usuario = localStorage.getItem("id_user");
	var offersFavorites = (window.localStorage.offersFavorites)? JSON.parse(window.localStorage.offersFavorites) : [];
	function _favorite() {
		var arg = arguments[0];

		if(typeof arg === 'number'){ 
			offersFavorites = _.without(offersFavorites, _.findWhere(offersFavorites, {id: arg}));
		}

		if(typeof arg === 'object'){
			var existingPost = _.find(offersFavorites, function(post){ return post.id === arg.id; });

			if (!existingPost) {
				offersFavorites.push({
					id: arg.id,
					title : arg.offer_title,
					image : arg.offer_image,
					user: id_usuario,
				});
			}			
		}

		localStorage.offersFavorites = JSON.stringify(offersFavorites);
		return offersFavorites;
	}

	return{
		favorite: _favorite
		
	};

}]);
