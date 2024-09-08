//  app / components / settings / detailform.tsx

'use client';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import CustomInput from '../customInput';
import { CustomSelect, CustomTextarea } from '@/app/components/customInput';
// use
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { getUserData, getUserToken } from '@/app/user/utils';
import Image from 'next/image';

interface FormData {
  phone: string;
  // date: string;
  // cnic: string;
  // licenseNO: string;
  // CouncilRegNo: string;
  // AboutMe: string;
  // Language: string;
  name: string;
  email: string;
  // imgPreview: string;
  gender: string;
  profile_picture: File | null | string | MediaSource;
  id: number;
  is_lawyer: boolean;
  is_verified: boolean;
}
interface FormData {
  phone: string;
  name: string;
  email: string;
  gender: string;
  profile_picture: File | null | string | MediaSource;
  id: number;
  is_lawyer: boolean;
  is_verified: boolean;
}

export default function DetailForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    gender: '',
    id: 2,
    is_lawyer: false,
    is_verified: true,
    name: '',
    phone: '',
    profile_picture: null,
  });

  const [receivedFormData, setReceievedFormData] = useState<FormData>({
    email: 'test@email.com',
    gender: 'M',
    id: 2,
    is_lawyer: false,
    is_verified: true,
    name: 'Test User',
    phone: '03003435353',
    profile_picture: null,
  });

  const [isEdit, setEdit] = useState(false);

  const handleEdit = () => {
    if (!isEdit) {
      setFormData(receivedFormData);
    }

    setEdit(!isEdit);
  };

  const userUrl = 'https://api.lawmatepk.com/user/me/';

  useEffect(() => {
    const userToken = getUserToken();
    fetch('https://api.lawmatepk.com/user/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${userToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('couldnt get data');
        }
      })
      .then((result) => {
        setReceievedFormData({
          email: result.email,
          gender: result.gender,
          id: result.id,
          is_lawyer: result.is_lawyer,
          is_verified: result.is_verified,
          name: result.name,
          phone: result.phone,
          profile_picture: result.profile_picture || '',
        });
      })
      .catch((error) => {
        console.error('Error occured geting user details ', error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const api = '/api/submit';

    const response = await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setReceievedFormData(result.data || formData);
    // setEdit(false);
  };

  return (
    <>
      <div className="rounded-l flex w-full ">
        <form
          className="flex flex-col items-center justify-start lg:flex-col w-full"
          method=""
          onSubmit={handleSubmit}
        >
          <div className="lg:flex lg:flex-col w-full lg:justify-around lg:items-start flex flex-col items-center">
            <div className=" flex flex-col items-center lg:justify-start mt-10 lg:ml-28">
              <div className="aspect- w-36 h-36 lg:w-52 lg:h-52 object-cover cursor-pointer flex justify-center">
                <Image
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  width={500}
                  height={500}
                  alt="profile pciture"
                  className='avatar rounded-full object-cover w-full h-full cursor-pointer'
                  // className="avatar rounded-full object-cover w-full h-full cursor-pointer"
                  // alt="Tailwind CSS Navbar component"
                  // onClick={(e) => {
                  // setFormData({ ...formData, img: e.target.value });
                  // }}
                  // src={receivedFormData.imgPreview}
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={
                  (e) => {
                    const file = e.target.files?.[0];

                    // if (file) {
                    // setFormData({
                    // ...formData,
                    // img: file,
                    // imgPreview: URL.createObjectURL(file),
                    // });
                    // } else {
                    // setFormData({
                    // ...formData,
                    // img: null,
                    // imgPreview: '',
                    // });
                  }
                  // }}
                }
                className={clsx(
                  isEdit
                    ? 'flex justify-center border-transparent text-white items-center ml-20 mt-5 file-input  file-input-info fill-blue file-input-bordered file-input-sm w-full max-w-52 '
                    : 'hidden'
                )}
                accept="image/*"
              />

              <div className="flex flex-col text-center mt-3">
                <div className="font-semibold">{receivedFormData.name}</div>
                <div className="text-gray">{receivedFormData.email}</div>
                <div className="antialiased">{receivedFormData.phone}</div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex gap-6">
                <div className="mt-4 font-semibold">Personal Details</div>
              </div>
              <div className="flex gap-6">
                <div className="form-control w-full">
                  <CustomInput
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={isEdit ? formData.name : receivedFormData.name}
                    onChange={(e: any) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
                <div className="form-control w-full">
                  <CustomInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={isEdit ? formData.email : receivedFormData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="form-control w-full">
                  <CustomInput
                    id="phone"
                    type="tel"
                    placeholder="Mobile Number"
                    value={isEdit ? formData.phone : receivedFormData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
                <div className="form-control w-full">
                  <CustomInput
                    id="date"
                    type="date"
                    placeholder="Date"
                    // value={isEdit ? formData.date : receivedFormData.date}
                    // onChange={(e) =>
                    // setFormData({ ...formData, date: e.target.value })
                    // }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="form-control w-full">
                  <CustomInput
                    id="cnic"
                    type="number"
                    placeholder="CNIC No"
                    // value={isEdit ? formData.cnic : receivedFormData.cnic}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, cnic: e.target.value })
                    // }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
                <div className="form-control w-full">
                  <CustomInput
                    id="licenseNo"
                    type="number"
                    placeholder="License No"
                    // value={
                    //   isEdit ? formData.licenseNO : receivedFormData.licenseNO
                    // }
                    // onChange={(e) =>
                    //   setFormData({ ...formData, licenseNO: e.target.value })
                    // }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="form-control w-full">
                  <CustomInput
                    id="councilRegNo"
                    type="number"
                    placeholder="Council Registration Number"
                    // value={
                    //   isEdit
                    //     ? formData.CouncilRegNo
                    //     : receivedFormData.CouncilRegNo
                    // }
                    onChange={(e) =>
                      setFormData({ ...formData, CouncilRegNo: e.target.value })
                    }
                    readOnly={!isEdit}
                  />
                  <p className="text-error text-xs mt-1" />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-4 font-semibold">About Me</div>
              </div>
              <div className="flex gap-6">
                <div className="w-full">
                  <CustomTextarea
                    placeholder="Bio"
                    // value={isEdit ? formData.AboutMe : receivedFormData.AboutMe}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, AboutMe: e.target.value })
                    // }
                    readOnly={!isEdit}
                  />
                  <div className="flex gap-6 flex-col mb-10">
                    <div className="mt-4 font-semibold">Select Language</div>
                    <CustomSelect
                      id="language"
                      // value={
                      //   isEdit ? formData.Language : receivedFormData.Language
                      // }
                      // readOnly={!isEdit}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, Language: e.target.value })
                      // }
                      options={[
                        { label: 'English', value: 'English' },
                        { label: 'German', value: 'German' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              isEdit
                ? 'flex justify-end lg:w-full gap-3 w-full mr-32'
                : 'flex justify-end w-full mr-32  lg:justify-center lg:ml-32'
            )}
          >
            <div
              className={clsx(
                isEdit ? 'flex justify-center items-center ml-24' : 'hidden'
              )}
            >
              <button
                onClick={handleEdit}
                className="btn text-blue bg-[#59c1f11a]  "
              >
                Cancel
              </button>
            </div>
            <div className="flex justify-center items-center  ">
              {isEdit ? (
                <button
                  onClick={() => {
                    handleEdit();
                  }}
                  className="btn text-white bg-blue "
                  type="submit"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleEdit();
                  }}
                  className="btn text-white bg-blue "
                >
                  Edit Info
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
