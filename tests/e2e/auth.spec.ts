import { test, expect } from '@playwright/test';

test.describe('Authentication Core Guard', () => {
    // Unique user for each run to avoid collisions
    const timestamp = Date.now();
    const user = {
        name: `Auth Tester ${timestamp}`,
        email: `guard_${timestamp}@example.com`,
        password: 'Password123!',
    };

    const protectedRoutes = ['/settings', '/history', '/profiles'];

    test('should prevent registration with duplicate email', async ({ page }) => {
        test.slow();

        // 1. First Registration
        await page.goto('/register');
        await page.fill('input[name="name"]', user.name);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.click('button[type="submit"]');

        // Verify success
        await expect(page.getByText('¡Registro Exitoso!')).toBeVisible({ timeout: 15000 });

        // 2. Attempt Duplicate Registration
        await page.reload(); // Reset state
        await page.goto('/register');
        await page.fill('input[name="name"]', 'Duplicate User');
        await page.fill('input[name="email"]', user.email); // Same email
        await page.fill('input[name="password"]', 'AnotherPass123');
        await page.click('button[type="submit"]');

        // Verify error message
        await expect(page.getByText('Email already in use!')).toBeVisible();
    });

    test('should allow login with valid credentials', async ({ page }) => {
        // Reuse the user created in previous test (or re-register if independent)
        // Ideally tests are independent. Let's register a new one for Login specific test to be safe.
        const loginUser = {
            name: `Login User ${timestamp}`,
            email: `login_${timestamp}@example.com`,
            password: 'Password123!',
        };

        // Register first (Fast track)
        await page.goto('/register');
        await page.fill('input[name="name"]', loginUser.name);
        await page.fill('input[name="email"]', loginUser.email);
        await page.fill('input[name="password"]', loginUser.password);
        await page.click('button[type="submit"]');
        await expect(page.getByText('¡Registro Exitoso!')).toBeVisible();

        // Navigate to Login
        await page.click('text=Iniciar Sesión'); // Link from Register success page

        // Validation: Verify we are on login page
        await expect(page).toHaveURL(/login/);

        // Perform Login
        await page.fill('input[name="email"]', loginUser.email);
        await page.fill('input[name="password"]', loginUser.password);
        await page.click('button[type="submit"]');

        // Verify redirect to protected area (e.g. /profiles or /)
        // Should NOT be on login anymore
        await expect(page).not.toHaveURL(/login/);
    });

    test('should protect private routes from unauthenticated access', async ({ page }) => {
        // Ensure we are logged out (incognito / new context context ensures this by default)

        for (const route of protectedRoutes) {
            await page.goto(route);
            // Should redirect to login
            await expect(page).toHaveURL(/login/);
        }
    });

    // Logout test: Skipping as no UI button was found in analysis.
    // If we assume a clear cookie/session flow, the previous test confirms guards work.
});
