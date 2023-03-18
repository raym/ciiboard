import { expect, test } from '@playwright/test';

test('page has expected prompts', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('heading', {
			name: 'Type the decimal value of an ascii character',
			level: 1
		})
	).toBeVisible();

	await expect(
		page.getByRole('heading', {
			name: 'Then press enter',
			level: 2
		})
	).toBeVisible();

	await expect(
		page.getByText('For example, type 65+enter to print A. 65-90 => A-Z and 97-122 => a-z')
	).toBeVisible();
});

test('help text appears when needed (input field is clicked), clears once help is no longer needed', async ({
	page
}) => {
	const EXPECTED_HELP_TEXT = 'just start typing, this field is disabled';
	const helpText = () => page.getByPlaceholder(EXPECTED_HELP_TEXT, { exact: true });
	await page.goto('/');

	await expect(page.getByPlaceholder('', { exact: true })).toBeVisible();

	await page.getByPlaceholder('', { exact: true }).click({ force: true });
	await expect(helpText()).toBeVisible();

	await page.keyboard.type('abc');
	await expect(helpText()).toBeVisible();

	await page.keyboard.type('123');
	await expect(helpText()).not.toBeVisible();
	await expect(page.getByPlaceholder('', { exact: true })).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveValue('123');

	await page.getByRole('textbox').click({ force: true });
	await expect(helpText()).toBeVisible();
	await expect(page.getByRole('textbox')).toHaveValue('');
});

test('when characters are typed, only numerical characters are added to the input field', async ({
	page
}) => {
	await page.goto('/');

	await expect(page.getByRole('textbox')).toHaveValue('');

	await page.keyboard.type('The meaning of life is 42?!');

	await expect(page.getByRole('textbox')).toHaveValue('42');
});

test('typing numbers and then pressing Enter will print the ascii value to the page and clear the input', async ({
	page
}) => {
	await page.goto('/');

	// prevent page.keyboard from typing before the page is loaded
	await expect(page.getByRole('textbox')).toHaveValue('');

	await page.keyboard.type('80');
	await page.keyboard.press('Enter');
	await page.keyboard.type('79');
	await page.keyboard.press('Enter');
	await page.keyboard.type('87');
	await page.keyboard.press('Enter');
	await page.keyboard.type('33');
	await page.keyboard.press('Enter');

	await expect(page.getByText('POW!')).toBeVisible();
});
