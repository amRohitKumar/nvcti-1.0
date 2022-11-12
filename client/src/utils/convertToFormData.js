const objToFormData = (imgUrl, obj) => {
    const data = new FormData();
    for(var key in obj){
        data.append(key, obj[key]);
    }
    // append image files here
    data.append('imgUrl', imgUrl);
};

export default objToFormData;