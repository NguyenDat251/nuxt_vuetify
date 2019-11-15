import Vue from 'vue'
import default_config from '~/config/default.json'
import api_config from '~/config/api.json'
import production_config from '~/config/production.json'
import development_config from '~/config/development.json'
import _ from 'lodash'
const MOMENT_JS = require('moment');

let global_config;
global_config = _.merge(default_config, {
  api: api_config
})

if(process.env.NODE_ENV == 'development'){
  global_config = _.merge(default_config, development_config)
}else{
  global_config = _.merge(default_config, production_config)
}

Vue.prototype.$config = (key) => {
  let val = _.get(global_config, key, '')
  
  if (!val) console.warn(key, ' is empty in config file')
  return val || key
}

Vue.prototype.$api = (key) => {
  return Vue.prototype.$config("api.host") + "/" + Vue.prototype.$config(key);
}

Vue.prototype.$displayDateTime = function(datetime){
  if(!datetime){
    return "";
  }
  
  return MOMENT_JS(datetime).format('MMMM Do YYYY, h:mm a');
}

Vue.prototype.$convertJSDateToSQL = function(datetime){
  if(!datetime){
    return "";
  }
  
  return MOMENT_JS(datetime).format('YYYY/MM/DD kk:mm:00');
}

Vue.prototype.$convertSQLtoJSDate = function(datetime){
  if(!datetime){
    return null;
  }

  ///return new Date(datetime);
  return new Date(MOMENT_JS(datetime).zone(0).toDate(0).toUTCString().split('GMT')[0]);
}