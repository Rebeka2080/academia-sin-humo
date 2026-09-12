// pages/login-pages.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly botonIngresar: Locator;
    readonly mensajeError: Locator;
    readonly mensajeExito: Locator;
    readonly mensajeEmailObligatorio: Locator;
    readonly mensajePasswordObligatorio: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByLabel('Email');
        this.password = page.getByLabel('Contraseña');
        this.botonIngresar = page.getByRole('button', { name: 'Iniciar sesión' });
        this.mensajeError = page.getByText('Email o contraseña incorrectos');
        this.mensajeExito = page.getByText('Has iniciado sesión correctamente.');
        this.mensajeEmailObligatorio = page.getByText('El email es obligatorio');
        this.mensajePasswordObligatorio = page.getByText('La contraseña es obligatoria');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.botonIngresar.click();
    }
}