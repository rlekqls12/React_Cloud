import { manageEventListener } from './common.js';

/**
 * 드래그&드롭
 */
const DRAG_STATE = {
    NONE: 'NONE',
    DRAGGING: 'DRAGGING',
    DROP: 'DROP'
}

const DragManager = function() {
    const listeners = [];
    let eventInit = false;
    let dragEvents;

    let dragCounter = 0;
    let state = DRAG_STATE.NONE;
    let dataTransfer;

    const preventDragEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    // 리스너에 드래그 상태 전달
    const sendDragState = () => {
        listeners.forEach((listener) => {
            if (typeof listener !== 'function') return;
            listener(state, dataTransfer);
        });
    }
    
    // 드래그 중일 때
    const handleDrag = (event) => {
        preventDragEvent(event);
    }

    // 화면에 들어왔을 때
    const handleDragIn = (event) => {
        preventDragEvent(event);

        const items = event.dataTransfer.items;
        if (items && items.length > 0) {
            dragCounter++;
            state = DRAG_STATE.DRAGGING;
            dataTransfer = event.dataTransfer;
            sendDragState();
        }
    }

    // 화면에서 나갔을 때
    const handleDragOut = (event) => {
        preventDragEvent(event);

        if (dragCounter > 0) dragCounter--;
        if (dragCounter === 0) {
            state = DRAG_STATE.NONE;
            dataTransfer = undefined;
            sendDragState();
        }
    }

    // 드래그가 끝났을 때
    const handleDrop = (event) => {
        preventDragEvent(event);

        if (state === DRAG_STATE.NONE) {
            event.dataTransfer.clearData();
            return;
        }

        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            state = DRAG_STATE.DROP;
            dataTransfer = event.dataTransfer;
            sendDragState();
        }

        event.dataTransfer.clearData();
        dragCounter = 0;
        state = DRAG_STATE.NONE;
        dataTransfer = undefined;
        sendDragState();
    }

    dragEvents = {
        'dragenter': handleDragIn,
        'dragleave': handleDragOut,
        'dragover': handleDrag,
        'drop': handleDrop
    }

    return {
        /**
         * 드래그 이벤트 추가
         */
        create: () => {
            if (eventInit) return;

            eventInit = true;
            manageEventListener({add: dragEvents});
        },
        /**
         * 드래그 이벤트 제거
         */
        destroy: () => {
            if (eventInit === false) return;

            eventInit = false;
            manageEventListener({remove: dragEvents});
        },
        /**
         * 드래그 이벤트 리스너 등록
         * @param {function} (state: string, dataTransfer: object) => {}
         */
        addDragStateListener: (listener) => {
            if (listeners.indexOf(listener) === -1) listeners.push(listener);
        },
        /**
         * 드래그 이벤트 리스너 해제
         * @param {function} (state: string, dataTransfer: object) => {}
         */
        removeDragStateListener: (listener) => {
            const listenerIndex = listeners.indexOf(listener);
            if (listenerIndex !== -1) listeners.splice(listenerIndex, 1);
        }
    };
};

export { DRAG_STATE, DragManager };