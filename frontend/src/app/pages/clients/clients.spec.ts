import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClientsComponent } from './clients.component';
import { ApiService } from '../../services/api.service';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientsComponent,
        HttpClientTestingModule
      ],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // déclenche ngOnInit
    await fixture.whenStable();
  });

  // ✅ 1. test création composant
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ 2. test liste clients initiale
  it('should initialize clients as empty array or defined', () => {
    expect(component.clients).toBeDefined();
    expect(Array.isArray(component.clients)).toBeTrue();
  });

  // ✅ 3. test objet client initial
  it('should initialize client object correctly', () => {
    expect(component.client).toBeDefined();
    expect(component.client.nom).toBe('');
    expect(component.client.prenom).toBe('');
  });

  // ✅ 4. test edit mode initial
  it('should have editMode false initially', () => {
    expect(component.editMode).toBeFalse();
  });

});