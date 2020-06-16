import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInstrumentoComponent } from './item-instrumento.component';

describe('ItemInstrumentoComponent', () => {
  let component: ItemInstrumentoComponent;
  let fixture: ComponentFixture<ItemInstrumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInstrumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInstrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
