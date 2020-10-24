import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import LOCALE_TYPE from './Texts/locales.js';
import LOCALE_TEXT from './Texts';

import { DRAG_STATE, DragManager } from './dragManager.js';
import SHA256 from './sha256.js';
import { sizeText, getSizeText, decimalFixed } from './sizeType.js';
import { SORT_TYPES, doListSort } from './sort.js';



// 임시 - 추후 Redux로 옮길 예정
const LOCALE = LOCALE_TYPE.KR;
const TEXTS = LOCALE_TEXT(LOCALE);


const SERVER_URL = "https://192.168.219.110:3000";



/**
 * 윈도우 이벤트를 추가, 제거한다.
 * @param {object} events 추가하거나 제거할 이벤트
 * {
 *  add: {
 *      resize: listener
 *  },
 *  remove: {
 *      resize: listener
 *  }
 * }
 * @returns {error} window가 undefined일 때 error 반환
 */
const manageEventListener = (events) => {
    if (window === undefined) return new Error('Window is not defined');

    let eventManager;

    // 이벤트 등록
    if (events.add !== undefined) {
        eventManager = window.addEventListener;
        for (let [name, listener] of Object.entries(events.add)) {
            eventManager(name, listener);
        }
    }

    // 이벤트 해제
    if (events.remove !== undefined) {
        eventManager = window.removeEventListener;
        for (let [name, listener] of Object.entries(events.remove)) {
            eventManager(name, listener);
        }
    }
}



export { 
    React, Component,
    BrowserRouter, Route, Switch, Link,
    Motion, spring,
    connect,

    LOCALE, LOCALE_TYPE, TEXTS, SERVER_URL,

    
    manageEventListener,
    DRAG_STATE, DragManager,
    SHA256,
    sizeText, getSizeText, decimalFixed,
    SORT_TYPES, doListSort
};
