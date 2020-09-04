import { EditorComponent } from './editor.component';

// @ts-ignore
export const MathJaxExtension = MediumEditor.Extension.extend({
    name: 'mathjax-plugin',
    init() {
        this.subscribe('editableKeydown', this.handleKeyDown.bind(this));

        const div = document.createElement('div');
        div.id = '__mathTemp';
        div.innerHTML = "$x$";
        div.style.display = 'none';
        document.body.appendChild(div);
        MathJax.Hub.Queue(
            ['Typeset', MathJax.Hub, '__mathTemp'],
            // @ts-ignore
            function () {
                document.body.removeChild(div);
            });
    },
    handleKeyDown(event, editable) {
        if (event.key !== '$') { return; }

        const regex = /\$[^\$]+\$/g;
        setTimeout(() => {
            const result = regex.exec(editable.innerHTML);
            if (!result) { return; }

            const div = document.createElement('div');
            div.id = '__mathTemp';
            div.innerHTML = result[0];
            div.style.display = 'none';
            document.body.appendChild(div);

            MathJax.Hub.Queue(
                ['Typeset', MathJax.Hub, '__mathTemp'],
                // @ts-ignore
                function () {
                    const startIdx = result.index;
                    const endIdx = editable.innerHTML.lastIndexOf('$');
                    const id = new Date().getTime();
                    editable.innerHTML = editable.innerHTML.splice(startIdx, endIdx + 1, '' + div.innerHTML.replace('<br>', '') + `<span id="${id}">&nbsp;</span>`);
                    document.body.removeChild(div);

                    const el = document.getElementById(id.toString());
                    // @ts-ignore
                    MediumEditor.selection.moveCursor(document, el, 0);
                }
            );
        });
    }
});
