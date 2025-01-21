let friendActivityTrackerCheckbox = {}
let friendActivityTrackerLabel = {}
let friendActivityTrackerLabelText = ''
let avatarHeadshotURLRedirectCheckbox = {}
let avatarHeadshotURLRedirectLabel = {}
let avatarHeadshotURLRedirectLabelText = ''
const greenEnabledText = '(<span class="green">Enabled</span>)'
const redDisabledText = '(<span class="red">Disabled</span>)'

function init() {
    friendActivityTrackerCheckbox = document.getElementById('friend-activity-tracker')
    friendActivityTrackerLabel = document.getElementById('friend-activity-tracker-label')
    friendActivityTrackerLabelText = friendActivityTrackerLabel.innerHTML
    avatarHeadshotURLRedirectCheckbox = document.getElementById('avatar-headshot-url-redirect')
    avatarHeadshotURLRedirectLabel = document.getElementById('avatar-headshot-url-redirect-label')
    avatarHeadshotURLRedirectLabelText = avatarHeadshotURLRedirectLabel.innerHTML

    async function saveOptions() {
        const isFriendActivityTrackerEnabled = friendActivityTrackerCheckbox.checked
        const isAvatarHeadshotURLRedirectEnabled = avatarHeadshotURLRedirectCheckbox.checked
        await chrome.storage.sync.set(
            {
                enableFriendActivityTracker: isFriendActivityTrackerEnabled,
                enableAvatarHeadshotURLRedirect: isAvatarHeadshotURLRedirectEnabled
            }
        )
    }

    document.getElementById('friend-activity-tracker').addEventListener('change', saveOptions)
    document.getElementById('avatar-headshot-url-redirect').addEventListener('change', saveOptions)

    chrome.storage.session.onChanged.addListener(changes => {
        if (!changes.debuggerState) return;
        if (changes.debuggerState.newValue === 'attached') {
            friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${greenEnabledText}`
        } else {
            friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${redDisabledText}`
        }
    })
}

async function restoreOptions() {
    chrome.storage.sync.get({
        enableFriendActivityTracker: true,
        enableAvatarHeadshotURLRedirect: true
    })
    .then(items => {
        friendActivityTrackerCheckbox.checked = items.enableFriendActivityTracker
        avatarHeadshotURLRedirectCheckbox.checked = items.enableAvatarHeadshotURLRedirect
    })

    chrome.storage.session.get({ debuggerState: 'detached' })
    .then(items => {
        if (items.debuggerState === 'attached') {
            friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${greenEnabledText}`
        } else {
            friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${redDisabledText}`
        }
    })
}

document.addEventListener('DOMContentLoaded', init)
document.addEventListener('DOMContentLoaded', restoreOptions)