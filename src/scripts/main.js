'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll("#checkbox2, #checkbox5, #table-checkbox1");

    for (let index = 0; index < checkboxes.length; index++) {
        checkboxes[index].indeterminate = true;
    }
}, false);
