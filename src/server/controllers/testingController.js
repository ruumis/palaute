const Router = require('express')

const _ = require('lodash')

const { FeedbackTarget, CourseRealisation, Organisation } = require('../models')
const { ApplicationError } = require('../util/customErrors')

const updateCourseRealisation = async (req, res) => {
  const { user } = req

  if (!user) throw new ApplicationError('No user found', 404)

  const { feedbackTargetId } = req.params

  const feedbackTarget = await FeedbackTarget.findByPk(Number(feedbackTargetId))

  if (!feedbackTarget)
    throw new ApplicationError('Feedback target not found', 404)

  const courseRealisation = await CourseRealisation.findByPk(
    feedbackTarget.courseRealisationId,
  )

  if (!courseRealisation)
    throw new ApplicationError('Course realisation not found', 404)

  const updates = _.pick(req.body, ['startDate', 'endDate'])

  Object.assign(courseRealisation, updates)

  await courseRealisation.save()

  Object.assign(feedbackTarget, {
    opensAt: updates.startDate,
    closesAt: updates.endDate,
  })

  await feedbackTarget.save()

  res.sendStatus(200)
}

const updateManyCourseRealisations = async (req, res) => {
  const { user } = req

  if (!user) throw new ApplicationError('No user found', 404)

  const { feedbackTargetIds } = _.pick(req.body, ['feedbackTargetIds'])

  const updates = _.pick(req.body, ['startDate', 'endDate'])

  /* eslint-disable */
  for (const id of feedbackTargetIds) {
    const feedbackTarget = await FeedbackTarget.findByPk(Number(id))

    if (!feedbackTarget)
      throw new ApplicationError('Feedback target not found', 404)

    const courseRealisation = await CourseRealisation.findByPk(
      feedbackTarget.courseRealisationId,
    )

    if (!courseRealisation)
      throw new ApplicationError('Course realisation not found', 404)

    Object.assign(courseRealisation, updates)

    await courseRealisation.save()
  }
  /* eslint-enable */

  res.send(200)
}

const enableAllCourses = async (_, res) => {
  await Organisation.update(
    {
      disabledCourseCodes: [],
    },
    { where: {} },
  )
  res.send(200)
}

const router = Router()

router.put('/courseRealisation/:feedbackTargetId', updateCourseRealisation)
router.put('/courseRealisations', updateManyCourseRealisations)
router.put('/enableCourses', enableAllCourses)

module.exports = router
