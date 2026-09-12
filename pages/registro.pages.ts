// pages/registro.pages.ts
import { type Page, type Locator } from '@playwright/test';

export class RegistroPage {
    readonly page: Page;
    readonly nombreCompleto: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly edad: Locator;
    readonly botonRegistro: Locator;
    readonly enlaceIniciarSesion: Locator;
    readonly mensajeExito: Locator;
    readonly mensajeErrorContraseña: Locator;
    readonly mensajeMailSinFormato: Locator;
    readonly mensajeErrorEdad: Locator;
    readonly mensajeErrorNombre: Locator;
    readonly mensajeEmailDuplicado: Locator;
    readonly mensajePasswordObligatorio: Locator;
    readonly mensajeEdadObligatoria: Locator;
    readonly mensajeMailObligatorio: Locator;
    readonly mensajeNombreMinimo: Locator;
    readonly mensajeNombreMaximo: Locator;
    readonly mensajeContraseñaMaximo: Locator;
    readonly mensajeEdadMaximo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombreCompleto = page.getByLabel('Nombre completo');
        this.email = page.getByLabel('Email');
        this.password = page.getByLabel('Contraseña');
        this.edad = page.getByLabel('Edad');
        this.botonRegistro = page.getByRole('button', { name: 'Crear cuenta' });
        this.enlaceIniciarSesion = page.getByRole('link', { name: 'Inicia sesión' });

        // Mensajes de éxito
        this.mensajeExito = page.getByText('¡Registro exitoso! Tu cuenta ha sido creada.');

        // Mensajes de error — campos obligatorios
        this.mensajeErrorNombre = page.getByText('El nombre es obligatorio');
        this.mensajeMailObligatorio = page.getByText('El email es obligatorio');
        this.mensajePasswordObligatorio = page.getByText('La contraseña es obligatoria');
        this.mensajeEdadObligatoria = page.getByText('La edad es obligatoria');

        // Mensajes de error — formato y validación
        this.mensajeMailSinFormato = page.getByText('El email no tiene un formato válido');
        this.mensajeEmailDuplicado = page.getByText('Este email ya está registrado');

        // Mensajes de error — contraseña
        this.mensajeErrorContraseña = page.getByText('La contraseña debe tener al menos 8 caracteres');
        this.mensajeContraseñaMaximo = page.getByText('La contraseña no puede tener más de 64 caracteres');

        // Mensajes de error — nombre (la app usa el mismo texto para mínimo y máximo)
        this.mensajeNombreMinimo = page.getByText('El nombre debe tener entre 2 y 50 caracteres');
        this.mensajeNombreMaximo = page.getByText('El nombre debe tener entre 2 y 50 caracteres');

        // Mensajes de error — edad
        this.mensajeErrorEdad = page.getByText('Debes tener al menos 16 años');
        this.mensajeEdadMaximo = page.getByText('La edad máxima es 99');
    }

    async goto() {
        await this.page.goto('/registro');
    }

    async registro(nombre: string, email: string, password: string, edad: string) {
        await this.nombreCompleto.fill(nombre);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.edad.fill(edad);
        await this.botonRegistro.click();
    }
}
