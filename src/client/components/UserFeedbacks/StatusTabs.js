import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom'

const tabOrder = ['waitingForFeedback', 'feedbackGiven', 'feedbackClosed']

const StatusTab = ({ status, ...props }) => (
  <Tab component={Link} to={{ search: `?status=${status}` }} {...props} />
)

const StatusTabs = ({ status, ...props }) => {
  const index = tabOrder.indexOf(status)
  const value = index < 0 ? 0 : index
  const { t } = useTranslation()

  return (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      {...props}
    >
      <StatusTab
        label={t('userFeedbacks:waitingForFeedback')}
        status="waitingForFeedback"
      />
      <StatusTab
        label={t('userFeedbacks:feedbackGiven')}
        status="feedbackGiven"
      />
      <StatusTab
        label={t('userFeedbacks:feedbackClosed')}
        status="feedbackClosed"
      />
    </Tabs>
  )
}

export default StatusTabs
