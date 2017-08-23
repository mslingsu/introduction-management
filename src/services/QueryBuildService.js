export default {
  build: function (data, opts) {
    opts = opts || {}
    var ignore = opts.ignore || []
    var query = Object.keys(data).filter(function (name) {
      return ignore.indexOf(name) < 0
    }).map(function (name) {
      return encodeURIComponent(name) + '=' + encodeURIComponent(data[name])
    })
    return query.join('&')
  }
}
