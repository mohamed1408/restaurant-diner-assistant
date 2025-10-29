import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerloginComponent } from './cutomerlogin.component';

describe('CutomerloginComponent', () => {
  let component: CutomerloginComponent;
  let fixture: ComponentFixture<CutomerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutomerloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
