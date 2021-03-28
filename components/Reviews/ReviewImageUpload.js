import React, {useCallback} from 'react';
import {useDropzone} from "react-dropzone";
import {useRouter} from 'next/router';


const dropzoneStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const ReviewImageUpload = (props) => {

    const router = useRouter()

    const {setImageFiles, ...rest} = props

    const onDrop = (acceptedFiles) => {
        const businessId = router.query.id
        const fileData = new FormData()
        acceptedFiles.forEach( (file) => {
            fileData.append('files', file, file.name)
        })
        fileData.append('businessId', businessId)


        setImageFiles(fileData)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    return (
        <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <h2>Drop the files here...</h2> :
                    <h2>Drop image files here...</h2>
            }
        </div>
    )
}

export default ReviewImageUpload;