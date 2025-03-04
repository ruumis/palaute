const { Op } = require('sequelize')
const { sequelize } = require('../util/dbConnection')
const { FeedbackTarget, UserFeedbackTarget } = require('../models')
const logger = require('../util/logger')
const mangleData = require('./updateLooper')

const createEnrolmentTargets = async (enrolment) => {
  const {
    personId: userId,
    courseUnitRealisationId,
    studySubGroups,
  } = enrolment

  const subGroupIds = studySubGroups.map((group) => group.studySubGroupId)
  const subGroupFeedbackTargets = await FeedbackTarget.findAll({
    where: {
      [Op.or]: [
        {
          feedbackType: 'studySubGroup',
          typeId: {
            [Op.in]: subGroupIds,
          },
        },
        {
          feedbackType: 'courseRealisation',
          typeId: courseUnitRealisationId,
        },
      ],
    },
  })
  const subGroupTargets = subGroupFeedbackTargets.map((feedbackTarget) => ({
    accessStatus: 'STUDENT',
    userId,
    feedbackTargetId: feedbackTarget.id,
  }))
  return subGroupTargets
}

const enrolmentsHandler = async (enrolments) => {
  const userFeedbackTargets = []
  await enrolments.reduce(async (promise, enrolment) => {
    await promise
    userFeedbackTargets.push(...(await createEnrolmentTargets(enrolment)))
  }, Promise.resolve())
  try {
    await UserFeedbackTarget.bulkCreate(userFeedbackTargets, {
      ignoreDuplicates: true,
    })
  } catch (err) {
    logger.info('RUNNING TARGETS ONE BY ONE')
    userFeedbackTargets.reduce(
      async (promise, { userId, feedbackTargetId, accessStatus }) => {
        await promise
        try {
          await UserFeedbackTarget.findOrCreate({
            where: {
              userId,
              feedbackTargetId,
            },
            defaults: {
              userId,
              feedbackTargetId,
              accessStatus,
            },
          })
        } catch (_) {
          logger.error('ERR', {})
        }
      },
      Promise.resolve(),
    )
  }
}

const updateStudentFeedbackTargets = async () => {
  // Delete all old enrolments once a week sunday-monday night.
  // Delete only enrollments, not teacher relations
  if (new Date().getDay() === 1 && false) {
    logger.info('Deleting old enrolments', {})
    await sequelize.query(
      `DELETE FROM user_feedback_targets WHERE feedback_id IS NULL AND access_status = 'STUDENT'`,
    )
  }

  await mangleData('enrolments', 3000, enrolmentsHandler)
}

module.exports = updateStudentFeedbackTargets
