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

test("cannot backspace contenteditable", async () => {
	await page.backspace()
	await page.backspaceWord()
	await page.selectAll()
	await page.backspace()
	await page.selectAll()
	await page.backspaceWord()
	expect(await page.getCodex("#editor")).toBe("")
})

test("cannot delete contenteditable", async () => {
	await page.delete()
	await page.deleteWord()
	await page.selectAll()
	await page.delete()
	await page.selectAll()
	await page.deleteWord()
	expect(await page.getCodex("#editor")).toBe("")
})

test("can select-all backspace", async () => {
	await page.type("Hello, world! 😀")
	await page.selectAll()
	await page.backspace()
	await page.type("Hello, world! 😀")
	await page.selectAll()
	await page.backspaceWord()
	expect(await page.getCodex("#editor")).toBe("")
})

test("can select-all delete", async () => {
	await page.type("Hello, world! 😀")
	await page.selectAll()
	await page.delete()
	await page.type("Hello, world! 😀")
	await page.selectAll()
	await page.deleteWord()
	expect(await page.getCodex("#editor")).toBe("")
})
