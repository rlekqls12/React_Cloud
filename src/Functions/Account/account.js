// 아이디 특수문자 입력 검사 regex
const checkSpecialChars = /[^A-Za-z0-9]/gi;

// 비밀번호 패스워드 속성 적용/해제
const onChangePasswordState = (element) => {
    let classes = element.target.className;
    let pwType;

    if (classes.indexOf(' ') !== -1)
        classes = classes.split(' ');
    else
        classes = [classes];

    if (classes.indexOf('active') !== -1) {
        classes[classes.indexOf('fa-eye-slash')] = 'fa-eye';
        classes.splice(classes.indexOf('active'), 1);
        pwType = 'password';
    } else {
        classes[classes.indexOf('fa-eye')] = 'fa-eye-slash';
        classes.push('active');
        pwType = 'text';
    }

    element.target.className = classes.join(' ');

    return pwType;
}

export { checkSpecialChars, onChangePasswordState };