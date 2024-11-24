/**
 * This component (`AppLayoutComponent`) is responsible for managing the overall layout of the application. 
 * It handles menu visibility (overlay, static, profile), body scroll blocking for mobile devices, 
 * and reacts to user interactions such as outside clicks or route changes to close menus.
 * It also applies dynamic CSS classes based on layout configuration and states.
 */

import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.services';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    // Subscription to track overlay menu events
    overlayMenuOpenSubscription: Subscription;

    // Listeners for detecting clicks outside the menus
    menuOutsideClickListener: any;
    profileMenuOutsideClickListener: any;

    // Reference to the HeaderComponent (e.g., top navigation bar)
    @ViewChild(HeaderComponent) appTopbar!: HeaderComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {
        // Subscribes to layout events for the overlay menu
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            // Sets up a listener for clicks outside the main menu
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    // Checks if the click occurred outside the menu
                    const isOutsideClicked = !(
                        this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || 
                        this.appTopbar.menuButton.nativeElement.contains(event.target)
                    );
                    
                    if (isOutsideClicked) {
                        this.hideMenu(); // Hides the menu
                    }
                });
            }

            // Sets up a listener for clicks outside the profile menu
            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || 
                        this.appTopbar.menu.nativeElement.contains(event.target) ||
                        this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || 
                        this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu(); // Hides the profile menu
                    }
                });
            }

            // Blocks body scroll when the static menu is active on mobile
            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        // Subscribes to router events to automatically hide menus on navigation
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu(); // Hides the main menu
                this.hideProfileMenu(); // Hides the profile menu
            });
    }

    // Hides the main menu and removes its listeners
    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll(); // Unblocks body scroll
    }

    // Hides the profile menu and removes its listeners
    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    // Prevents scrolling on the body element
    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    // Restores scrolling on the body element
    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    // Dynamically applies CSS classes based on layout configuration and states
    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config().colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
            'layout-overlay': this.layoutService.config().menuMode === 'overlay',
            'layout-static': this.layoutService.config().menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config().inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config().ripple
        };
    }

    // Cleans up resources and listeners when the component is destroyed
    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
