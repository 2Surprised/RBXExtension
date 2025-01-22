const greenEnabledText = '(<span class="green">Enabled</span>)'
const redDisabledText = '(<span class="red">Disabled</span>)'

function init() {
    const friendActivityTrackerCheckbox = document.getElementById('friend-activity-tracker')
    const friendActivityTrackerLabel = document.getElementById('friend-activity-tracker-label')
    const friendActivityTrackerLabelText = friendActivityTrackerLabel.innerHTML
    const friendCarouselExtensionCheckbox = document.getElementById('friend-carousel-extension')
    const avatarHeadshotURLRedirectCheckbox = document.getElementById('avatar-headshot-url-redirect');

    (async function restoreOptions() {
        chrome.storage.sync.get({
            enableFriendActivityTracker: true,
            enableFriendCarouselExtension: true,
            enableAvatarHeadshotURLRedirect: true
        })
        .then(items => {
            friendActivityTrackerCheckbox.checked = items.enableFriendActivityTracker
            friendCarouselExtensionCheckbox.checked = items.enableFriendCarouselExtension
            avatarHeadshotURLRedirectCheckbox.checked = items.enableAvatarHeadshotURLRedirect
        })
    
        chrome.storage.session.get({ debuggerState: 'detached' })
        .then(items => {
            items.debuggerState === 'attached' ?
            friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${greenEnabledText}` :
            friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${redDisabledText}`
        })
    })()

    async function saveOptions() {
        const isFriendActivityTrackerEnabled = friendActivityTrackerCheckbox.checked
        const isFriendCarouselExtensionEnabled = friendCarouselExtensionCheckbox.checked
        const isAvatarHeadshotURLRedirectEnabled = avatarHeadshotURLRedirectCheckbox.checked
        await chrome.storage.sync.set(
            {
                enableFriendActivityTracker: isFriendActivityTrackerEnabled,
                enableFriendCarouselExtension: isFriendCarouselExtensionEnabled,
                enableAvatarHeadshotURLRedirect: isAvatarHeadshotURLRedirectEnabled
            }
        )
    }

    friendActivityTrackerCheckbox.addEventListener('change', saveOptions)
    friendCarouselExtensionCheckbox.addEventListener('change', saveOptions)
    avatarHeadshotURLRedirectCheckbox.addEventListener('change', saveOptions)

    chrome.storage.session.onChanged.addListener(changes => {
        if (!changes.debuggerState) return;
        changes.debuggerState.newValue === 'attached' ?
        friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${greenEnabledText}` :
        friendActivityTrackerLabel.innerHTML = `${friendActivityTrackerLabelText} ${redDisabledText}`
    })
}

document.addEventListener('DOMContentLoaded', init)