export function getBase64(file: File | null, getFile: (file: string) => void) {
    if (typeof window === undefined) return;

    if (!file) return;

    if (typeof file === 'string' && !/^data/.test(file)) return getFile(file);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        getFile(reader.result as string);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export function getBase64Async(file: File | null): Promise<string> | undefined {
    if (typeof window === undefined) return;

    if (!file) return;

    return new Promise((resolve) => {
        if (typeof file === 'string' && !/^data/.test(file))
            return resolve(file);

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result as string);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    });
}

export function imageOnly(str: string) {
    return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(str);
}

export function docsOnly(str: string) {
    return /\.(pdf|doc|docx)$/i.test(str);
}

// export async function uploadFile(asset: ImageFile) {
// 	if (!/^data/.test(asset.uri)) return { uri: asset.uri }
// 	const { data } = await fetcher('/api/upload', asset, { method: "POST" })

// 	return data?.data
// }

export async function base64ToURL(base64Data?: string) {
    let data = '';

    if (!base64Data) return '';

    if (!/^(?=data|http)/.test(base64Data)) return base64Data;

    data = await fetch(base64Data).then(async (res) => {
        const blob = await res.blob();
        return URL.createObjectURL(blob);
    });
    return data;
}
