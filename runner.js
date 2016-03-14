require('./starter');

if (process.env.NODE_ENV == 'server'){
    require('./src/main');
} else if (process.env.NODE_ENV == 'build'){
    require('./webpack.run');
} else if (process.env.NODE_ENV == 'smoke'){
    require('./test/smoke');
}