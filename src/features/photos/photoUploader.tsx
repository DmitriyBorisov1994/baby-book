import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Dragger } = Upload;

const beforeUpload = (file: RcFile) => {
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
   if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
   }
   const isLt6M = file.size / 1024 / 1024 < 6;
   if (!isLt6M) {
      message.error('Image must smaller than 6MB!');
   }
   return isJpgOrPng && isLt6M;
};

type PhotoUploaderProps = {
   onSetPhoto: (file: any) => void,
   url?: string
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onSetPhoto, url }) => {
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState<string>();

   console.log(url)

   useEffect(() => {

      if (url) setImageUrl(url)
   }, [url])


   const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      console.log(info)
      if (info.file.status === 'uploading') {
         setLoading(true);
         return;
      }
      if (info.file.status === 'done') {
         setLoading(false)
      }
   };

   const uploadButton = (
      <div>
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div style={{ marginTop: 8 }}>Upload</div>
      </div>
   );

   return (
      <div style={{ width: '50%' }}>
         <Dragger
            name="photo"
            multiple={false}
            customRequest={async ({ file }: any) => {
               console.log(file)
               let src = file.url as string;
               if (!src) {
                  src = await new Promise(resolve => {
                     const reader = new FileReader();
                     reader.readAsDataURL(file as RcFile);
                     reader.onload = () => resolve(reader.result as string);
                  });
               }
               setImageUrl(src)
               onSetPhoto(file)
            }
            }
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
         >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
         </Dragger>
      </div>

   );
};

export default PhotoUploader;