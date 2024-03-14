import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmenuComponent } from './sidebarmenu.component';

describe('SidebarmenuComponent', () => {
  let component: SidebarmenuComponent;
  let fixture: ComponentFixture<SidebarmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
