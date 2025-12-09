import { test, expect } from '@playwright/test';

test.describe('Profiles Management', () => {
    const timestamp = Date.now();
    const user = {
        name: `Profile Tester ${timestamp}`,
        email: `profile_${timestamp}@example.com`,
        password: 'Password123!',
    };

    test('should create and delete a profile', async ({ page }) => {
        test.slow(); // Mark test as slow (x3 timeout)

        // 1. Register inline
        await page.goto('/register');
        await page.fill('input[placeholder="Tu nombre"]', user.name);
        await page.fill('input[placeholder="ejemplo@correo.com"]', user.email);
        await page.fill('input[placeholder="******"]', user.password);
        await page.click('button[type="submit"]');
        await expect(page.getByText('¡Registro Exitoso!')).toBeVisible();

        // 2. Login
        await page.click('text=Iniciar Sesión');
        await page.fill('input[placeholder="ejemplo@correo.com"]', user.email);
        await page.fill('input[placeholder="******"]', user.password);
        await page.click('button[type="submit"]');
        await expect(page).not.toHaveURL(/\/login/);

        // 3. Go to profiles
        await page.goto('/profiles');

        // 4. Open Form
        await page.getByRole('button', { name: /Crear nuevo perfil/i }).click();

        // 5. Fill Form
        await page.fill('input[name="name"]', 'Ex-Partner Test');

        // Select Relation (using fill for datalist input)
        await page.fill('input[name="relation"]', 'Ex-pareja');

        // Select Gender
        await page.fill('input[name="gender"]', 'Hombre');

        // Select Communication Channel
        await page.fill('input[name="communicationChannel"]', 'WhatsApp');

        // Info text
        await page.fill('textarea[name="childrenInfo"]', 'Custody agreement');

        // Submit
        await page.click('button[type="submit"]');

        // Verify profile appears in list
        await expect(page.getByText('Ex-Partner Test')).toBeVisible();
        await expect(page.getByText('Ex-pareja')).toBeVisible();

        // Delete Profile
        // Find the profile card that contains our text, then click the delete button within it.
        // We'll use a dialog handler since delete uses confirm()
        page.on('dialog', dialog => dialog.accept());

        const deleteButton = page.locator('.card', { hasText: 'Ex-Partner Test' }).locator('button:has(.lucide-trash-2)');
        await deleteButton.click();

        // Verify removal
        await expect(page.getByText('Ex-Partner Test')).not.toBeVisible();
    });
});
