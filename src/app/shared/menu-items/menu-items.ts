import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'products',
        name: 'Products',
        type: 'link',
        icon: 'icon-layout-cta-right'
      },
      {
        state: 'navigation',
        short_label: 'N',
        name: 'Navigation',
        type: 'link',
        icon: 'icon-layout-cta-right'
      }
    ],
  },
  {
    label: 'Forms',
    main: [
      {
        state: 'forms',
        short_label: 'F',
        name: 'Form',
        type: 'sub',
        icon: 'icon-layers',
        children: [
          {
            state: 'basic',
            name: 'Components'
          }, {
            state: 'add-on',
            name: 'Add-On'
          }, {
            state: 'advance',
            name: 'Advance'
          }, {
            state: 'validation',
            name: 'Validation'
          }
        ]
      },
      {
        state: 'picker',
        short_label: 'P',
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
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
