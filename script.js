const inputImage = document.getElementById("image-input");
const removeButton = document.getElementById("remove-bg-btn");
const resultImage = document.getElementById("resultImage");
const originalImage = document.getElementById("originalImage");
const downloadButton = document.getElementById("download-btn");
const loader = document.getElementById("loading");

removeButton.addEventListener("click", async () => {
  
  removeButton.innerText = "Processing...";
  const file = inputImage.files[0];
  const formData = new FormData();
  formData.append("image_file", file);
//   aa formData j api through travel karine jasee server pasee 

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      // The link which  is here is for the server of which we are using API key.
      method: "POST",
      headers: { "X-Api-Key": "YOUR_API_KEY" },
      body: formData,
    });
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    resultImage.src = imageUrl;
    originalImage.src = URL.createObjectURL(file);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    removeButton.innerText = "Remove Background";
  }
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = resultImage.src;
  link.download = "result.png";
  link.click();
});
