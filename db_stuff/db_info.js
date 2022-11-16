
let table_names = [
	'Users',
	'PlantPosts',
	'PlantStatuses',
	'PlantTypes',
	'PlantSafetyStatuses',
	'UserPlantRatings'
]

let schemas = {
	'Users': {
		'user_id': {type: 'int', primary: true, auto_increment: true},
		'username': {type: 'string'},
		'plant_points': {type: 'int'},
		'date_joined': {type: 'date'},
		'email': {type: 'string'},
		'password_hash': {type: 'string'}
	},
	'PlantPosts': {
		'plant_post_id': {type: 'int', primary: true, auto_increment: true},
		'plant_type_id': {type: 'int', foreign_key: true, foreign_table: 'PlantTypes'},
		'plant_status_id': {type: 'int', foreign_key: true, foreign_table: 'PlantStatuses'},
		'plant_safety_status_id': {type: 'int', foreign_key: true, foreign_table: 'PlantSafetyStatuses'},
		'user_id': {type: 'int', foreign_key: true, foreign_table: 'Users'},
		'plant_post_date': {type: 'date'},
		'plant_post_description': {type: 'string'},
		'plant_post_image': {type: 'string'},
		'plant_post_location': {
			type: 'object',
			properties: {
				'latitude': {type: 'float'},
				'longitude': {type: 'float'}
			}
		},
	},
	'PlantStatuses': {
		'plant_status_id': {type: 'int', primary: true, auto_increment: true},
		'plant_status_name': {type: 'string'}
	},
	'PlantTypes': {
		'plant_type_id': {type: 'int', primary: true, auto_increment: true},
		'plant_type_name': {type: 'string'},
		'plant_type_description': {type: 'string'}
	},
	'PlantSafetyStatuses': {
		'plant_safety_status_id': {type: 'int', primary: true, auto_increment: true},
		'plant_safety_status_name': {type: 'string'},
		'plant_safety_status_description': {type: 'string'}
	},
	'UserPlantRatings': {
		'user_plant_rating_id': {type: 'int', primary: true, auto_increment: true},
		'user_id': {type: 'int', foreign_key: true, foreign_table: 'Users'},
		'plant_post_id': {type: 'int', foreign_key: true, foreign_table: 'PlantPosts'},
		'user_plant_rating': {type: 'int'},
		'user_plant_rating_date': {type: 'date'},
		'user_plant_rating_comment': {type: 'string'},
		'safety_agreement': {type: 'boolean'}
	},
}

module.exports = {
    table_names: table_names,
    schemas: schemas
}