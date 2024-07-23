const { createClient } = require ('redis')
const config = require('../config')

module.exports = class Redis {
	static client = null

	static async createInstance () {
		// Connect to Redis
	}

	static async get(key){
		// Get data from Redis
	}

	static async setEx(key, data){
		// Set data in Redis with expiration
	}

}