var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .setManifestKeyPrefix('build/')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableReactPreset()
    .addEntry('js/app', './assets/js/app.jsx');


module.exports = Encore.getWebpackConfig();