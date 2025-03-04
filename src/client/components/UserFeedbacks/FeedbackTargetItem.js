import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { lightFormat, parseISO } from 'date-fns'
import cn from 'classnames'

import {
  Box,
  Button,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  ListItem,
  makeStyles,
} from '@material-ui/core'

import FeedbackGivenIcon from '@material-ui/icons/Check'
import NoFeedbackIcon from '@material-ui/icons/Edit'
import FeedbackClosedIcon from '@material-ui/icons/Lock'

import { useQueryClient } from 'react-query'
import feedbackTargetIsOpen from '../../util/feedbackTargetIsOpen'
import apiClient from '../../util/apiClient'
import feedbackTargetIsEnded from '../../util/feedbackTargetIsEnded'

const useStyles = makeStyles({
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

const useActionButtonStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
}))

const ActionButton = ({ className, ...props }) => {
  const classes = useActionButtonStyles()

  return <Button className={cn(className, classes.button)} {...props} />
}

const NoFeedbackActions = ({ editPath }) => {
  const { t } = useTranslation()

  return (
    <ActionButton
      variant="contained"
      color="primary"
      to={editPath}
      component={Link}
    >
      {t('userFeedbacks:giveFeedbackButton')}
    </ActionButton>
  )
}

const FeedbackGivenActions = ({ editPath, onDelete, viewPath }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleSubmit = async () => {
    onDelete()
    handleClose()
  }

  return (
    <>
      <ActionButton
        color="primary"
        variant="contained"
        component={Link}
        to={editPath}
      >
        {t('userFeedbacks:modifyFeedbackButton')}
      </ActionButton>

      <ActionButton
        color="primary"
        variant="contained"
        component={Link}
        to={viewPath}
      >
        {t('userFeedbacks:viewFeedbackSummary')}
      </ActionButton>
      <ActionButton color="primary" onClick={handleOpen}>
        {t('userFeedbacks:clearFeedbackButton')}
      </ActionButton>
      {/* this is for confirming the clear (according to materialui docs) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t('userFeedbacks:clearConfirmationQuestion')}
        </DialogTitle>
        <Button onClick={handleClose} color="primary">
          {t('userFeedbacks:no')}
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          {t('userFeedbacks:yes')}
        </Button>
      </Dialog>
    </>
  )
}

const FeedbackEndedActions = ({ viewPath }) => {
  const { t } = useTranslation()

  return (
    <ActionButton
      color="primary"
      variant="contained"
      component={Link}
      to={viewPath}
    >
      {t('userFeedbacks:viewFeedbackSummary')}
    </ActionButton>
  )
}

const FeedbackGivenChip = () => {
  const { t } = useTranslation()

  return (
    <Chip
      variant="outlined"
      icon={<FeedbackGivenIcon />}
      label={t('userFeedbacks:feedbackGiven')}
      color="primary"
    />
  )
}

const NoFeedbackChip = () => {
  const { t } = useTranslation()

  return (
    <Chip
      variant="outlined"
      icon={<NoFeedbackIcon />}
      label={t('userFeedbacks:waitingForFeedback')}
    />
  )
}

const FeedbackClosedChip = () => {
  const { t } = useTranslation()

  return (
    <Chip
      variant="outlined"
      icon={<FeedbackClosedIcon />}
      label={t('userFeedbacks:feedbackClosed')}
    />
  )
}

const formatDate = (date) => lightFormat(date, 'd.M.yyyy')

const FeedbackTargetItem = ({ feedbackTarget, divider }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const { id, closesAt, opensAt, feedback } = feedbackTarget

  const periodInfo = t('feedbackOpenPeriod', {
    opensAt: formatDate(parseISO(opensAt)),
    closesAt: formatDate(parseISO(closesAt)),
  })

  const feedbackGiven = Boolean(feedback)
  const isOpen = feedbackTargetIsOpen(feedbackTarget)
  const isEnded = feedbackTargetIsEnded(feedbackTarget)

  const onDelete = async () => {
    await apiClient.delete(`/feedbacks/${feedback.id}`)
    queryClient.invalidateQueries('feedbackTargetsForStudent')
  }

  const editPath = `/targets/${id}/feedback`
  const viewPath = `/targets/${id}/results`

  return (
    <ListItem className={classes.listItem} divider={divider} disableGutters>
      <ListItemText primary={periodInfo} />

      <Box mt={1} mb={1}>
        {!isOpen && <FeedbackClosedChip />}
        {isOpen && feedbackGiven && <FeedbackGivenChip />}
        {isOpen && !feedbackGiven && <NoFeedbackChip />}
      </Box>

      <Box m={-0.5}>
        {isEnded && <FeedbackEndedActions viewPath={viewPath} />}
        {isOpen && feedbackGiven && (
          <FeedbackGivenActions
            editPath={editPath}
            onDelete={onDelete}
            viewPath={viewPath}
          />
        )}
        {isOpen && !feedbackGiven && <NoFeedbackActions editPath={editPath} />}
      </Box>
    </ListItem>
  )
}

export default FeedbackTargetItem
