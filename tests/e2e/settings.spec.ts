import { test, expect } from '@playwright/test';

test.describe('Settings Flow', () => {
    const timestamp = Date.now();
    const user = {
        name: `Settings Tester ${timestamp}`,
        email: `test_settings_${timestamp}@example.com`,
        password: 'Password123!',
    };

    test.beforeAll(async ({ browser }) => {
        // Create a context and page to register/login once if possible, 
        // but for isolation we often do it per test or store state.
        // For simplicity in this iteration, we'll register a user for this suite.
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/register');
        await page.fill('input[placeholder="Tu nombre"]', user.name);
        await page.fill('input[placeholder="ejemplo@correo.com"]', user.email);
        await page.fill('input[placeholder="******"]', user.password);
        await page.click('button[type="submit"]');
        await expect(page.getByText('¡Registro Exitoso!')).toBeVisible();
        await page.close();
    });

    test('should allow user to navigate to settings', async ({ page }) => {
        // Login
        await page.goto('/login');
        await page.fill('input[placeholder="ejemplo@correo.com"]', user.email);
        await page.fill('input[placeholder="******"]', user.password);
        await page.click('button[type="submit"]');
        await expect(page).not.toHaveURL(/\/login/);

        // Navigate to settings
        // Assuming there is a link or we can go directly
        await page.goto('/settings');

        // Check for common settings elements
        // This part depends on actual implementation.
        // We'll check for a heading "Configuración" or "Settings"
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
});
