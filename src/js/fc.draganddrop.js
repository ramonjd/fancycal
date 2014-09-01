/*
HTML5 drag and drop

var myobject = new DragAndDrop();

myobject.onDragStart();

*/

var fc = fc || {};
fc.draganddrop = (function(){
    'use strict';
        /**
         * Creates an instance of DragAndDrop.
         *
         * @constructor
         * @this {DragAndDrop}
         */
        function DragAndDrop() {
            this.elem = null;
            return this;
        }

        /**
         *
         * @this {DragAndDrop}
         * @params {object} e
         * @params {function} callback
         * @returns {DragAndDrop}
         */
        DragAndDrop.prototype.onDragStart = function (e, callback) {
            if (typeof callback === 'function') {
               callback(e);
            }
            return this;
        };
        /**
         *
         * @this {DragAndDrop}
         * @params {object} e
         * @params {function} callback
         * @returns {DragAndDrop}
         */
        DragAndDrop.prototype.onDragOver = function (e, callback) {
            if (typeof callback === 'function') {
                callback(e);
            }
            return this;
        };
        /**
         *
         * @this {DragAndDrop}
         * @params {object} e
         * @params {function} callback
         * @returns {DragAndDrop}
         */
        DragAndDrop.prototype.onDrop = function (e, callback) {
            if (typeof callback === 'function') {
                callback(e);
            }
            return this;
        };

        return DragAndDrop;


    }());