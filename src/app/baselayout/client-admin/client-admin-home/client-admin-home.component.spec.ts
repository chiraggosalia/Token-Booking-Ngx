import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdminHomeComponent } from './client-admin-home.component';

describe('ClientAdminHomeComponent', () => {
  let component: ClientAdminHomeComponent;
  let fixture: ComponentFixture<ClientAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
