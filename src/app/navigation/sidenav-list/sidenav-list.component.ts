import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription = new Subscription();
  @Output() sidenavClosed = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onClosed() {
    this.sidenavClosed.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClosed();
  }
}
