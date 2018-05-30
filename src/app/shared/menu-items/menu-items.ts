import { Injectable } from '@angular/core';

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
        icon: 'ti-gift',
        children: [
          {
            state: 'view',
            name: 'View'
          }
        ]
      },
      {
        state: 'categories',
        name: 'Categories',
        type: 'link',
        icon: 'ti-view-grid'
      },
      {
        state: 'orders',
        name: 'Orders',
        type: 'link',
        icon: 'ti-truck'
      }
    ],
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
