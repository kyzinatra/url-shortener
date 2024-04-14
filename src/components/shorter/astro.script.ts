const res: HTMLParagraphElement = document.querySelector(".form__result")!;
const save: HTMLButtonElement = document.querySelector(".form__save")!;

function select(e: Event) {
	const target = (e.target as HTMLElement).closest("p")!;
	const selection = window.getSelection();
	const range = document.createRange();
	range.selectNodeContents(target);
	selection?.removeAllRanges(); // очистить существующее выделение
	selection?.addRange(range); // добавить новый диапазон

	if (navigator.clipboard) {
		navigator.clipboard.writeText(target.textContent || "");
	}
}

res.addEventListener("click", select);

res.addEventListener("keyup", (e) => {
	if (e.key === "Enter") select(e);
});

save.addEventListener("click", () => {
	const a = document.createElement("a"); //Create <a>
	const image: HTMLImageElement = document.querySelector("img")!;
	console.log(image.src);
	a.href = image.src; //Image Base64 Goes here
	a.download = "QRCode.png"; //File name Here
	a.click(); //Downloaded file
});
