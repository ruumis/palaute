const dateFns = require('date-fns')

const {
  FeedbackTarget,
  CourseUnit,
  UserFeedbackTarget,
  CourseRealisation,
  CourseUnitsOrganisation,
} = require('../models')

const commonFeedbackName = {
  fi: 'Yleinen palaute kurssista',
  en: 'General feedback about the course',
  sv: '[SWEDISH, TODO]',
}

const formatDate = (date) => dateFns.format(date, 'yyyy-MM-dd')

const combineStudyGroupName = (firstPart, secondPart) => ({
  fi:
    firstPart.fi && secondPart.fi ? `${firstPart.fi}: ${secondPart.fi}` : null,
  en:
    firstPart.en && secondPart.en ? `${firstPart.en}: ${secondPart.en}` : null,
  sv:
    firstPart.sv && secondPart.sv ? `${firstPart.sv}: ${secondPart.sv}` : null,
})

const createCourseUnit = async (data) => {
  const sortedOrganisationIds = data.organisations
    .sort((a, b) => a.share - b.share)
    .map((org) => org.organisationId)
  await CourseUnit.upsert({
    id: data.id,
    name: data.name,
    courseCode: data.code,
    validityPeriod: data.validityPeriod,
  })
  const primaryId = sortedOrganisationIds.shift()
  await CourseUnitsOrganisation.findOrCreate({
    where: {
      type: 'PRIMARY',
      courseUnitId: data.id,
      organisationId: primaryId,
    },
    defaults: {
      type: 'PRIMARY',
      courseUnitId: data.id,
      organisationId: primaryId,
    },
  })
  await sortedOrganisationIds.reduce(async (promise, id) => {
    await promise
    await CourseUnitsOrganisation.findOrCreate({
      where: {
        type: 'DIRECT',
        courseUnitId: data.id,
        organisationId: id,
      },
      defaults: {
        type: 'DIRECT',
        courseUnitId: data.id,
        organisationId: id,
      },
    })
  }, Promise.resolve())
}

const makeCreateFeedbackTargetWithUserTargetTable = (accessStatus) => async (
  feedbackType,
  typeId,
  courseRealisationId,
  courseUnitId,
  name,
  endDate,
  startDate,
  userId,
) => {
  if (feedbackType === 'courseRealisation') {
    await CourseRealisation.upsert({
      id: courseRealisationId,
      endDate,
      startDate,
      name,
    })
  }

  const feedbackTargetName =
    feedbackType === 'courseRealisation' ? commonFeedbackName : name

  const hidden = !(feedbackType === 'courseRealisation')

  const [feedbackTarget] = await FeedbackTarget.findOrCreate({
    where: {
      feedbackType,
      typeId,
    },
    defaults: {
      feedbackType,
      typeId,
      courseUnitId,
      courseRealisationId,
      name: feedbackTargetName,
      hidden,
      opensAt: formatDate(dateFns.subDays(endDate, 14)),
      closesAt: formatDate(dateFns.addDays(endDate, 14)),
    },
  })
  await UserFeedbackTarget.findOrCreate({
    where: {
      userId,
      feedbackTargetId: Number(feedbackTarget.id),
    },
    defaults: {
      accessStatus,
      userId,
      feedbackTargetId: Number(feedbackTarget.id),
    },
  })
  return feedbackTarget
}

module.exports = {
  createCourseUnit,
  makeCreateFeedbackTargetWithUserTargetTable,
  combineStudyGroupName,
  formatDate,
}
