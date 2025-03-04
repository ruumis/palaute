/* eslint-disable max-len */

export default {
  common: {
    languages: {
      fi: 'Finska',
      sv: 'Svenska',
      en: 'Engelska',
    },
    validationErrors: {
      required: 'Fältet krävs',
      wrongDate: 'Förfrågans slutdatum är före startdatumet',
    },
    unknownError: 'Något gick fel',
    save: 'Spara',
    saveSuccess: 'Informationen har sparats',
    name: 'Namn',
    edit: 'Redigera',
    show: 'Visa',
    feedbackOpenPeriod: 'Respons kan ges mellan {{opensAt}} och {{closesAt}}',
    firstName: 'Förnamn',
    lastName: 'Efternamn',
    username: 'Användarnamn',
    studentNumber: 'Studentnummer',
    dirtyFormPrompt:
      'Sidan har osparade ändringar. Är du säker att du vill lämna sidan?',
    actions: 'Handlingar',
    close: 'Stäng',
    required: 'Krävs',
    copy: 'Kopiera',
  },
  userFeedbacks: {
    mainHeading: 'Mina responser',
    giveFeedbackButton: 'Ge respons',
    modifyFeedbackButton: 'Redigera responsen',
    clearFeedbackButton: 'Töm responsen',
    clearConfirmationQuestion:
      'Är du säker på att du vill tömma denna respons?',
    yes: 'Ja',
    no: 'Nej',
    viewFeedbackSummary: 'Visa sammanfattning av responsen',
    noFeedback: 'Ingenting här. Kom tillbaka senare!',
    feedbackClosed: 'Responsen är stängd',
    waitingForFeedback: 'Väntar på respons',
    feedbackGiven: 'Responsen är given',
  },
  feedbackView: {
    submitButton: 'Ge respons',
    successAlert: 'Responsen är given',
    feedbackInfo:
      'Denna respons är anonym. Fälten märkta med en asterisk (*) krävs',
    feedbackInfoLink: 'Läs mera om hur informationen används',
    closedInfo:
      'Denna respons är för tillfället stängd. Responsen kan ges mellan {{opensAt}} och {{closesAt}}',
    privacyInfoTitle: 'Hur används mina uppgifter?',
    privacyInfoContent:
      'Användaruppgifterna används till exempel för att visa studeranden den rätta förfrågan för respons, för att skicka påminnelsemeddelanden och för att visa läraren vilka studeranden har skickat respons (denna information kan användas till exempel vid bedömning). Läraren kan inte veta vem av studerandena har givit viss repons. Läraren kan se en lista på studeranden som har givit respons efter att reponsen har öppnats, men ser responsen först efter att responsen har stängts. Om antalet responser en kurs har fått är fem eller mindre, syns inte responsen alls',
    dontKnowOption: 'Ingen uppgift',
    editSurvey: 'Redigera förfrågan',
    translationLanguage: 'Språket på förfrågans förhandsvisning',
    cannotSubmitText:
      'Du kan inte skicka respons eftersom du inte är anmäld till kursen.',
    feedbackClosedError: 'Responsen är stängd',
    endedInfo: 'Responsen är stängd. <2>Se på responserna</2>',
  },
  teacherView: {
    mainHeading: 'Mina kurser',
    showFeedbacks: 'Visa respons',
    showSurvey: 'Visa förfrågan',
    editSurvey: 'Redigera förfrågan',
    copyLink: 'Kopiera svar via länk',
    copyResponseLink: 'Kopiera länken till svaret på responsen',
    copied: 'Länk kopierat till urklippet',
    showStudentsWithFeedback: 'Visa studerandena som har givit respons',
    feedbackCount: '{{count}}/{{totalCount}} responser givna',
    giveFeedbackResponse: 'Ge svar på responsen',
    editFeedbackResponse: 'Redigera svar på responsen',
    noCourseRealisations: 'Inga kursinstanser',
    noCourses: 'Inga kurser',
    feedbackResponseGiven: 'Svar på responsen given',
    feedbackResponseMissing: 'Svar på responsen saknas',
    feedbackOpen: 'Responsen är öppen',
    ongoingCourses: 'Pågående kurser',
    upcomingCourses: 'Kommande kurser',
    endedCourses: 'Avslutade kurser',
    feedbackNotStarted: 'Tiden för respons har ännu inte börjat',
    surveyOpen: 'Tiden för att ge repons: {{opensAt}}-{{closesAt}}',
  },
  questionEditor: {
    addQuestion: 'Lägg till fråga',
    likertQuestion: 'Värderingsskala',
    openQuestion: 'Öppen fråga',
    singleChoiceQuestion: 'Envalsfråga',
    multipleChoiceQuestion: 'Flervalsfråga',
    textualContent: 'Textinnehåll',
    moveUp: 'Rör dig uppåt',
    moveDown: 'Rör dig nedåt',
    removeQuestion: 'Radera frågan',
    options: 'Alternativ',
    option: 'Alternativ',
    addOption: 'Lägg till alternativ',
    removeOption: 'Radera alternativ',
    label: 'Fråga',
    content: 'Innehåll',
    removeQuestionConfirmation: 'Är du säker, att du vill radera frågan?',
    removeOptionConfirmation: 'Är du säker, att du vill radera alternativet?',
    description: 'Beskrivning',
    done: 'Färdigt',
    languageInfo:
      'Då håller för tillfället på att redigera språkversionen "{{language}}" av frågan',
    descriptionHelper:
      'Frivillig beskrivning som förser frågan med tilläggsinformation',
    universityQuestion: 'Universitetsnivå',
    programmeQuestion: 'Utbildningsprogramsnivå',
    uneditableTooltip:
      'Detta är definierat på förhand och läggs till automatiskt i förfrågan och kan inte redigeras eller raderas',
  },
  editFeedbackTarget: {
    closesAt: 'Stängs',
    opensAt: 'Öppnas',
    hidden: 'Gömd',
    upperLevelQuestionsInfo:
      'Förfrågan har redan {{count}} frågor på universitets- och avdelningsnivå, men du kan lägga till frågor. Du kan trycka på knappen "Visa förfrågans förhandsvisning" för att se hur förfrågan ser ut med alla frågorna',
    showPreview: 'Visa förfrågans förhandsvisning',
    translationLanguage: 'Språkversion',
    warningAboutOpeningCourse:
      'VARNING! Formulärets information kan inte ändras efter att föfrågan har öppnats',
    opensAtIsNow:
      'Förfrågan är inställd att öppnas genast! När förfrågan öppnas kan den inte längre redigeras',
    checkbox: 'Jag förstår',
    noUnsavedChanges: 'Inga osparade ändringar',
    openImmediately: 'Öppna reponsen genast',
    openImmediatelyConfirm:
      'När responsen har öppnats kan förfrågan inte längre redigeras. Är du säker på att du vill öppna repsonsen?',
  },
  questionResults: {
    answerCount: 'Antalet svar',
    answerOption: 'Svarsalternativ',
    publicInfo:
      'Resultaten från dessa frågor är synliga för studerandena. <2>Välj offentligtgjorda frågor</2>',
    notPublicInfo:
      'Resultaten från dessa frågor är inte synliga för studerandena. <2>Välj offentligtgjorda frågor</2>',
  },
  feedbackSummary: {
    question: 'Fråga',
    average: 'Medeltal',
    standardDeviation: 'Standardavvikelse',
    median: 'Median',
    answers: 'Svar',
  },
  feedbackTargetResults: {
    notEnoughFeedbacksInfo:
      'Förfrågans resultat visas inte på grund av för få responser',
    onlyForEnrolledInfo:
      'Resultaten av förfrågan visas inte eftersom kursens lärare har ställt in responsen synlig endast för kursens deltagare',
    studentsWithFeedbackHeading: 'Studeranden som givit respons',
    responseHeading: 'Lärarens svar på responsen',
    giveResponse: 'Ge svar på responsen',
    editResponse: 'Redigera svaret på responsen',
    noResponseInfo: 'Kursens lärare har inte ännu svarat på responsen',
    exportCsv: 'Exportera som csv',
    thankYouMessage:
      'Tack för reponsen. Här är en sammanfattning av responsen som har getts hittills.',
  },
  navBar: {
    myFeedbacks: 'Mina responser',
    myCourses: 'Mina kurser',
    logOut: 'Logga ut',
    admin: 'Admin',
    courseSummary: 'Kurssammandrag',
    nameFallback: 'Menu',
  },
  studentsWithFeedback: {
    noFeedbackInfo: 'Ingen har tillsvidare givit respons',
    studentsList: 'Studerande som gett respons',
  },
  feedbackResponse: {
    responseLabel: 'Svar på response',
    responseInfo: 'Fält stöder innehåll med <2>Markdown</2>',
    previewLabel: 'Förhandsvisa',
    sendEmail: 'Meddela studerandena om responssammandraget via e-post',
  },
  publicQuestions: {
    publicInfo:
      'Responsen gällande offentligtgjorda frågor visas för studeranden på <2>responssidan</2> efter att responstiden har tagit slut',
    selectVisibility: 'Välj användare som ser de offentliga frågorna',
    none: 'Endast personal på utbildningsprogrammet',
    enrolled: 'Studerande på kursen',
    everyone: 'Alla användare',
  },
  courseSummary: {
    heading: 'Sammandrag på kursens respons',
    noResults: 'Inga responser',
    feedbackResponse: '',
    feedbackCount: '',
    feedbackResponseGiven: '',
    feedbackResponseNotGiven: '',
    feedbackStillOpen: '',
    courseOngoing: '',
    editProgrammeSettings: 'Redigera inställningar för utbildningsprogrammet',
    courseRealisation: 'Kursinstans',
  },
  organisationView: {
    organisations: 'Organisationer',
    noOrganisations: 'Denna användare är inte medlem i någon organisation',
    organisationName: 'Namn',
    organisationCode: 'Organisationens kod',
  },
  editProgrammeSurvey: {
    noWriteAccess:
      'Du har inte rättigheter att redigera förfrågan för detta utbildningsprogram',
    upperLevelQuestionsInfo:
      'Förfrågan har redan {{count}} frågor på universitetsnivå, men du kan lägga till fler frågor om du vill.',
    bigBoss:
      'Frågor och inställningar för utbildningsprogrammet kan redigeras av personal i utbildningsprogrammet.',
    studentListVisible: 'Lista på studerande visas',
    programmeSettings: 'Inställningar för utbildningsprogrammet',
  },
  footer: {
    contactSupport: 'Kontakta stödet',
  },
  courseRealisationFeedback: {
    noFeedbackTarget:
      'Det finns ingen respons tillgänglig för dig på denna kurs',
  },
  organisationSettings: {
    surveyInfo:
      'Frågor på utbildningsprogramsnivå visas i varje förfrågan för utbildningsprogrammets kurser efter frågorna på universitetsnivå. Förfrågan har redan {{count}} frågor på universitetsnivå, men du kan lägga till fler frågor om du vill.',
    studentListVisible:
      'Visa studerandena som har gett repons till kursens lärare',
    courseSettingsInfo: 'Respons samlas endast in för aktiverade kurser',
    generalTab: 'Allmänna inställningar',
    coursesTab: 'Aktiverade kurser',
    surveyTab: 'Utbildningsprogrammets förfrågan',
  },
  feedbackTargetView: {
    feedbackDisabled: 'Denna repons är inte i bruk',
    surveyTab: 'Förfrågan',
    feedbacksTab: 'Responser',
    feedbackResponseTab: 'Svar på responsen',
    editSurveyTab: 'Redigera förfrågan',
    studentsWithFeedbackTab: 'De som gett respons',
    linkCopied: 'Länken till responsen har kopierats till urklippet',
    copyLink: 'Kopiera länken',
    coursePeriod: '',
    feedbackPeriod: '',
  },
}
