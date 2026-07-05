import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
  mdiBrightness6,
  mdiCircleHalfFull,
  mdiContrastCircle,
  mdiDownload,
  mdiFilter,
  mdiImageOutline,
  mdiPalette,
  mdiRestore,
  mdiWeatherSunny,
} from '@mdi/js'

const customAliases = {
  ...aliases,
  brightness: mdiBrightness6,
  contrast: mdiContrastCircle,
  download: mdiDownload,
  filter: mdiFilter,
  grayscale: mdiCircleHalfFull,
  image: mdiImageOutline,
  palette: mdiPalette,
  restore: mdiRestore,
  sepia: mdiWeatherSunny,
}

export default createVuetify({
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: customAliases,
    sets: {
      mdi,
    },
  },
})
