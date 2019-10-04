import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle'
import ProgressBar from '../components/ProgressBar'
import PictureUpload from './PictureUpload'
import SellingInfo from './SellingInfo'
import Preview from '../components/PreviewText'


@inject(['adminStore']) @observer
class CourseDescriptionEditorPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 1
    }
    this.koppsData = this.props.adminStore.koppsData
    this.storageUri = this.props.adminStore.browserConfig.storageUri
    this.langIndex = this.koppsData.lang === 'en' ? 0 : 1
    this.doUpdateStates = this.doUpdateStates.bind(this)
  }

  doUpdateStates (states) {
    if (states) this.setState(states)
  }

  render () {
    const { koppsData, langIndex } = this
    const { courseImage, introLabel } = i18n.messages[langIndex]
    let courseImageID = courseImage[koppsData.defaultPicName]
    if (courseImageID === undefined) courseImageID = courseImage.default
    const defaultImageUrl = `${this.storageUri}${courseImageID}`
    return (
      <div key='kursinfo-container' className='kursinfo-main-page col'>
        <CourseTitle key='title'
          courseTitleData={koppsData.courseTitleData}
          pageTitle={introLabel.editCourseIntro}
          language={koppsData.lang}
          />
        <ProgressBar active={this.state.progress} language={langIndex} />
        {this.state.progress === 1
        ? <PictureUpload defaultImageUrl={defaultImageUrl} introLabel={introLabel}
          koppsData={koppsData}
          updateParent={this.doUpdateStates} />
        : this.state.progress === 2
          ? <SellingInfo koppsData={koppsData} updateParent={this.doUpdateStates}
          />
          : <Preview introLabel={introLabel} defaultImageUrl={defaultImageUrl}
            updateParent={this.doUpdateStates}
          />
        }
      </div>
    )
  }

}

export default CourseDescriptionEditorPage
