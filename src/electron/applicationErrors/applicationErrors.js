const admZip = require("adm-zip");
const { write } = require("fs-jetpack");

function packageErrors(path, errorList) {
  if (path.length === 0)
    return {
      message: "No path was provided. Please select a path.",
      isSuccess: false
    };

  if (errorList.length === 0)
    return {
      message: "There were no errors to package. No changes have been made.",
      isSuccess: true
    };

  try {
    const content = JSON.stringify(errorList);
    const zip = new admZip();
    zip.addFile(
      "ErrorLogs",
      Buffer.alloc(content.length, content),
      "Developer error logs"
    );
    zip.writeZip(path);
    write("dewey.error.log", "");
  } catch (e) {
    return {
      error: e,
      message:
        "There was an error while saving your package, please try again.",
      isSuccess: false
    };
  }

  return {
    message: `Successfully saved application errors to ${path}`,
    isSuccess: true
  };
}

module.exports.packageErrors = packageErrors;
