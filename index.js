
// don't use .env files in production
// they should be set directly on the host machine
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

