"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MENUITEMS = [
    {
        label: 'Navigation',
        main: [
            {
                state: 'dashboard',
                name: 'Dashboard',
                type: 'link',
                icon: 'icon-home'
            },
            {
                state: 'widget',
                name: 'Widget',
                type: 'link',
                icon: 'icon-view-grid',
                badge: [
                    {
                        type: 'danger',
                        value: '100+'
                    }
                ]
            }
        ],
    },
    {
        label: 'Forms',
        main: [
            {
                state: 'forms',
                name: 'Form Components',
                type: 'sub',
                icon: 'icon-layers',
                children: [
                    {
                        state: 'basic-elements',
                        name: 'Form Components'
                    }, {
                        state: 'add-on',
                        name: 'Form-Elements-Add-On'
                    }, {
                        state: 'advance-elements',
                        name: 'Form-Elements-Advance'
                    }, {
                        state: 'form-validation',
                        name: 'Form Validation'
                    }
                ]
            }, {
                state: 'picker',
                main_state: 'forms',
                name: 'Form Picker',
                type: 'link',
                icon: 'icon-pencil-alt',
                badge: [
                    {
                        type: 'warning',
                        value: 'New'
                    }
                ]
            }, {
                state: 'select',
                main_state: 'forms',
                name: 'Form Select',
                type: 'link',
                icon: 'icon-shortcode'
            }, {
                state: 'masking',
                main_state: 'forms',
                name: 'Form Masking',
                type: 'link',
                icon: 'icon-write'
            }
        ]
    },
    {
        label: 'Extension',
        main: [
            {
                state: 'editor',
                name: 'Editor',
                type: 'sub',
                icon: 'icon-pencil-alt',
                children: [
                    {
                        state: 'none',
                        name: 'No One'
                    }
                ]
            },
            {
                state: 'file-upload-ui',
                name: 'File Upload',
                type: 'link',
                icon: 'icon-cloud-up'
            }, {
                state: 'change-log',
                name: 'Change Log',
                type: 'link',
                icon: 'icon-list',
                badge: [
                    {
                        type: 'warning',
                        value: '1.0'
                    }
                ]
            }
        ]
    }
];
var MenuItems = (function () {
    function MenuItems() {
    }
    MenuItems.prototype.getAll = function () {
        return MENUITEMS;
    };
    return MenuItems;
}());
MenuItems = __decorate([
    core_1.Injectable()
], MenuItems);
exports.MenuItems = MenuItems;
