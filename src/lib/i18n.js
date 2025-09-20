import ru from '@/../locales/ru.json'
import uz from '@/../locales/uz.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'uz',
    legacy: false,
    messages: {
        ru,
        uz
    }
})

export default i18n