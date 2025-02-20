import React, { useState } from 'react'
import { FaCircleChevronRight } from 'react-icons/fa6'
import { Modal, Input, Button, Upload, message } from 'antd'
import toast from 'react-hot-toast'
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
const BasicDetailsSettingsSampler = () => {
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [username, setUsername] = useState('ahsan')
  const [selectedPhoto, setSelectedPhoto] = useState(
    `https://picsum.photos/seed/10/200`
  )
  const [tempUsername, setTempUsername] = useState(username)

  const handleSaveUsername = () => {
    setUsername(tempUsername)
    setShowUsernameModal(false)
    toast.success('Username updated successfully!')
  }

  const handleSavePhoto = () => {
    setShowPhotoModal(false)
    setImageFile(setImageFileSave)
  }

  const handleInfoUpdate = () => {
    toast.success('Info updated successfully!')
  }
  const handleContactUpdate = () => {
    toast.success('Contact information updated successfully!')
  }

  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [setImageFileSave, isSetImageFileSave] = useState(null)
  const handleImageChange = (info) => {
    console.log(info)
    if (info.file) {
      const isJpgOrPng =
        info.file.type === 'image/jpeg' || info.file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG files!')
        return
      }

      const isLt2M = info.file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!')
        return
      }
      isSetImageFileSave(info.file)
      setImagePreview(URL.createObjectURL(info.file))
    }
  }

  return (
    <div className="!pb-20">
      {/* Basic Details Section */}
      <div className="bg-white rounded-lg">
        <div className="flex justify-between mt-1 border-b border-gray-200 pb-2">
          <h2 className="text-2xl font-medium">Basic details</h2>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedPhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <Button
                onClick={() => setShowPhotoModal(true)}
                type="primary"
                className="!text-sm !font-medium border border-blue-500 px-4 py-2 rounded-lg"
              >
                Upload photo
              </Button>
            </div>
            <p className="text-xs text-gray-500">Recommended size 400×400px</p>
          </div>
        </div>

        <div className="border border-gray-200 p-5">
          <div className="mb-6">
            <h3 className="text-lg font-medium py-4 border-b border-gray-200">
              Info
            </h3>
            <div
              className="flex justify-between items-center py-2 rounded-md mb-3 cursor-pointer hover:bg-gray-50"
              onClick={() => setShowUsernameModal(true)}
            >
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-sm">{username}</p>
              </div>
              <FaCircleChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-sm">
                <p className="text-sm text-gray-600 mb-1">First name</p>
                <Input
                  type="text"
                  className="w-full text-sm p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                  defaultValue="Michael Scott"
                />
              </div>
              <div className="text-sm">
                <p className="text-sm text-gray-600 mb-1">Last name</p>
                <Input
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                  defaultValue="Michael Scott"
                />
              </div>
            </div>

            <div className="text-sm">
              <p className="text-sm text-gray-600 mb-1">About</p>
              <textarea
                className="w-full p-2 border rounded-md h-32 border-gray-200 outline-none"
                defaultValue="Michael Gary Scott is a fictional character in the NBC sitcom The Office, portrayed by Steve Carell. Michael is the regional manager of the Scranton, Pennsylvania branch of Dunder Mifflin, a paper company, for the majority of the series"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleInfoUpdate}
              type="primary"
              className="!text-white px-4 py-2 rounded-md !text-sm font-medium !mt-6"
            >
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Contact & Shipping Information */}
      <div className="border border-gray-200 p-5 mt-5">
        <div className=" border-b border-gray-200">
          <h2 className="text-lg font-medium">
            Contact & Shipping Information
          </h2>
        </div>

        <div className="mt-3 text-sm">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Address</p>
              <Input
                type="text"
                className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Country</p>
                <select className="w-full p-2 border rounded-md  bg-white pr-8 border-gray-200 outline-none h-[40px]">
                  <option>Select</option>
                  <option>United States</option>
                  <option>Canada</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">ZIP/Postal Code</p>
                <Input
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">City</p>
                <select className="w-full p-2 border rounded-md  bg-white pr-8 border-gray-200 outline-none h-[40px]">
                  <option>Select</option>
                  <option>Scranton</option>
                  <option>New York</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">State</p>
                <select className="w-full p-2 border rounded-md  bg-white pr-8 border-gray-200 outline-none h-[40px]">
                  <option>Select</option>
                  <option>Pennsylvania</option>
                  <option>New York</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone number</p>
                <Input
                  type="tel"
                  className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Alternate Phone number
                </p>
                <Input
                  type="tel"
                  className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleContactUpdate}
              type="primary"
              className="!text-white px-4 py-2 rounded-md !text-sm font-medium !mt-6"
            >
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Username Change Modal */}
      <Modal
        title="Change Username"
        visible={showUsernameModal}
        onCancel={() => setShowUsernameModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowUsernameModal(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveUsername}>
            Save
          </Button>,
        ]}
        centered
      >
        <p className="text-xs text-gray-500 mb-4">
          Your new username will be visible to all users.
        </p>
        <Input
          value={tempUsername}
          onChange={(e) => setTempUsername(e.target.value)}
          placeholder="Enter new username"
        />
      </Modal>

      {/* Photo Update Modal */}
      <Modal
        title="Update Photo"
        visible={showPhotoModal}
        onCancel={() => setShowPhotoModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPhotoModal(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSavePhoto}>
            Save
          </Button>,
        ]}
        centered
      >
        <div className="flex flex-col items-center">
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            onChange={handleImageChange}
            beforeUpload={() => false}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                style={{ width: '100px' }}
              />
            ) : (
              <div className="w-[100px]">
                <UploadOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>

          <p className="text-xs  text-gray-500 !mt-2">Max file size: 2MB</p>
        </div>
      </Modal>
    </div>
  )
}

export default BasicDetailsSettingsSampler
