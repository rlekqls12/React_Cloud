import LOCALE_TYPE from './locales.js';
import TEXT_KR from './text-kr.js';

const LOCALE_TEXT = (locale) => {
    switch (locale) {
        default:
        case LOCALE_TYPE.KR: return TEXT_KR;
    }
};

export default LOCALE_TEXT;