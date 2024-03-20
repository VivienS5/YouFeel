import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupBackComponent } from './recup-back.component';

describe('RecupBackComponent', () => {
  let component: RecupBackComponent;
  let fixture: ComponentFixture<RecupBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecupBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecupBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
