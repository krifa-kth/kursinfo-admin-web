import { Component, linkEvent } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle.jsx'
import Container from 'kth-style-inferno-bootstrap/dist/Container'
import Button from 'inferno-bootstrap/lib/Button'
import Card from 'inferno-bootstrap/lib/Card/Card'
import CardBody from 'inferno-bootstrap/lib/Card/CardBody'
import CardTitle from 'inferno-bootstrap/lib/Card/CardTitle'
import CardText from 'inferno-bootstrap/lib/Card/CardText'
import CardFooter from 'inferno-bootstrap/lib/Card/CardFooter'
import Alert from 'inferno-bootstrap/lib/Alert'

function TextBlock ({text}) {
  return (
    <span className='textBlock' dangerouslySetInnerHTML={{__html: text}}>
    </span>
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

function AlertMessage ({hasDoneSubmit, isError, errMsg}) {
  if (hasDoneSubmit && !isError) {
    return (
      <Alert color='success'>
        <p>Texten uppdaterad</p>
      </Alert>
    )
  } else if (isError) {
    return (
      <Alert color='info'>
        <p>{errMsg}</p>
      </Alert>
    )
  }
}

function filterClick (e) {
  var selector = e.target.getAttribute('data-lang-selector')
  if (selector) {
    var filter = e.target.closest('.filter'),
      section = filter.closest('.TextEditor--SellingInfo'),
      active = filter.querySelector('a.active')
    if (active) {
      active.classList.remove('active')
      section.classList.remove(active.getAttribute('data-lang-selector'))
    }
    e.target.classList.add('active')
    e.target.blur()
    section.classList.add(selector)
    e.preventDefault()
    e.stopPropagation()
  }
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
      validationError: undefined,
      leftTextSign: undefined, // 5000 - this.props.adminStore.sellingText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '').replace(/^\s+|\s+$/g, '').length,
      isError: false,
      errMsg: 'Something went wrong'
    }
    this.doStartTextEditor = this.doStartTextEditor.bind(this)
    this.doCancel = this.doCancel.bind(this)
    this.doChangeText = this.doChangeText.bind(this)
    this.doPreview = this.doPreview.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
    this.doOpenEditorAndCount = this.doOpenEditorAndCount.bind(this)
  }

  doCancel (event) {
    event.preventDefault()
    this.setState({
      sellingText: this.props.adminStore.sellingText,
      editDescription: false,
      enteredEditMode: false,
      hasDoneSubmit: false,
      isError: false
    })
    CKEDITOR.instances.editor1.destroy(true)
    console.log('doCancelled')
  }

  doChangeText (event) { // TODO: better name showing up from gransking to changing instaead of publishing
    event.preventDefault()
    this.setState({
      hasDoneSubmit: false,
      enteredEditMode: true,
      isError: false
    })
    this.doOpenEditorAndCount(event)
    console.log('Do some extra changes to text after Preview or Failed Submission')
  }

  doStartTextEditor (event) {
    event.preventDefault()
    this.setState({
      hasDoneSubmit: false,
      editDescription: true,
      enteredEditMode: true
    })
    this.doOpenEditorAndCount(event)
    console.log('Open Editor')
  }

  // Made able to submit only after review mode to avoid 'silly' submission
  // TODO: Before submission remove all empty spaces, like
    //   <p>&nbsp;</p>
    //
    // <p>&nbsp;</p>
  doSubmit (event) {
    event.preventDefault()
    const adminStore = this.props.adminStore
    const value = this.state.sellingText
    const courseCode = adminStore.courseAdminData.courseTitleData.course_code
    adminStore.doUpsertItem(value, courseCode).then(() => {
      console.log('didSubmit')
      this.setState({
        hasDoneSubmit: true,
        editDescription: false,
        isError: false,
        enteredEditMode: false
      })
    }).catch(err => {
      console.log('#########Eroror', err) // TODO: improve error handling
      this.setState({
        hasDoneSubmit: false,
        isError: true,
        errMsg: 'Failed to post data to API'
        // enteredEditMode: false
      })
    })
  }

  doPreview (event) {
    event.preventDefault()
    this.setState({
      sellingText: CKEDITOR.instances.editor1.getData(),
      enteredEditMode: false,
      isError: false
    })
    CKEDITOR.instances.editor1.destroy(true)
    console.log('Enter Preview Mode', this.state.sellingText)
  }

  doOpenEditorAndCount (event) {
    var lang = i18n.isSwedish() ? 'sv' : 'en'

    CKEDITOR.replace('editor1', {
      toolbarGroups: [
        {name: 'mode'},
        {name: 'find'},
        {name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ]},
        {name: 'list'},
        {name: 'links'},
        {name: 'about'}
      ],
      removeButtons: 'CopyFormatting,Underline,Strike,Subscript,Superscript,Anchor',
      language: lang

    })
    CKEDITOR.instances.editor1.on('instanceReady', (event) => {
      const text = event.editor.document.getBody().getText().replace(/\n/g, '')
      this.setState({leftTextSign: 1500 - text.length})
    })
    CKEDITOR.instances.editor1.on('change', (event) => {
      this.setState({
        isError: false,
        errMsg: ''
      })
      const cleanTextLen = event.editor.document.getBody().getText().replace(/\n/g, '').length
      const htmlTextLen = event.editor.getData().length
      if (htmlTextLen > 10000) { // this is max in api
        this.setState({
          isError: true,
          errMsg: 'Din html texten måste vara mindre än 10 000 tecken'
        })
      } else if (cleanTextLen > 1500) { // this is an abstract max
        this.setState({
          isError: true,
          errMsg: 'Din texten måste vara mindre än 1 500 tecken'
        })
      }
      console.log('HTLM text length: ', htmlTextLen)
      this.setState({leftTextSign: 1500 - cleanTextLen})
    })
  }

  render ({adminStore}) {
    const courseAdminData = adminStore['courseAdminData']
    console.log('routerStore in CoursePage', courseAdminData)
    const language = courseAdminData.language === 'en' ? 0 : 1
    // console.log('SELLLING TEXT', this.state.sellingText)

    return (
        <div className='AdminPage--EditDescription col'>
        <KoppsText className='koppsText' koppsVisibilityStatus={this.state.reviewEditedText}
          text={courseAdminData.koppsCourseDesc.course_recruitment_text} />
        {/* ---In edit mode 2 conditions, if editing text or previewing before publishing */}
        {this.state.enteredEditMode ? (
            <div className='TextEditor--SellingInfo'>
            {/* ---INTRO TEXT Editor--- */}
            <h3>{i18n.messages[language].sellingTextLabels.label_kopps_text}</h3>
            <KoppsText className='koppsText' koppsVisibilityStatus='isEditing'
              text={courseAdminData.koppsCourseDesc.course_recruitment_text} />
            <h3>{i18n.messages[language].sellingTextLabels.label_selling_text}</h3>
            <p>{i18n.messages[language].sellingTextLabels.label_selling_info}</p>
            {/* FILTER */}
            <p className='filter'>
                <span><a href='#' onclick={filterClick} data-lang-selector='swedish' className='active'>{i18n.messages[language].sellingTextLabels.label_sv}</a></span>
                <span><a href='#' onclick={filterClick} data-lang-selector='english' className=''>{i18n.messages[language].sellingTextLabels.label_en}</a></span>
            </p>
            <p>{i18n.messages[language].sellingTextLabels.label_selling_text_length}<span class='badge badge-danger badge-pill'>{this.state.leftTextSign}</span></p>
            <textarea name='editor1' id='editor1'>{this.state.sellingText}</textarea>
            <span className='button_group'>
                <Button onClick={this.doCancel} color='secondary'>{i18n.messages[language].sellingTextButtons.button_cancel}</Button>
                <Button onClick={this.doPreview} color='primary' disabled={this.state.isError}>{i18n.messages[language].sellingTextButtons.button_preview}</Button>
            </span>
            </div>
        ) : (
            <div className='Description--TextBlock'>
            {/* ---INTRO TEXT Editor 2 steg Granska innan Publicering--- */}
            <TextBlock text={this.state.sellingText} />
            <span className='button_group'>
                <Button onClick={this.doCancel} color='secondary'>{i18n.messages[language].sellingTextButtons.button_cancel}</Button>
                <Button onClick={this.doChangeText} color='primary'>{i18n.messages[language].sellingTextButtons.button_change}</Button>
                <Button onClick={this.doSubmit} color='success'>{i18n.messages[language].sellingTextButtons.button_submit}</Button>
            </span>
            </div>
        )}
        </div>
        ) }
}

export default SellingInfo