const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const formatDate = date => {
  // let createdDate = dayjs(date).format('MMM D, YYYY at h:mm A ')

  let createdDate = dayjs(date).format('LLLL')
  return createdDate;
}

module.exports = formatDate

