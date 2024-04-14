import QRCode from "qrcode";

export async function generateQR(link: string) {
	return QRCode.toDataURL(link);
}
