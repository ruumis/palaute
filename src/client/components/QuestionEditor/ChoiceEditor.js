import React from 'react'

import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import OptionEditor from './OptionEditor'
import FormikTextField from '../FormikTextField'

const ChoiceEditor = ({ name, language }) => {
  const { i18n } = useTranslation()
  const t = i18n.getFixedT(language)

  return (
    <>
      <Box mb={2}>
        <FormikTextField
          id={`choice-question-${language}-${name}`}
          name={`${name}.data.label.${language}`}
          label={t('questionEditor:label')}
          fullWidth
        />
      </Box>

      <Box mb={2}>
        <FormikTextField
          id={`choice-description-${language}-${name}`}
          name={`${name}.data.description.${language}`}
          label={t('questionEditor:description')}
          helperText={t('questionEditor:descriptionHelper')}
          fullWidth
        />
      </Box>

      <OptionEditor name={`${name}.data.options`} language={language} />
    </>
  )
}

export default ChoiceEditor
