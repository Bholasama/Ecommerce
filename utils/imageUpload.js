export const imageUpload = async (images) => {
    let imgArr = []
    for (const item of images) {
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", "swifty");
        formData.append("cloud_name", "dvrxjvqn8");
        formData.append("api_key","878211195927838")

        const res = await fetch("https://api.cloudinary.com/v1_1/dvrxjvqn8/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})

    }
    return imgArr;
};