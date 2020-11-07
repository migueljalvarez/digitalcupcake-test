module.exports.jsonToBuffer = (msg) => {
  return JSON.stringify(msg)
}
module.exports.bufferToJson = (msg) => {
  return JSON.parse(msg.content.toString())
}
module.exports.formatLabel = (name) =>
  name
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-_:.]+/gi, '-')
