import { expect, Page, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example app/);
});

test('has heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Example application' });
    await expect(heading).toBeVisible();
});

test.describe('check form visibility', () => {
    test('form heading is visible', async ({ page }) => {
        const { heading } = getFormElements(page);
        await expect(heading).toBeVisible();
    });

    test('email input is visible', async ({ page }) => {
        const { emailInput } = getFormElements(page);
        await expect(emailInput).toBeVisible();
    });

    test('password input is visible', async ({ page }) => {
        const { passwordInput } = getFormElements(page);
        await expect(passwordInput).toBeVisible();
    });

    test('age input is visible', async ({ page }) => {
        const { ageInput } = getFormElements(page);
        await expect(ageInput).toBeVisible();
    });
});

test.describe('check if form inputs have correct behaviour', () => {
    test.describe('email input has correct behaviour', () => {
        test('should show an error message if the email input is empty', async ({
            page,
        }) => {
            const { emailInput, submitButton } = getFormElements(page);

            await emailInput.fill('');
            await submitButton.click();

            const errorMessage = page.locator('text=Invalid email address');

            await expect(errorMessage).toBeVisible();
        });

        test('should show an error message if the email input is invalid', async ({
            page,
        }) => {
            const { emailInput, submitButton } = getFormElements(page);

            await emailInput.fill('invalid-email');
            await submitButton.click();

            const errorMessage = page.locator('text=Invalid email address');

            await expect(errorMessage).toBeVisible();
        });

        test('should not show an error message if the email input is valid', async ({
            page,
            browserName,
        }) => {
            const { emailInput, submitButton } = getFormElements(page);

            await emailInput.fill('example@donntu.ru');

            await submitButton.click();

            if (browserName === 'webkit') {
                // FIXME
                return;
            }

            const errorMessage = page.locator('text=Invalid email address');

            await expect(errorMessage).not.toBeVisible();
        });
    });

    test.describe('password input has correct behaviour', () => {
        test('should show an error message if the password is too short', async ({
            page,
        }) => {
            const { passwordInput, submitButton } = getFormElements(page);

            await passwordInput.fill('123');

            await passwordInput.blur();

            await submitButton.click();

            const errorMessage = page.locator(
                'text=The password must contain at least 5 characters and no more than 20',
            );

            await expect(errorMessage).toBeVisible();
        });

        test('should show an error message if the password is too long', async ({
            page,
        }) => {
            const { passwordInput, submitButton } = getFormElements(page);

            await passwordInput.fill('a'.repeat(21));
            await passwordInput.blur();

            await submitButton.click();

            const errorMessage = page.locator(
                'text=The password must contain at least 5 characters and no more than 20',
            );

            await expect(errorMessage).toBeVisible();
        });

        test('should not show an error message if the password is valid', async ({
            page,
            browserName,
        }) => {
            const { passwordInput, submitButton } = getFormElements(page);

            await passwordInput.fill('correctPassword123');
            await passwordInput.blur();

            await submitButton.click();

            if (browserName === 'webkit') {
                // FIXME
                return;
            }
            const errorMessage = page.locator(
                'text=The password must contain at least 5 characters and no more than 20',
            );

            await expect(errorMessage).not.toBeVisible();
        });
    });

    test.describe('age input has correct behaviour', () => {
        test('should show an error message if age is less than 18', async ({
            page,
        }) => {
            const { ageInput, submitButton } = getFormElements(page);

            await ageInput.fill('17');
            await ageInput.blur();

            await submitButton.click();

            const errorMessage = page.locator(
                'text=You must be at least 18 years old',
            );

            await expect(errorMessage).toBeVisible();
        });

        test('should not show an error message if age is valid', async ({
            page,
            browserName,
        }) => {
            const { ageInput, submitButton } = getFormElements(page);

            await ageInput.fill('25');
            await ageInput.blur();

            await submitButton.click();

            if (browserName === 'webkit') {
                // FIXME
                return;
            }

            const errorMessage = page.locator(
                'text=You must be at least 18 years old',
            );
            await expect(errorMessage).not.toBeVisible();
        });
    });
});

test.describe('form submission behaviour', () => {
    test('should display a success message when all inputs are correct', async ({
        page,
        browserName,
    }) => {
        const { emailInput, passwordInput, ageInput, submitButton } =
            getFormElements(page);

        await emailInput.fill('admin@donntu.ru');
        await passwordInput.fill('admin');
        await ageInput.fill('25');

        await submitButton.click();

        if (browserName === 'webkit') {
            // FIXME
            return;
        }

        const successMessage = page.locator('text=Successful logging in :)');

        await expect(successMessage).toBeVisible();
    });

    test('should display an error message when valid but incorrect data is entered', async ({
        page,
        browserName,
    }) => {
        const { emailInput, passwordInput, ageInput, submitButton } =
            getFormElements(page);

        await emailInput.fill('user@donntu.ru');
        await passwordInput.fill('wrongpassword');
        await ageInput.fill('25');

        await submitButton.click();

        if (browserName === 'webkit') {
            // FIXME
            return;
        }

        const errorMessage = page.locator('text=Error while logging in :(');

        await expect(errorMessage).toBeVisible();
    });
});

function getFormElements(page: Page) {
    const heading = page.getByRole('heading', { name: 'Example log in form' });

    const form = page.locator('form');

    const emailInput = form.locator('input[name="email"]');

    const passwordInput = form.locator('input[name="password"]');

    const ageInput = form.locator('input[name="age"]');

    const submitButton = form.getByRole('button', { name: 'Submit' });

    return { heading, form, emailInput, passwordInput, ageInput, submitButton };
}
