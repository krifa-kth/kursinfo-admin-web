'use strict'

// const sanitize = require('sanitize-html')
const co = require('co')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const { filteredKoppsData } = require('../koppsApi')
const { toJS } = require('mobx')
const browserConfig = require('../configuration').browser
const serverConfig = require('../configuration').server
const i18n = require('../../i18n')

module.exports = {
  getAdminStart: co.wrap(_getAdminStart),
}

const serverPaths = require('../server').getPaths()

const LISTS_OF_PILOT_COURSES = [
  'SF1624',
  'SF1610',
  'MJ1112',
  'AH2029',
  'DD1390',
  'AF1721',
  'MH1026',
  'SH1015',
  'BB2290',
  'FAI3002'
]

function hydrateStores (renderProps) {
  // This assumes that all stores are specified in a root element called Provider

  const props = renderProps.props.children.props
  const outp = {}
  for (let key in props) {
    if (typeof props[key].initializeStore === 'function') {
      outp[key] = encodeURIComponent(JSON.stringify(toJS(props[key], true)))
    }
  }
  return outp
}

function _staticRender (context, location) {
  if (process.env.NODE_ENV === 'development') {
    delete require.cache[require.resolve('../../dist/app.js')]
  }
  const { staticRender } = require('../../dist/app.js')
  return staticRender(context, location)
}

async function _getAdminStart (req, res, next) {
  const courseCode = req.params.courseCode.toUpperCase()
  let lang = language.getLanguage(res) || 'sv'

  try {
    // Render inferno app
    const renderProps = _staticRender()
    // setBrowserConfig should be first because of setting paths for other next functions
    // Load browserConfig and server paths for internal api
    renderProps.props.children.props.adminStore.setBrowserConfig(browserConfig, serverPaths, serverConfig.hostUrl)
    renderProps.props.children.props.adminStore.__SSR__setCookieHeader(req.headers.cookie)
    renderProps.props.children.props.adminStore.isPilotCourse = checkIfPilotCourse(courseCode)
    
    // Load koppsData
    renderProps.props.children.props.adminStore.koppsData = await filteredKoppsData(courseCode, lang)

    const html = ReactDOMServer.renderToString(renderProps)
    res.render('course/index', {
      debug: 'debug' in req.query,
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      title: courseCode + ' | ' + i18n.messages[lang === 'en' ? 0 : 1].messages.title,
      description: i18n.messages[lang === 'en' ? 0 : 1].messages.description,
      html,
      paths: JSON.stringify(serverPaths),
      initialState: JSON.stringify(hydrateStores(renderProps))
    })
  } catch (error) {
    log.error('Error in _getAdminStart', { error })
    next(error)
  }
}

const checkIfPilotCourse = (courseCode) => LISTS_OF_PILOT_COURSES.includes(courseCode)