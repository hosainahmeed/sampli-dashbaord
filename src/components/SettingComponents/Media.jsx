import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import ImageUploader from './components/ImageUploader';
import SocialLinksForm from './components/SocialLinksForm';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../Redux/businessApis/business _profile/getprofileApi';
import toast from 'react-hot-toast';


const Media = () => {
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  const { data: profileData } = useGetProfileQuery();
  const [images, setImages] = useState({
    coverImage: null,
    logo: null,
  });
  const [warnings, setWarnings] = useState({
    coverImage: null,
    logo: null,
  });

  useEffect(() => {
    if (profileData?.data?.coverImage) {
      setImages((prev) => ({
        ...prev,
        coverImage: {
          file: profileData?.data?.coverImage,
          preview: profileData?.data?.coverImage,
        }
      }))
    }
    if (profileData?.data?.logo) {
      setImages((prev) => ({
        ...prev,
        logo: {
          file: profileData?.data?.logo,
          preview: profileData?.data?.logo,
        }
      }))
    }
  }, [profileData])

  const handleUpload = async ({ file, preview, warning, formData }) => {
    try {
      const type = formData.has('coverImage') ? 'coverImage' : 'logo';
      await updateProfile(formData).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message)
        }
      })
      setImages((prev) => ({
        ...prev,
        [type]: { file, preview },
      }));

      setWarnings((prev) => ({
        ...prev,
        [type]: warning,
      }));
    } catch (error) {
      toast.error(error?.data?.message)
    }
  };

  const handleRemove = (type) => {
    if (images[type]?.preview) {
      URL.revokeObjectURL(images[type].preview);
    }
    setImages((prev) => ({ ...prev, [type]: null }));
    setWarnings((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <Spin spinning={updateProfileLoading}>
      <Card style={{ margin: '0 auto' }}>
        <div className='grid grid-cols-6 gap-4'>
          <div className='lg:col-span-2 col-span-6'>
            <ImageUploader
              type="logo"
              image={images.logo}
              warning={warnings.logo}
              onUpload={handleUpload}
              onRemove={handleRemove}
            />
          </div>

          <div className='lg:col-span-4 col-span-6'>
            <ImageUploader
              type="coverImage"
              image={images.coverImage}
              warning={warnings.coverImage}
              onUpload={handleUpload}
              onRemove={handleRemove}
            />
          </div>
        </div>
        <SocialLinksForm data={profileData?.data} />
      </Card>
    </Spin>
  );
};

export default Media;
