// Regular expressions
export const ExtensionName = 'RBXExtension'
export const RobloxWebsiteRegex = "^https?\:\/\/([a-z0-9\-]+\.)*roblox\.com(.+)?$"
export const RobloxWWWRegex = "^https?\:\/\/www\.roblox\.com"
export const RobloxLoginRegex = "^https?\:\/\/www\.roblox\.com\/?([Ll]ogin)?$"
export const RobloxPresenceRegex = "^https?\:\/\/presence\.roblox\.com"

// Functions
export function removeValueFromArray(array: any[], value: any): void {
    if (typeof(value) === 'object') {
        for (let index = 0; index < array.length; index++) {
            const element = array[index]
            try {
                if (JSON.stringify(element) === JSON.stringify(value)) {
                    array.splice(index, 1)
                }
            } catch (error) {
                // Some elements of the array may not be objects, this prevents an error from throwing
            }
        }
    } else {
        for (let index = 0; index < array.length; index++) {
            const element = array[index]
            if (element === value) {
                array.splice(index, 1)
            }
        }
    }
}

export async function blobToDataUrl(blob: Blob): Promise<Base64URLString> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = () => resolve(<Base64URLString>fileReader.result)
        fileReader.onerror = () => reject(new Error(ErrorMessage.FileReaderFail))
        fileReader.readAsDataURL(blob)
    })
}

export async function getDataUrlFromWebResource(url: URL): Promise<Base64URLString> {
    return new Promise(async (resolve, _reject) => {
        const blob = await fetch(url).then(response => response.blob())
        const dataUrl: Base64URLString = await blobToDataUrl(blob)
        resolve(dataUrl)
    })
}

// Extension logic
export async function getUserFromUserId(userId: number): Promise<UserObject> {
    return new Promise(async (resolve, _reject) => {
        const userObject = await fetch(`https://users.roblox.com/v1/users/${userId}`).then(response => response.json())
        resolve(userObject)
    })
}

// TODO: Resolve issue with fetch request not returning a 200
export async function getAvatarIconUrlFromUserId(userId: number, type: AvatarIconStyle = AvatarIconStyle.avatarHeadshot, size: AvatarIconSize = AvatarIconSize.FourHundredAndTwenty): Promise<URL> {
    return new Promise(async (resolve, reject) => {
        const response: ThumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/users/${type}?userIds=${userId}&size=${size}x${size}&format=Png&isCircular=false`).then(response => response.json())
        const iconObject = response.data[0]
        if (!iconObject) { reject(new Error(ErrorMessage.AvatarIconFail, { cause: `User ID: ${userId}\nResponse body: ${response}` })) }
        if (iconObject!.state !== 'Completed') { reject(new Error(ErrorMessage.AvatarIconFail, { cause: `User ID: ${userId}\nResponse body: ${response}\niconObject: ${iconObject}` })) }
        resolve(iconObject!.imageUrl)
    })
}
