import QRCode from "qrcode";

export async function generateQR(link: string) {
	return QRCode.toDataURL(link, {
		margin: 1,
		scale: 9,
	});
}
