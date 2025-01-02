
function copyToClipBoard(textToCopy) {
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.log("err", err)
  }
  document.body.removeChild(textarea);
}

export { copyToClipBoard }
