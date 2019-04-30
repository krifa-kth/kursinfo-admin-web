import i18n from '../../../../i18n'

function KoppsTextCollapse ({koppsText, lang, instructions}) {
  return ( // langLabelKopps , langLabel
    <div className='courseIntroTextCollapse'>
      <h3 className='text-center'>{instructions.langLabel[lang]}</h3>
      <div className='card collapsible blue'>
        <div className='card-header' role='tab' id={'headingWhite' + lang} tabindex='0'>
          <h4 className='mb-0'>
            <a className='collapse-header' data-toggle='collapse' href={'#collapseWhite' + lang} load='false' aria-expanded='false' aria-controls={'collapseWhite' + lang}>
              {instructions.langLabelKopps[lang]}
            </a>
          </h4>
        </div>
        <div id={'collapseWhite' + lang} className='collapse hide' role='tabpanel' aria-labelledby={'headingWhite' + lang}>
          <div className='card-body  col'>
            <span className='textBlock' dangerouslySetInnerHTML={{__html: koppsText}}></span>
          </div>
        </div>
      </div>
      <p>{instructions.label_max_number_letters}</p>
    </div>
  )
}

export default KoppsTextCollapse