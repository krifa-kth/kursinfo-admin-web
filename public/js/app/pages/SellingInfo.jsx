import { Component, linkEvent } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle.jsx'
import Container from 'kth-style-inferno-bootstrap/dist/Container'
import Button from 'inferno-bootstrap/lib/Button'
import Col from 'inferno-bootstrap/lib/Col'
import Form from 'inferno-bootstrap/lib/Form/Form'
import Input from 'inferno-bootstrap/lib/Form/Input'
import Row from 'inferno-bootstrap/lib/Row'

function TextBlock ({text}) {
  return (
    <div className='col-12'
      dangerouslySetInnerHTML={{__html: text}}>
    </div>
    )
}

function SellingTextContainer ({mode, text}) { // redo, isEditing, isPreviewing,
  return (
    <form id='editSellingTextForm'>
      <label for='editor1'>
          Säljandetexten på svenska:
      </label>
      {mode === 'isEditing' ? (
        <div>
          <textarea name='editor1' id='editor1'>{{text}}</textarea>
          <span className='button_group'>
            <button className='btn btn-secondary'>Avbryt</button>
            <button className='btn btn-primary'>Granska</button>
            <button className='btn btn-success' type='submit'>Publicera</button>
          </span>
        </div>
      ) : (
        <div>
          <TextBlock text={text} />
          <span className='button_group'>
            <button className='btn btn-secondary'>Avbryt</button>
            <button className='btn btn-primary'>Redigera</button>
            <button className='btn btn-success' type='submit'>Publicera</button>
          </span>
        </div>
      )}
    </form>
  )
}

function KoppsText ({className, koppsVisibilityStatus, text}) {
  // if koppsVisibilityStatus === 'isPreview':
  //   style = {opacity: }

  // else if koppsVisibilityStatus === 'hidden':
  // else:

  return (
    <div id='courseIntroText'>
    {koppsVisibilityStatus === 'isEditing' ?
      (<TextBlock text={text} />
      ) : (
      <div id='courseIntroText'>
      </div>)
    }
    </div>
  )
}

@inject(['adminStore']) @observer
class SellingInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sellingText: this.props.adminStore.sellingText,
      enteredEditMode: false,
      hasDoneSubmit: false,
      editDescription: false,
      validationError: undefined
    }
    this.doEnterEditor = this.doEnterEditor.bind(this)
    this.doCancel = this.doCancel.bind(this)
    this.doEdit = this.doEdit.bind(this)
    this.doPreview = this.doPreview.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
  }

  doCancel (event) {
    event.preventDefault()
    this.setState({
      sellingText: this.props.adminStore.sellingText,
      editDescription: false,
      enteredEditMode: false
    })
    CKEDITOR.instances.editor1.destroy(true)
    console.log('doCancelled')
  }

  doEdit (event) {
    event.preventDefault()
    this.setState({
      enteredEditMode: true
    })
    CKEDITOR.replace('editor1')
    console.log('didEdit')
  }

  doEnterEditor (event) { // can be merged to doEdit by adding extra state for editMode
    event.preventDefault()
    this.setState({
      editDescription: true,
      enteredEditMode: true
    })
    CKEDITOR.replace('editor1')
    console.log('Enter Editor Mode')
  }

  // Made able to submit only after review mode to avoid 'silly' submission
  doSubmit (event) {
    event.preventDefault()

    this.setState({
      hasDoneSubmit: true,
      enteredEditMode: false
    })
    console.log('didSubmit')
  }

  doPreview (event) {
    // alert('hello')
    event.preventDefault()
    this.setState({
      sellingText: CKEDITOR.instances.editor1.getData(),
      enteredEditMode: false
    })
    console.log('olalal', this.state.reviewEditedText)
    CKEDITOR.instances.editor1.destroy(true)
  }

  render ({adminStore}) {
    const courseAdminData = adminStore['courseAdminData']
    console.log('routerStore in CoursePage', courseAdminData)
    console.log('SELLLING TEXT', this.state.sellingText)

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseAdminData.courseTitleData}
          language={courseAdminData.language}
            />

          {this.state.editDescription === true ? (
            <div className='AdminPage--EditDescription'>

            <KoppsText className='koppsText' koppsVisibilityStatus={this.state.reviewEditedText}
              text={courseAdminData.koppsCourseDesc.course_recruitment_text} />
            {this.state.enteredEditMode ? (
              <div>
                {/* ---INTRO TEXT--- */}
                <textarea name='editor1' id='editor1' onChange={this.doPreview}>{this.state.sellingText}</textarea>
                <span className='button_group'>
                  <Button onClick={this.doCancel} color='secondary'>Avbryt</Button>
                  <Button onClick={this.doPreview} color='primary'>Förhandsgranska</Button>
                  {/* <Button onClick={this.doSubmit} color='success'>Publicera</Button> */}
                </span>
              </div>
            ) : (
              <div className='col'>
                <TextBlock text={this.state.sellingText} />
                <span className='button_group'>
                  <Button onClick={this.doCancel} color='secondary'>Avbryt</Button>
                  <Button onClick={this.doEdit} color='primary'>Redigera</Button>
                  <Button onClick={this.doSubmit} color='success'>Publicera</Button>
                </span>
              </div>
            )}
            </div>
          ) : (
            <div className='AdminPage--ShowDescription col'>
              <TextBlock text={this.state.sellingText} />
              <Button onClick={this.doEnterEditor} color='primary'>Redigera kortbeskrivning</Button>
            </div>
          )}
      </div>
    )
  }
}

export default SellingInfo
