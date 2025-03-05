'use client'; // Mark as client component
import { useEffect, useState } from 'react';

export default function HijriDateComponent(location) {
  const [hijriDate, setHijriDate] = useState('Loading...');
  console.log(location)

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    // Fetch Hijri date from Aladhan API
    fetch(`https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=&country=${location}&method=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.date && data.data.date.hijri) {
          setHijriDate(data.data.date.hijri);
        } else {
          setHijriDate('Failed to fetch Hijri date');
        }
      })
      .catch((error) => {
        console.error('Error fetching Hijri date:', error);
        setHijriDate('Error fetching date');
      });
  }, []);

  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-bold hidden">Current Hijri Date:</h2>

      <div className='flex md:gap-5 gap-2 justify-center items-center'>
        <div className='bg-white/40 shadow-lg shadow-gray-500 font-bold text-teal-900 text-center'>
          <p className='mt-2 underline'>DATE</p>
          <p className="md:text-8xl text-2xl px-6 p-2 drop-shadow">{hijriDate?.day || "--"}</p>
        </div>
        <div className='bg-white/40 shadow-lg shadow-gray-500 font-bold text-teal-900 text-center'>
          <p className='mt-2 underline'>MONTH</p>
          <p className="md:text-8xl text-2xl px-6 p-2 drop-shadow">{hijriDate?.month?.en || "------"}</p>
        </div>
        <div className='bg-white/40 shadow-lg shadow-gray-500 font-bold text-teal-900 text-center'>
          <p className='mt-2 underline'>YEAR</p>
          <p className="md:text-8xl text-2xl px-6 p-2 drop-shadow">{hijriDate?.year || "--"}</p>
        </div>
      </div>


    </div>
  );
}
