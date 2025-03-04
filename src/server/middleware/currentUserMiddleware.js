const { ApplicationError } = require('../util/customErrors')
const { ADMINS } = require('../util/config')
const { User } = require('../models')

const isSuperAdmin = (username) => ADMINS.includes(username)

const fetchUserDataFromLoginAsForHeaders = async (headers) => {
  if (!isSuperAdmin(headers.uid)) return headers

  const loggedInAs = headers['x-admin-logged-in-as']
  if (!loggedInAs) return headers

  const newHeaders = { ...headers }
  const user = await User.findOne({ where: { id: loggedInAs } })

  if (!user) return headers
  newHeaders.employeeNumber = user.employeeNumber
  newHeaders.uid = user.username
  newHeaders.givenname = user.firstName
  newHeaders.sn = user.lastName
  newHeaders.mail = user.email
  newHeaders.preferredlanguage = user.language
  newHeaders.hypersonsisuid = user.id
  newHeaders.schacpersonaluniquecode = user.studentNumber
  return newHeaders
}

const upsertUser = async ({
  uid,
  givenname,
  sn,
  mail,
  preferredlanguage,
  hypersonsisuid,
  schacpersonaluniquecode,
}) => {
  const items = schacpersonaluniquecode
    ? schacpersonaluniquecode.split(':')
    : null

  const studentNumber = items ? items[items.length - 1] : null
  const [user] = await User.upsert({
    id: hypersonsisuid,
    firstName: givenname,
    lastName: sn,
    email: mail,
    language: preferredlanguage,
    username: uid,
    studentNumber,
  })
  return user
}

const currentUserMiddleware = async (req, _, next) => {
  const { uid: username } = req.headers
  if (!username) throw new ApplicationError('Missing uid header', 403)

  req.headers = await fetchUserDataFromLoginAsForHeaders(req.headers)

  req.user = await upsertUser(req.headers)
  req.isAdmin = isSuperAdmin(req.user.username)
  return next()
}

module.exports = currentUserMiddleware
