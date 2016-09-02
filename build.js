var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    layouts    = require('metalsmith-layouts'),
    define     = require('metalsmith-define'),
    permalinks = require('metalsmith-permalinks'),
    css        = require('metalsmith-clean-css'),
    fingerprint= require('metalsmith-fingerprint'),
    inPlace    = require('metalsmith-in-place');

Metalsmith(__dirname)
    .source('./src')
    .use(define({
        Site: {
            url: '',
            title: 'Charles-Henri Decultot',
            description: 'Freelance Web-Developer and Enterprise Software Passionate'
        },
        googleAnalytics: '',
        owner: {
            url: '',
            name: ''
        },
        moment: require('moment')
    }))
    .use(markdown())
    //.use(permalinks())
    .use(css({
        files:"styles/**/*.css",
        cleanCSS: {
            rebase: true
        }
    }))
    //.use(fingerprint({
    //    pattern: 'styles/**/*'
    //}))
    .use(inPlace({
        engine: 'jade',
        pattern: '**/*.html'
    }))
    .use(layouts({
        engine: 'jade',
        directory: 'templates',
        pattern: '**/*.html'
    }))

    .destination('build')
    .build(function (err) {
        if(err) {
            console.log(err)
        }

         console.log('Build Completed!')
    })
