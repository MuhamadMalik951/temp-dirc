// app / user / persondetails / page.tsx


import DetailForm from '../../../components/settings/detailform';

export default function persondetails() {
  return (
    <>
      <div className="flex flex-col md:flex-row  md:overflow-hidden ">
        <div className="bg-gray-50 text-black flex-grow p-3 md:overflow-y-auto md:p-5">
          <div className="w-full">
            <div className="font-semibold text-lg p-3">
              Personal <span className="text-blue">Details</span>
            </div>
            <DetailForm></DetailForm>
          </div>
        </div>
      </div>
    </>
  );
}
