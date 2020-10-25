const SORT_TYPES = {
    TYPE_NAME: 'SORT_NAME',
    TYPE_DATE: 'SORT_DATE'
};

/**
 * 원하는 정렬 방식에 따라 파일/폴더 정렬
 * @param {array} contents 파일/폴더 목록
 * @param {string} sortType 정렬 방식
 */
const doListSort = (contents, sortType) => {
    // 리스트 정렬
    if (!Array.isArray(contents)) return contents;

    return contents.sort((a, b) => {
        return doSort(a, b, sortType);
    })
};

const doSort = (a, b, sortType) => {
    // 정렬
    const attrA = setSortAttributes(a), 
        attrB = setSortAttributes(b);
    let compA, compB;
    let tempA, tempB, tempLength;

    switch (sortType) {
        default:
        case SORT_TYPES.TYPE_NAME:
            compA = a[attrA.name];
            compB = b[attrB.name];

            tempA = compA.match(/\d+|./g);
            tempB = compB.match(/\d+|./g);
            if (tempA !== null && tempB !== null) {
                tempLength = (tempA.length < tempB.length ? tempA.length : tempB.length);

                for (let i = 0; i < tempLength; i++) {
                    // 둘 다 숫자라면 차수로 정렬
                    if (!isNaN(parseInt(tempA[i])) && !isNaN(parseInt(tempB[i]))) {
                        return parseInt(tempA[i]) - parseInt(tempB[i]);
                    }

                    if (tempA[i] > tempB[i]) 
                        return 1;
                    else if (tempA[i] < tempB[i]) 
                        return -1;
                }
            }

            // 일정 수준까지 글자가 같으면 글자 개수가 작은 순대로 정렬
            if (compA.length > compB.length) return 1;
            else if (compA.length === compB.length) return 0;
            else return -1;
        case SORT_TYPES.TYPE_DATE:
            compA = a[attrA.date];
            compB = b[attrB.date];

            if (compA > compB) return 1;
            else if (compA === compB) return 0;
            else return -1;
    }
};

const setSortAttributes = (target) => {
    // 폴더, 파일 구분 없이 속성 불러오기 편하게 미리 속성 만드는 함수
    if (target.folder_code !== undefined) {
        // 폴더일 경우
        return {
            name: 'folder_name',
            date: 'last_modification_time'
        }
    } else {
        // 파일일 경우
        return {
            name: 'original_name',
            date: 'last_modification_time'
        }
    }
};

export { SORT_TYPES, doListSort };