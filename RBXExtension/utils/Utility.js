// Regular expressions
export const ExtensionName = 'RBXExtension'
export const RobloxWebsiteRegex = "^https?\:\/\/([a-z0-9\-]+\.)*roblox\.com(.+)?$"
export const RobloxPresenceRegex = "^https?\:\/\/presence\.roblox\.com"

// Error messages
export const errorMessage = {
    default: 'Something went wrong. Check the console for information.',
    noErrorsPassed: 'No errors were passed to the error handler!',
    fileReaderFail: 'FileReader could not process the data provided.',
    invalidUserId: 'Invalid user ID provided!',
    invalidWebResource: 'Invalid web resource provided!',
    avatarIconFail: 'Failed to fetch avatar icon.'
}

// Functions
export function errorHandler(errorObject) {
    if (!errorObject) { throw new Error(errorMessage.noErrorsPassed) }
    const cause = errorObject.cause
    if (cause) { cause = `\nCause: ${cause}` }
    console.error(`${ExtensionName}:`, errorObject, cause)
    return errorMessage.default;
}

export async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = () => resolve(fileReader.result)
        fileReader.onerror = () => reject(errorMessage.fileReaderFail)
        fileReader.readAsDataURL(blob)
    })
}

export async function getDataUrlFromWebResource(url) {
    if (!url) { throw new Error(errorMessage.invalidWebResource) }
    return new Promise(async (resolve, _reject) => {
        const blob = await fetch(url).then(response => response.blob())
        const objectUrl = await blobToBase64(blob)
        resolve(objectUrl)
    })
    .catch(error => {
        errorHandler(error)
    })
}

// Extension logic
export function isUserIdValid(userId) {
    if (!userId || typeof(userId) !== 'number') { return false };
    return true;
}

export async function getUserFromUserId(userId) {
    if (!isUserIdValid(userId)) { throw new Error(errorMessage.invalidUserId) }
    return new Promise(async (resolve, _reject) => {
        const userObject = await fetch(`https://users.roblox.com/v1/users/${userId}`).then(response => response.json())
        resolve(userObject)
    })
    .catch(error => {
        errorHandler(error)
    })
}

// type = 'avatar', 'avatar-bust', and 'avatar-headshot'
export async function getAvatarIconUrlFromUserId(userId, type = 'avatar-headshot', size = 420) {
    if (!isUserIdValid(userId)) { throw new Error(errorMessage.invalidUserId) }
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`https://thumbnails.roblox.com/v1/users/${type}?userIds=${userId}&size=${size}x${size}&format=Png&isCircular=false`).then(response => response.json())
        const iconObject = response.data[0]
        if (iconObject.state !== 'Completed') { reject(errorMessage.avatarIconFail) }
        resolve(iconObject.imageUrl)
    })
    .catch(error => {
        errorHandler(error)
    })
}
