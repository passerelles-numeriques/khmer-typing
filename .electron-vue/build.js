'use strict'

process.env.NODE_ENV = 'production'

const { say } = require('cfonts')
const chalk = require('chalk')
const del = require('del')
const webpack = require('webpack')
const Listr = require('listr')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
const webConfig = require('./webpack.web.config')

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '

if (process.env.BUILD_TARGET === 'clean') clean()
else if (process.env.BUILD_TARGET === 'web') web()
else build()

/**
 * Clean the build folder except the icons and conf
 */
function clean () {
  del.sync(['build/*',
            '!build/icons',
            '!build/icons/icon.*',
            '!build/win-store-conf',
            '!build/win-store-conf/*',
            '!build/win-store-conf/assets',
            '!build/win-store-conf/assets/*'
          ])
  console.log(`\n${doneLog}\n`)
  process.exit()
}

/**
 * Build the electron application (and not the web app)
 */
function build () {
  const {Observable} = require('rxjs');
  // Clean previous build attempts
  //del.sync(['dist/electron/*', '!.gitkeep'])
  let results = ''

  const tasks = new Listr([
    {
      title: 'Clean',
      task: () => {
        return new Observable(observer => {
          observer.next('Clean previous build attempts')
          del.sync(['dist/electron/*', '!.gitkeep'])
          observer.complete();
        })
      }
    },
    {
      title: 'Build',
      task: () => {
        return new Listr([{
          title: 'Build main',
          task: () => {
            return new Observable(observer => {
              observer.next('Launch WebPack')
              pack(mainConfig).then(result => {
                observer.next('Compiled successfully')
                results += result + '\n\n'
                observer.complete();
              }).catch(err => {
                console.log(`\n  ${errorLog}failed to build main process`)
                throw new Error(err)
              })
            })
          }
        },
        {
          title: 'Build renderer',
          task: () => {
            return new Observable(observer => {
              observer.next('Launch WebPack')
              pack(rendererConfig).then(result => {
                observer.next('Compiled successfully')
                results += result + '\n\n'
                observer.complete();
              }).catch(err => {
                console.log(`\n ${errorLog}failed to build renderer process`)
                throw new Error(err)
              })
            })
          }
        }], {concurrent: true})
      }
    }])

  tasks.run()
  .then(ctx => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\nResults:${results}`)
    console.log(`${okayLog}take it away ${chalk.yellow('`electron-builder`')}\n`)
  }).catch(err => {
    console.error(err)
  })
}

/**
 * Pack either the renderer or the main
 * @param {*} WebPack config 
 */
function pack (config) {
  return new Promise((resolve, reject) => {
    config.mode = 'production'
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
        .split(/\r?\n/)
        .forEach(line => {
          err += `    ${line}\n`
        })

        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}

/**
 * Build the web application
 */
function web () {
  del.sync(['dist/web/*', '!.gitkeep'])
  webConfig.mode = 'production'
  webpack(webConfig, (err, stats) => {
    if (err || stats.hasErrors()) console.log(err)

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))

    process.exit()
  })
}
