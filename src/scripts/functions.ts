///<reference path='typings/references.ts' />

jQuery(document).ready(function () {
    console.log('DOM Ready');

    let vt = new VT();
    vt.fetchComponents();
});