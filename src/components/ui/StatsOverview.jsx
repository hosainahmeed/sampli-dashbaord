import React from 'react';
import img from '../../assets/icons/dollar.svg';
function StatsOverview() {
  const statsData = [
    {
      title: 'Total Campaigns',
      value: 150,
    },
    {
      title: 'Total Spent',
      value: 50000,
    },
    {
      title: 'Active Customers',
      value: 120,
    },
    {
      title: 'Average Rating',
      value: 300,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-[#dadada] rounded-3xl overflow-hidden">
      {statsData?.map((key) => (
        <div
          key={key}
          className="flex p-8 border-r border-[#999Eab] flex-col items-start justify-center text-[#26282F] cursor-pointer transition-all"
        >
          <h1 className="uppercase text-xs xl:text-base text-[#6D7486]">
            {key?.title}
          </h1>
          <h1 className="sm:text-xl xl:text-4xl font-semibold">
            {key?.title === 'Total Spent' ? (
              <span className='flex items-center gap-2'>
                <img src={img} /> {key?.value.toLocaleString('en-US')}
              </span>
            ) : (
              key?.value
            )}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default StatsOverview;
