const keyDisplay = document.getElementById('keyDisplay');
const codeDisplay = document.getElementById('codeDisplay');
const keyHistory = document.getElementById('keyHistory');

// Array to store key history
const keyHistoryArray = [];

// Function to update key history
function updateKeyHistory(key, code) {
    keyHistoryArray.unshift({ key, code });
    if (keyHistoryArray.length > 10) keyHistoryArray.pop(); // Limit history to last 10 entries

    // Update the display
    keyHistory.innerHTML = keyHistoryArray.map(
        entry => `<li>${entry.key} - Code: ${entry.code}</li>`
    ).join('');
}

// Optional: Sound on keypress
function playSound() {
    const audio = new Audio('keypress-sound.mp3'); // Add an audio file to the project folder
    audio.play();
}

// Keyboard event listener
document.addEventListener('keydown', (event) => {
    const key = event.key === ' ' ? 'Space' : event.key;
    const code = event.keyCode;

    // Display the pressed key and its code
    keyDisplay.textContent = `Key: ${key}`;
    codeDisplay.textContent = `Code: ${code}`;

    // Update key history
    updateKeyHistory(key, code);

    // Play sound on key press
    playSound();
});

// Display combinations like "Ctrl + C"
document.addEventListener('keydown', (event) => {
    let combination = '';
    if (event.ctrlKey) combination += 'Ctrl + ';
    if (event.altKey) combination += 'Alt + ';
    if (event.shiftKey) combination += 'Shift + ';
    combination += event.key;

    if (combination.trim() !== event.key) {
        keyDisplay.textContent = `Combination: ${combination}`;
        codeDisplay.textContent = `Code: ${event.keyCode}`;
        updateKeyHistory(combination, event.keyCode);
    }
});
