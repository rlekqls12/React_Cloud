const sizeText = ['B', 'KB', 'MB', 'GB'];

/**
 * 용량 크기를 적당한 크기로 잘라 표시
 * @param {number} originalSize 파일, 폴더, 용량의 크기 (bytes)
 * @param {string} fixedText 고정할 용량 표시 텍스트 (B, KB, MB, GB)
 * @returns {array} index 0: 크기, 1: 표시 크기
 */
const getSizeText = (originalSize, fixedText) => {
    const fiexedTextIndex = fixedText === undefined ? -1 : sizeText.indexOf(fixedText);
    let sizeTextIndex = 0;
    let size = originalSize === undefined || typeof originalSize !== 'number' ? 0 : originalSize;

    // 나눠질 때 까지 나누거나, 사용자가 정한 크기까지 나눔
    let sizeTextLastIndex = sizeText.length - 1;
    while ((fiexedTextIndex === -1 || sizeTextIndex < fiexedTextIndex)
            && sizeTextIndex < sizeTextLastIndex
            && 1024 <= Math.abs(size)) {
        sizeTextIndex++;
        size /= 1024;
    }

    return [size, sizeText[sizeTextIndex]];
}

/**
 * 소수점 자리수 고정 및 중복되는 0 제거
 * @param {number} number 고정시킬 숫자 
 * @param {number} fixedDigit 고정할 자리수
 */
const decimalFixed = (number, fixedDigit) => {
    let fixedDecimal = number.toFixed(fixedDigit);

    // 맨 뒤의 문자가 0이나 .일 경우 해당 문자 제거
    // ex 20.000 => 20
    // ex 20.352000 => 20.352
    while (fixedDecimal[fixedDecimal.length - 1] === '0') {
        fixedDecimal = fixedDecimal.substring(0, fixedDecimal.length - 1);

        if (fixedDecimal[fixedDecimal.length - 1] === '.') {
            fixedDecimal = fixedDecimal.substring(0, fixedDecimal.length - 1);
            break;
        }
    }

    return fixedDecimal;
}

export { sizeText, getSizeText, decimalFixed };