import { MEDIUM_BUTTONS } from './medium-buttons';

import { CoreOptions } from 'medium-editor';

export const MEDIUM_CONFIG: CoreOptions = {
    /* This example includes the default options for placeholder,
        if nothing is passed this is what it used */
    placeholder: {
        text: 'Type your text',
        // hideOnClick: true,
    },

    /* This example includes the default options to paste,
        if nothing is passed this is what it used */
    paste: {
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir', 'name'],
        cleanTags: ['meta'],
        unwrapTags: [],
    },

    /* These are the default options for the toolbar,
        if nothing is passed this is what it used */
    toolbar: {
        allowMultiParagraphSelection: true,
        buttons: MEDIUM_BUTTONS,
        diffLeft: 0,
        diffTop: -10,
        // firstButtonClass: 'medium-editor-button-first',
        // lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,

        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
    }
};
