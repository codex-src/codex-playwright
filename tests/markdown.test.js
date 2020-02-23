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

test("can type, backspace, and delete headers", async () => {
	const data = "# Hello, world! 😀\n## Hello, world! 😀\n### Hello, world! 😀\n#### Hello, world! 😀\n##### Hello, world! 😀\n###### Hello, world! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete blockquotes", async () => {
	const data = "> Hello, world! 😀\n>\n> Hello, world! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete code blocks", async () => {
	const data = "```\nHello, world! 😀\n```\n```go\nHello, world! 😀\n```"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete code blocks", async () => {
	const data = "---\n***"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete emphasis", async () => {
	const data = "Hello, _world_! 😀\nHello, *world_* 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete strong", async () => {
	const data = "Hello, **world**! 😀\nHello, __world__! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete strong emphasis", async () => {
	const data = "Hello, ***world***! 😀\nHello, ___world___! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete code", async () => {
	const data = "Hello, `world`! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})

test("can type, backspace, and delete strikethrough", async () => {
	const data = "Hello, ~world~! 😀\nHello, ~~world~~! 😀"
	const count = runeCount(data)
	await page.type(data)
	expect(await page.getCodex("#editor")).toBe(data)
	await page.backspace(count)
	expect(await page.getCodex("#editor")).toBe("")
	await page.type(data)
	await page.left(count)
	await page.delete(count)
	expect(await page.getCodex("#editor")).toBe("")
})
