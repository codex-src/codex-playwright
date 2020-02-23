import * as ppt from "../lib/playwright"
import runeCount from "../lib/runeCount"

let page = null
let done = null

beforeAll(async () => {
	jest.setTimeout(600e3)
	const browserStr = process.env.BROWSER
	;[page, done] = await ppt.openPage(browserStr, "http://localhost:3000/demo")
})

afterAll(async () => {
	await done()
})

beforeEach(async () => {
	await page.focus("#editor")
	await page.clear()
})

test("can type and backspace smileys", async () => {
	const data = "😀😃😄😁😆😅🤣😂🙂🙃😉😊😇"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and backspace handshakes", async () => {
	const data = "🧑‍🤝‍🧑🧑🏻‍🤝‍🧑🏻🧑🏻‍🤝‍🧑🏼🧑🏻‍🤝‍🧑🏽🧑🏻‍🤝‍🧑🏾🧑🏻‍🤝‍🧑🏿🧑🏼‍🤝‍🧑🏻🧑🏼‍🤝‍🧑🏼🧑🏼‍🤝‍🧑🏽🧑🏼‍🤝‍🧑🏾🧑🏼‍🤝‍🧑🏿🧑🏽‍🤝‍🧑🏻🧑🏽‍🤝‍🧑🏼🧑🏽‍🤝‍🧑🏽🧑🏽‍🤝‍🧑🏾🧑🏽‍🤝‍🧑🏿🧑🏾‍🤝‍🧑🏻🧑🏾‍🤝‍🧑🏼🧑🏾‍🤝‍🧑🏽🧑🏾‍🤝‍🧑🏾🧑🏾‍🤝‍🧑🏿🧑🏿‍🤝‍🧑🏻🧑🏿‍🤝‍🧑🏼🧑🏿‍🤝‍🧑🏽🧑🏿‍🤝‍🧑🏾🧑🏿‍🤝‍🧑🏿"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and backspace flags", async () => {
	const data = "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete smileys", async () => {
	const data = "😀😃😄😁😆😅🤣😂🙂🙃😉😊😇"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete handshakes", async () => {
	const data = "🧑‍🤝‍🧑🧑🏻‍🤝‍🧑🏻🧑🏻‍🤝‍🧑🏼🧑🏻‍🤝‍🧑🏽🧑🏻‍🤝‍🧑🏾🧑🏻‍🤝‍🧑🏿🧑🏼‍🤝‍🧑🏻🧑🏼‍🤝‍🧑🏼🧑🏼‍🤝‍🧑🏽🧑🏼‍🤝‍🧑🏾🧑🏼‍🤝‍🧑🏿🧑🏽‍🤝‍🧑🏻🧑🏽‍🤝‍🧑🏼🧑🏽‍🤝‍🧑🏽🧑🏽‍🤝‍🧑🏾🧑🏽‍🤝‍🧑🏿🧑🏾‍🤝‍🧑🏻🧑🏾‍🤝‍🧑🏼🧑🏾‍🤝‍🧑🏽🧑🏾‍🤝‍🧑🏾🧑🏾‍🤝‍🧑🏿🧑🏿‍🤝‍🧑🏻🧑🏿‍🤝‍🧑🏼🧑🏿‍🤝‍🧑🏽🧑🏿‍🤝‍🧑🏾🧑🏿‍🤝‍🧑🏿"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete flags", async () => {
	const data = "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})
