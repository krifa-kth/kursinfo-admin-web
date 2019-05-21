module.exports = {
  shortNames: [ 'sv', 'se' ],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%Y-%m-%d',

    /**
     * Error messages
     */

    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    /**
     * Message keys
     */
    service_name: 'Kursinfo-admin-web',

    example_message_key: 'Här är en svensk översättning på en label',

    button_label_example: 'Klicka här för att skicka data till servern!',

    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Kursinformationsadmin på svenska',

    site_name: 'Kursinformationsadmin',
    host_name: 'KTH',
    page_admin: 'KURSINFO ADMIN',
    page_course_programme: 'KURS- OCH PROGRAMKATALOGEN'
  },
  pageTitles: {
    course_dev_title: 'Kursens utveckling och historik',
    course_info_title: 'Kursinformation',
    course_admin_title: 'Administrera',
    about_course: 'Om kursen',
    info_text: 'På denna ... ....',
    info_admin_text: 'Ansvariga .......',
    administrate: 'Administrera Om kursen',
    editSelling: 'Redigera introduktion till kursen',
    previewSelling: 'Förhandsgranska introduktion till kursen',
    start_link_back: 'Till kursinformationssida',
    instruction_1: 'Här kan du, som kursansvarig eller examinator för kursen, administrera den information på platsen ”Om kursen” som inte hämtas från KOPPS. I dagsläget är det endast ”Introduktion till Kursen som administreras här.',
    instruction_kopps_1: 'Vill du ändra den grundinformation som hämtas eller ändra roller/ behörigheter för kursen så görs det i ',
    instruction_kopps_2: 'av ',
    instruction_kopps_3_link: 'personal som har behörighet i KOPPS ',
    instruction_kopps_4: 'läs mer om Kopps ',
    instruction_kopps_5_link: 'behörigheter.',
    instruction_kopps_alt: 'Till KOPPS',
    link_user_manual: 'Information och hjälp för att administrera Om-kursen',
    alertMessages: {
      success: 'Ny svensk och engelsk version av introduktion till kursen har publicerats på kursinformationssidan',
      over_text_limit: 'Texten får bara bestå av 1 500 tecken',
      over_html_limit: 'HTML texten får bara bestå av 10 000 tecken',
      api_error: 'Det gick inte att spara texten på grund av teknisk fel. Kopiera texten och försök igen senare',
      kopps_api_down: 'Det går för närvarande inte att hämta information från KOPPS så viss information kommer att saknas'
    }
  },
  startCards: {
    sellingText_hd: 'Introduktion till kursen',
    sellingText_desc_p1: 'Ersätt kortbeskrivningen i Kopps med en mer informativ introduktion till kursen för att hjälpa studenten att göra rätt kursval.',
    sellingText_desc_p2: '”Introduktion till kursen” visas överst på sidan ”Kursinformation”.',
    sellingText_btn: 'Redigera',
    sellingText_alt: 'Redigera introduktion till kursen',
    coursePM_hd: 'Kurs-PM',
    coursePM_desc: 'Ladda upp kurs-pm i form av PDF',
    coursePM_btn: 'Ladda upp',
    courseDev_hd: 'Kusanalys med kursdata',
    courseDev_decs: 'Redigera och publicera kursdata och kursanalys på sidan ”Kursens utveckling och historik”',
    courseDev_btn: 'Redigera och publicera',
    courseDev_link: 'Courde development - more information and help',
    beta_courseDev: 'Sidan Kursens utveckling och historik och funktionalitet för att där ladda upp och kursanalys med kursdata är under utveckling.',
    beta_coursePm: 'Funktionalitet för att att ladda upp Kurs-PM är under utveckling.',
    beta_more_link: 'Vill du veta mer eller delta …',
    altLabel: {
      start_link_back: 'Till kursinformationssida',
      sellingText_btn: 'Redigera introduktion till kursen',
      coursePM_btn: 'Ladda upp kurs-pm',
      courseDev_btn: 'Redigera kusanalys och kursdata'
    }
  },
  sellingTextLabels: {
    label_selling_info: 'Du kan här skapa / redigera introduktion till kursen i form av text som ersätter kortbeskrivningen som finns i KOPPS. Vill man återgå till kortbeskrivningen tar man bort introduktion till kursen nedan',
    label_max_number_letters: 'Maximalt antal tecken är 1500.',
    label_left_number_letters: 'Antal tecken kvar att använda:',
    label_step_1: 'Redigera svensk och engelsk text (steg 1 av 2)',
    label_step_2: 'Granska och publicera (steg 2 av 2)',
    langLabelKopps: {
      en: 'Kortbeskrivning i KOPPS (EN)',
      sv: 'Kortbeskrivning i KOPPS (SV)'
    },
    langLabelIntro: {
      en: 'Introduktion till kursen (EN)',
      sv: 'Introduktion till kursen (SV)'
    },
    langLabel: {
      en: 'Engelsk text',
      sv: 'Svensk text'
    },
    changed_by: 'Senast ändrad av:',
    sellingTextButtons: {
      button_cancel: 'Avbryt',
      button_change: 'Redigera',
      button_preview: 'Granska',
      button_submit: 'Publicera'
    },
    altLabel: {
      button_preview: 'Förhandsgranska introduktion till kursen',
      button_cancel: 'Avbryt och gå till admin startsida',
      button_submit: 'Spara och publicera introduktion till kursen',
      image: 'Bild för kurssidasdekoration'
    }
  },
  courseImage: {
    Arkitektur: '',
    Bioteknik: '',
    'Datalogi och datateknik': '',
    Elektroteknik: '',
    Fysik: '',
    'Industriell ekonomi': 'HH1800',
    Informationsteknik: '',
    'Informations- och kommunikationsteknik': '',
    Kemiteknik: '',
    'Kemi och kemiteknik	': '',
    Matematik: 'test Matte',
    Miljöteknik: '',
    'Molekylära livsvetenskaper': '',
    Maskinteknik: '',
    Materialvetenskap: '',
    'Medicinsk teknik': '',
    Materialteknik: '',
    Samhällsbyggnad: '',
    'Teknisk fysik': '',
    'Teknik och ekonomi': '',
    'Teknik och hälsa': '',
    'Teknik och management': '',
    Teknik: '',
    'Teknik och management': '',
    'Teknik och lärande': '',
    default: 'default'
  }
}
