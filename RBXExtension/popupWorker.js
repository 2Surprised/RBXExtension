let friendActivityTrackerCheckbox = {}
let avatarHeadshotRedirectCheckbox = {}

function init() {
    friendActivityTrackerCheckbox = document.getElementById('friend-activity-tracker')
    avatarHeadshotRedirectCheckbox = document.getElementById('avatar-headshot-redirect')
    
    async function saveOptions() {
        const isFriendActivityTrackerEnabled = friendActivityTrackerCheckbox.checked
        const isAvatarHeadshotURLRedirectEnabled = avatarHeadshotRedirectCheckbox.checked
        await chrome.storage.sync.set(
            {
                enableFriendActivityTracker: isFriendActivityTrackerEnabled,
                enableAvatarHeadshotURLRedirect: isAvatarHeadshotURLRedirectEnabled
            }
        )
    }

    document.getElementById('friend-activity-tracker').addEventListener('change', saveOptions)
    document.getElementById('avatar-headshot-redirect').addEventListener('change', saveOptions)
}

async function restoreOptions() {
    const items = await chrome.storage.sync.get(
        {
            enableFriendActivityTracker: true,
            enableAvatarHeadshotURLRedirect: true
        }
    )
    friendActivityTrackerCheckbox.checked = items.enableFriendActivityTracker
    avatarHeadshotRedirectCheckbox.checked = items.enableAvatarHeadshotURLRedirect
}

document.addEventListener('DOMContentLoaded', init)
document.addEventListener('DOMContentLoaded', restoreOptions)