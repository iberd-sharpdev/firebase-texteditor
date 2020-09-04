import { EditorComponent } from './editor.component';

//@ts-ignore
export const MathJaxExtension = MediumEditor.Extension.extend({
    name: 'mathjax-plugin',
    init: function () {
        this.subscribe('editableKeydown', this.handleKeyDown.bind(this));
    },
    handleKeyDown: function (event, editable) {
        if (event.key !== '$') return;

        let regex = /\$[^\$]+\$/g;
        setTimeout(() => {
            const result = regex.exec(editable.innerHTML);
            console.log('MATCH!', result);

            if (!result) return;

            const div = document.createElement('div');
            div.id = '__mathTemp';
            div.innerHTML = result[0];
            div.style.display = 'none';
            document.body.appendChild(div);

            MathJax.Hub.Queue(
                ["Typeset", MathJax.Hub, "__mathTemp"],
                // @ts-ignore
                function () {
                    const startIdx = result.index;
                    const endIdx = editable.innerHTML.lastIndexOf('$');
                    const id = new Date().getTime();
                    editable.innerHTML = editable.innerHTML.splice(startIdx, endIdx + 1, '' + div.innerHTML.replace('<br>', '') + `<span id="${id}"></span>`);
                    document.body.removeChild(div);

                    const el = document.getElementById(id.toString());
                    // @ts-ignore
                    MediumEditor.selection.moveCursor(document, el, 0);
                }
            );
        });
    }
});
