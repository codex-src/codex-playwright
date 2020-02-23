import * as ppt from "./playwright"
import runeCount from "./runeCount"

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

test("can type and backspace characters", async () => {
	const data = "Hello, world! 😀\n\nHello, world! 😀\n\nHello, world! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete characters", async () => {
	const data = "Hello, world! 😀\n\nHello, world! 😀\n\nHello, world! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and backspace 100 paragraphs", async () => {
	const data = "\n".repeat(100)
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete 100 paragraphs", async () => {
	const data = "\n".repeat(100)
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})
