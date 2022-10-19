import React, { useState } from "react";
import Avatar from "react-avatar-edit";

const CropAvatar = () => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);

    const onClose = () => {
        setPreview(null);
    };

    const onCrop = (view) => {
        setPreview(view);
    };

    return (
        <div>
            <Avatar
                width={200}
                height={200}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
            />
        </div>
    );
};

export default CropAvatar;

// import { useCallback, useState } from "react";
// import Cropper from "react-easy-crop";

// const CropAvatar = (yourImage) => {
//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);

//     const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//         console.log(croppedArea, croppedAreaPixels);
//     }, []);

//     return (
//         <Cropper
//             image={yourImage}
//             crop={crop}
//             zoom={zoom}
//             aspect={4 / 4}
//             onCropChange={setCrop}
//             onCropComplete={onCropComplete}
//             onZoomChange={setZoom}
//         />
//     );
// };
// export default CropAvatar;
