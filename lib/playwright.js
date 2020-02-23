import { execSync } from "child_process"

import {
	chromium as Chrome,
	firefox as Firefox,
	webkit as Safari,
} from "playwright"

const OPTIONS = { delay: +(process.env.DELAY || 16.67) }

const browserTypes = { Chrome, Firefox, Safari }

/* eslint-disable no-multi-spaces */
const ARROW_DOWN  = "ArrowDown"
const ARROW_LEFT  = "ArrowLeft"
const ARROW_RIGHT = "ArrowRight"
const ARROW_UP    = "ArrowUp"
const BACKSPACE   = "Backspace"
const DELETE      = "Delete"
const ENTER       = "Enter"
const MOD_ALT     = "Alt"
const MOD_META    = "Meta"
const MOD_SHIFT   = "Shift"
/* eslint-enable no-multi-spaces */

// Opens a new page from a browser string and a URL.
export async function openPage(browserStr, url) {
	let page = null
	let done = null
	try {
		if (!browserStr || browserStr === undefined) {
			console.warn("Try BROWSER=Chrome ...")
		}
		const browserType = browserTypes[browserStr]
		const args = []
		if (browserType === Chrome) {
			args.push("--window-size=1440,900")
		} else if (browserType === Firefox) {
			args.push("-width=1440", "-height=900")
		}
		const config = {
			headless: process.env.HEADLESS === "true" || false,
			args,
		}
		const browser = await browserType.launch(config)
		const context = await browser.newContext()
		page = await context.newPage(url)
		if (!config.headless && browserType === Firefox) {
			execSync("osascript -e 'activate application \"Nightly\"'")
		}
		await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: browserStr === Safari ? 2 : undefined })
		await page.waitFor(1e3, OPTIONS)
		page.on("pageerror", error => expect(error).toBeNull())
		done = browser.close
	} catch (e) {
		console.warn(e)
	}
	const _page = new Page(page, done)
	return [_page, done]
}

class Page {
	constructor(page, done) {
		this.page = page
		this.done = done
	}
	async done() {
		await this.done()
	}
	// (Custom)
	async getCodex(selector) {
		const data = await this.page.$eval(selector, node => window.getCodex(node.id))
		return data
	}
	// Focuses on a selector.
	async focus(selector) {
		await this.page.focus(selector)
	}
	// Selects all character data.
	async selectAll() {
		await this.page.keyboard.down(MOD_META)
		await this.page.keyboard.press("a", OPTIONS)
		await this.page.keyboard.up(MOD_META)
		try {
			// https://github.com/microsoft/playwright/issues/849
			await this.page.evaluate(() => document.execCommand("selectall", false, null))
		} catch (e) {
			// No-op
		}
	}
	// Clears character data based on a selector.
	async clear() {
		await this.selectAll()
		await this.backspace()
	}
	// Arrows left up to count times.
	async left(count = 1) {
		for (let index = 0; index < count; index++) {
			await this.page.keyboard.press(ARROW_LEFT, OPTIONS)
		}
	}
	// Arrows right up to count times.
	async right(count = 1) {
		for (let index = 0; index < count; index++) {
			await this.page.keyboard.press(ARROW_RIGHT, OPTIONS)
		}
	}
	// Arrows up up to count times.
	async up(count = 1) {
		for (let index = 0; index < count; index++) {
			await this.page.keyboard.press(ARROW_UP, OPTIONS)
		}
	}
	// Arrows down up to count times.
	async down(count = 1) {
		for (let index = 0; index < count; index++) {
			await this.page.keyboard.press(ARROW_DOWN, OPTIONS)
		}
	}
	// Types character data.
	async type(data) {
		// NOTE: Do not use page.keyboard.type for paragraphs;
		// 😀<Enter> does not work as expected (because of
		// onKeyDown)
		for (const [index, each] of data.split("\n").entries()) {
			if (index) {
				// https://stackoverflow.com/a/39914235
				await new Promise(r => setTimeout(r, 5))
				await this.page.keyboard.press(ENTER, OPTIONS)
				await new Promise(r => setTimeout(r, 5))
			}
			await this.page.keyboard.type(each, OPTIONS)
		}
		// await this.page.keyboard.type(data, OPTIONS)
	}
	// Deletes up to count characters.
	async backspace(count = 1) {
		for (let index = 0; index < count; index++) {
			await this.page.keyboard.press(BACKSPACE, OPTIONS)
		}
	}
	// Deletes one word.
	async backspaceWord() {
		await this.page.keyboard.down(MOD_ALT)
		await this.page.keyboard.press(BACKSPACE, OPTIONS)
		await this.page.keyboard.up(MOD_ALT)
	}
	// Deletes up to count characters (forwards).
	async delete(count = 1) {
		for (let index = 0; index < count; index++) {
			await this.page.keyboard.press(DELETE, OPTIONS)
		}
	}
	// Deletes one word (forwards).
	async deleteWord() {
		await this.page.keyboard.down(MOD_ALT)
		await this.page.keyboard.press(DELETE, OPTIONS)
		await this.page.keyboard.up(MOD_ALT)
	}
	// // Undos once (command-z).
	// async undo(page) {
	// 	await page.keyboard.down(MOD_META)
	// 	await page.keyboard.press("z", OPTIONS)
	// 	await page.keyboard.up(MOD_META)
	// }
	// // Redos once (shift-command-z).
	// async redo(page) {
	// 	await page.keyboard.down(MOD_META) // Start
	// 	await page.keyboard.down(MOD_SHIFT)
	// 	await page.keyboard.press("z", OPTIONS)
	// 	await page.keyboard.up(MOD_SHIFT)
	// 	await page.keyboard.up(MOD_META) // End
	// }
}
