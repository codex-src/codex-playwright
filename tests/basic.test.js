import * as ppt from "./playwright"
import len from "./len"

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

test("cannot delete contenteditable", async () => {
	await page.backspace()
	await page.backspaceWord()
	await page.delete()
	await page.deleteWord()
	await page.selectAll()
	await page.backspace()
	await page.selectAll()
	await page.backspaceWord()
	await page.selectAll()
	await page.delete()
	await page.selectAll()
	await page.deleteWord()
	expect(await page.getCodex("#editor")).toBe("")
})

test("can select-all delete", async () => {
	await page.selectAll()
	await page.backspace()
	expect(await page.getCodex("#editor")).toBe("")
})

test("can select-all delete (forwards)", async () => {
	await page.selectAll()
	await page.delete()
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete characters", async () => {
	const data = "Hello, world! 😀\n\nHello, world! 😀\n\nHello, world! 😀"
	const count = len(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete (forwards) characters", async () => {
	const data = "Hello, world! 😀\n\nHello, world! 😀\n\nHello, world! 😀"
	const count = len(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete 10 paragraphs", async () => {
	const data = "\n".repeat(10)
	const count = len(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete (forwards) 10 paragraphs", async () => {
	const data = "\n".repeat(10)
	const count = len(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete 100 paragraphs", async () => {
	const data = "\n".repeat(100)
	const count = len(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type and delete (forwards) 100 paragraphs", async () => {
	const data = "\n".repeat(100)
	const count = len(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})
