const password = "i understand it now" // I sure hope no one will try reading this from the dev tools

const root = document.documentElement;
const enterButton = document.getElementById("enter-button");
const hintButton = document.getElementById("hint-button");
const textForm = document.getElementById("password-box");

let disabled = false;
let selectionRange = null;

function disableInputs(isDisabled) {
    disabled = isDisabled;
    enterButton.disabled = isDisabled;
    textForm.disabled = isDisabled;
}

function playTextAnimation(isCorrect) {
    const current_class = isCorrect ? "correct-box-state" : "wrong-box-state";
    const current_text = isCorrect ? "correct" : "wrong";

    disableInputs(true);
    textForm.value = current_text;
    textForm.classList.add(current_class);

    if (!isCorrect) {
        setTimeout(() => {
            textForm.classList.remove(current_class);
            textForm.value = "";
            disableInputs(false);
            textForm.select();
        }, getComputedStyle(root).getPropertyValue("--color-switch-time"));
    }

}

function downloadTextFile() {
    const link = document.createElement('a');
    link.href = 'file.txt';
    link.download = 'file.txt';
    link.click();
}

function onEnterClick() {
    if (textForm.value.toLowerCase() === password) {
        playTextAnimation(true);
        downloadTextFile();
    } else {
        playTextAnimation(false);
    }
}

function onHintClick() {
    alert("There are no hints. Cry about it");
}

root.style.setProperty("--default-box-color", textForm.style.color);

enterButton.addEventListener("click", onEnterClick);
textForm.addEventListener("keydown", function(event) {
    if (event.key == "Enter" && !disabled) {
        onEnterClick();
    }
});

hintButton.addEventListener("click", onHintClick);