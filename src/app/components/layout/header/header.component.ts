/**
 * The `HeaderComponent` is a standalone component that represents the header section of the application.
 * It manages the interaction with the menu buttons and provides references for layout-related actions.
 * It utilizes Angular's `ViewChild` decorator to gain access to DOM elements for dynamic manipulation.
 * The component is integrated with the Angular Router and uses common Angular functionalities.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../../services/layout.services';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  
  // Stores the menu items to be displayed in the header
  items!: MenuItem[];

  // Reference to the menu button element
  @ViewChild('menubutton') menuButton!: ElementRef;

  // Reference to the top bar menu button element
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  // Reference to the top bar menu container
  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) { }
}
