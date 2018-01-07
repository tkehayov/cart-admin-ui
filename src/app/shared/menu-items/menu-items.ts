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
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'sub',
        icon: 'icon-home',
        children: [
          {
            state: 'default',
            name: 'Default'
          },
          {
            state: 'ecommerce',
            name: 'Ecommerce'
          },
          {
            state: 'analytics',
            name: 'Analytics',
            badge: [
              {
                type: 'info',
                value: 'NEW'
              }
            ]
          }
        ]
      },
      {
        state: 'navigation',
        short_label: 'N',
        name: 'Navigation',
        type: 'link',
        icon: 'icon-layout-cta-right'
      },
      {
        state: 'widget',
        short_label: 'W',
        name: 'Widget',
        type: 'sub',
        icon: 'icon-view-grid',
        badge: [
          {
            type: 'danger',
            value: '100+'
          }
        ],
        children: [
          {
            state: 'statistic',
            name: 'Statistic'
          },
          {
            state: 'data',
            name: 'Data'
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
      },
      {
        state: 'select',
        short_label: 'S',
        main_state: 'forms',
        name: 'Form Select',
        type: 'link',
        icon: 'icon-shortcode'
      }
    ]
  },
  {
    label: 'Other',
    main: [
      {
        state: '',
        short_label: 'M',
        name: 'Menu Levels',
        type: 'sub',
        icon: 'icon-direction-alt',
        children: [
          {
            state: '',
            name: 'Menu Level 2.1',
            target: true
          }, {
            state: '',
            name: 'Menu Level 2.2',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.2.1',
                target: true
              },
              {
                state: '',
                name: 'Menu Level 2.2.2',
                target: true
              }
            ]
          }, {
            state: '',
            name: 'Menu Level 2.3',
            target: true
          }, {
            state: '',
            name: 'Menu Level 2.4',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.4.1',
                target: true
              },
              {
                state: '',
                name: 'Menu Level 2.4.2',
                target: true
              }
            ]
          }
        ]
      },
      {
        state: 'simple-page',
        short_label: 'S',
        name: 'Simple Page',
        type: 'link',
        icon: 'icon-layout-sidebar-left'
      }
    ]
  },
  {
    label: 'Support',
    main: [
      /*{
        state: 'documentation',
        short_label: 'D',
        name: 'Documentation',
        external: 'http://html.codedthemes.com/guru-able/doc-angular-4',
        type: 'external',
        icon: 'icon-file',
        target: true
      },*/
      {
        state: 'submit-issue',
        short_label: 'S',
        external: 'https://codedthemes.com/submit-ticket/',
        name: 'Submit Issue',
        type: 'external',
        icon: 'icon-layout-list-post',
        target: true
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
