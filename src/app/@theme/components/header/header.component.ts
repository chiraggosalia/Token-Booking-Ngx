import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NB_WINDOW, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {AuthuserService} from "../../../auth/authuser.service";
import {Router} from "@angular/router";
import {PageReload} from "../../../baselayout/PageReload";
import { Auth } from 'aws-amplify';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  profileTitle:string = 'Profile';
  logoutTitle:string = 'Log out';
  managebookingTitle:string = 'Manage Booking';

  themes = [
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'default',
      name: 'Light',
    },

  ];

  currentTheme: string = 'dark';

  userMenu = [ { title: this.managebookingTitle }, { title: this.logoutTitle } ];
  clientMenu = [ { title: this.managebookingTitle }, { title: this.logoutTitle } ];
  adminMenu = [ { title: this.logoutTitle } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              @Inject(NB_WINDOW) private window,
              private authuserService:AuthuserService,
              private router: Router,
              private pageReloadService:PageReload) {
  }

  ngOnInit() {
    let currentUser: any = localStorage.getItem("currentUser");
    if (currentUser) {
      let currentUserJson: any = JSON.parse(currentUser);
      this.user = {'name': currentUserJson.userName, 'role': currentUserJson.role};
      if(this.user.role == 'ADMIN') {
        this.userMenu = this.adminMenu;
        this.menuService.navigateHome('menuTag');
      } else if (this.user.role == 'USER') {
        this.userMenu = this.clientMenu;
      }
    }

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.selectAction(title));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    let currentUser: any = localStorage.getItem("currentUser");
    if (currentUser) {
      let currentUserJson: any = JSON.parse(currentUser);
      if(currentUserJson.role == 'ADMIN') {
        this.pageReloadService.redirectTo('/base/admin');
      } else if (currentUserJson.role == 'USER') {
        this.pageReloadService.redirectTo('/base/client');
      }
    }
    return false;
  }

  selectAction(title) {
    if (title == this.logoutTitle) {
      this.authuserService.logout().subscribe(response => {
        if (response.status == "SUCCESS") {
          localStorage.removeItem("currentUser");
          Auth.signOut().then( () =>  this.router.navigate(['/auth/login']));
        }

      });
    } else if (title == this.managebookingTitle) {
      this.router.navigate(['/base/client/managebooking']);
    }
  }

}
