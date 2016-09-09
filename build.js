'use strict';

var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    layouts    = require('metalsmith-layouts'),
    define     = require('metalsmith-define'),
    permalinks = require('metalsmith-permalinks'),
    css        = require('metalsmith-clean-css'),
    fingerprint= require('metalsmith-fingerprint'),
    inPlace    = require('metalsmith-in-place'),
    multiLanguage = require('metalsmith-multi-language'),
    i18n = require('metalsmith-i18n'),
    collections = require('metalsmith-collections'),
    highlighter = require('highlighter');

const DEFAULT_LOCALE = 'en';
const LOCALES = ['fr', 'en'];

Metalsmith(__dirname)
    .source('src')
    .destination('dist')
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
    .use(collections({
        'content_en': 'content/*_en.md',
        'content_fr': 'content/*_fr.md',
        'articles_en': {
            pattern: 'articles/**/*_en.md',
            sortBy: 'date',
            reverse: true
        },
        'articles_fr': {
            pattern: 'articles/**/*_fr.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(multiLanguage({
        default: DEFAULT_LOCALE,
        locales: LOCALES
    }))

    .use(i18n({
        default: DEFAULT_LOCALE,
        locales: LOCALES,
        directory: 'locales'
    }))

    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true,
        highlight: highlighter()
    }))
    .use(permalinks({
        relative: false,
        pattern: ':locale/:title/',
        linksets: [{
            match: { collection: 'content_en' },
            pattern: ':locale/content/:title/'
        }, {
            match: { collection: 'content_fr' },
            pattern: ':locale/content/:title/'
        }, {
            match: { collection: 'articles_en' },
            pattern: ':locale/articles/:title/'
        }, {
            match: { collection: 'articles_fr' },
            pattern: ':locale/articles/:title/'
        }]
    }))
    .use(css({
        files:"styles/**/*.css",
        cleanCSS: {
            rebase: true
        }
    }))

    .use(inPlace({
        engine: 'jade',
        pattern: '**/*.html'
    }))
    .use(layouts({
        engine: 'jade',
        directory: 'templates',
        pattern: '**/*.html'
    }))

    .build(function (err) {
        if(err) {
            console.log(err)
        }

         console.log('Build Completed!')
    })
