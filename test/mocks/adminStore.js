
const tempSaveNewImage = (imageFile, tempImagePath, isDefaultChosen) => {
  mockAdminStore.newImageFile = imageFile
  mockAdminStore.tempImagePath = tempImagePath
  mockAdminStore.isDefaultChosen = isDefaultChosen
}

const mockAdminStore = {
  koppsData: {
    koppsText: {
      sv: 'Algebra och geometri',
      en: 'Ingen information tillagd'
    },
    mainSubject: 'Matematik',
    courseTitleData: {
      course_code: 'SF1624',
      course_title: 'Algebra och geometri',
      course_credits: 7.5,
      apiError: false
    },
    lang: 'sv',
    langIndex: 1
  },
  browserConfig: {
    storageUri: ''
  },
  sellingText: {
    'sv': 'Svensk säljande text',
    'en': 'English selling text'
  },
  paths: {
    storage: {
      saveImage: {
        method: 'post',
        uri: '/kursinfoadmin/kurser/kurs/storage/saveImage/:courseCode/:published'
      }
    }
  },
  isDefaultChosen: true,
  tempSaveNewImage: tempSaveNewImage,

  doUpsertItem (text, courseCode, imageName) {
    return new Promise((resolve, reject) => {
      resolve({status: 200})
    })
  }

}

export default mockAdminStore

