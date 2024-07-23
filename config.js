
const dotenv = require('dotenv');
const path = require('path');
const envVar = require('env-var');


const load = () => {
    const envPath = path.join(process.cwd(), `.env`);
    dotenv.config({ path: envPath });

    return {
        "environment": envVar.get('ENV_LEVEL').default('development').asString()?.toUpperCase(),
        "file.path.base": envVar.get('FILE_PATH').default('./src/assets').asString(),

        // Main app configurations
        "app.host": envVar.get('APP_HOST').default('0.0.0.0').asString(),
        "app.port": envVar.get('APP_PORT').default('8000').asString(),
        "app.route.base": envVar.get('APP_BASE_PATH').required().asString(),
        
        // Database server configurations
        "db.driver": envVar.get('DB_DRIVER').required().asString(),
        "db.address": envVar.get('DB_ADDRESS').required().asString(),
        "db.port": envVar.get('DB_PORT').default('').asString(),
        "db.username": envVar.get('DB_USER').default('').asString(),
        "db.password": envVar.get('DB_PASS').default('').asString(),
        "db.name": envVar.get('DB_NAME').required().asString(),

        // Other custom config
        "auth.secret": envVar.get('AUTH_KEY').required().asString(),
        "auth.ttl": envVar.get('AUTH_TTL').default(10).asIntPositive(),
        "pass.secret": envVar.get('PASS_KEY').required().asString(),
    

        // Redis
        'redis.expiration': envVar.get('REDIS_EXPIRATION').required().asString(),
    };
}

module.exports = load();