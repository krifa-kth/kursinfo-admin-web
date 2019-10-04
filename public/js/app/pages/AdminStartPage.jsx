import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle'
import { Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap'
import KipLinkNav from '../components/KipNav'
import AlertMsg from '../components/AlertMsg'

import { ADMIN_COURSE_UTV, ADMIN_COURSE_PM, ADMIN_OM_COURSE, PM_TEMPLATE } from '../util/constants'

@inject(['adminStore']) @observer
class AdminStartPage extends Component {

  render () {
    const { courseTitleData, lang } = this.props.adminStore.koppsData
    const courseCode = courseTitleData.course_code
    const { pageTitles, startCards } = i18n.messages[lang === 'en' ? 0 : 1]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseTitleData}
          pageTitle={pageTitles.administrate}
          language={lang}
        />
        <KipLinkNav courseCode={courseCode} lang={lang} translate={pageTitles} />
        <AlertMsg courseCode={courseCode} props={this.props} lang={lang} translate={pageTitles} />
        <div className='col'>
          <span className='AdminPage--ShowDescription'>
            <Card className='KursInfo--SellingText'>
              <CardBody>
                <CardTitle>{startCards.sellingText_hd}</CardTitle>
                <CardText>
                  <p>{startCards.sellingText_desc_p1}</p>
                  <p>{startCards.sellingText_desc_p2}</p>
                </CardText>
              </CardBody>
              <CardFooter className='text-right'>
                <a href={`${ADMIN_OM_COURSE}edit/${courseCode}?l=${lang}`} alt={startCards.sellingText_btn} className='btn btn-primary' >
                {startCards.sellingText_btn}
                </a>
              </CardFooter>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>{startCards.coursePM_hd}</CardTitle>
                <CardText>
                  {startCards.coursePM_desc}
                </CardText>
              </CardBody>
              <CardFooter className='text-right'>
                <a href={PM_TEMPLATE} className='btn btn-primary' alt={startCards.coursePM_btn_template} target='_blank'>
                  {startCards.coursePM_btn_template}
                </a>
                <a href={`${ADMIN_COURSE_PM}${courseCode}?l=${lang}`} className='btn btn-primary' alt={startCards.coursePM_btn}>
                  {startCards.coursePM_btn}
                </a>
              </CardFooter>
            </Card>
            <Card className='course-development'>
              <CardBody>
                <CardTitle>{startCards.courseDev_hd}</CardTitle>
                <CardText>
                  <p>{startCards.courseDev_decs_p1}</p>
                  <p>{startCards.courseDev_decs_p2}</p>
                </CardText>
              </CardBody>
              <CardFooter className='text-right'>
                <a href={`${ADMIN_COURSE_UTV}${courseCode}?l=${lang}&status=n&serv=admin&title=${courseTitleData.course_title}_${courseTitleData.course_credits}`} className='btn btn-primary' alt={startCards.courseDev_btn_new}>
                  {startCards.courseDev_btn_new}
                </a>
                <a href={`${ADMIN_COURSE_UTV}${courseCode}?l=${lang}&status=p&serv=admin&title=${courseTitleData.course_title}_${courseTitleData.course_credits}`} className='btn btn-primary' alt={startCards.courseDev_btn_edit}>
                  {startCards.courseDev_btn_edit}
                </a>
              </CardFooter>
            </Card>
          </span>
        </div>
      </div>
    )
  }
}

export default AdminStartPage
