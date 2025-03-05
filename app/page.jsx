"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import HijriDate from '../components/HijriDate';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';

const Home = () => {
  // Retrieve user location from cookies; default to 'Saudi Arabia'
  const [location, setLocation] = useState(() => Cookies.get('userCountry'));

  // Update cookie when the location changes
  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Convert latitude/longitude to city using a reverse geocoding API
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const city = data.address.district;
              const country = data.address.country;
              setLocation(country);

              Cookies.set('userCity', city, { expires: 2 });
              Cookies.set('userCountry', country, { expires: 2 });
            })
            .catch(err => console.error("GeoCountry error:", err));
        },
        (error) => console.error("Error getting Country:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Hijri Date App - Accurate Hijri Calendar</title>
        <meta
          name="description"
          content="View the Hijri date based on your location. Default is Saudi Arabia. Signup for reminders on important dates like Eid, Ramzan, and more."
        />
      </Head>
      <main
        className="flex flex-col items-center justify-center min-h-screen bg-white bg-cover bg-center text-white relative"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Transparent Navbar */}
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4 md:px-10 text-teal-900">
          <div className="text-2xl font-bold">Islamic Date Today</div>
          <div className="flex gap-10 md:pr-20">
            <a href="https://thetravelsofzee.com" target='_blank' className="hover:text-gray-700 font-bold md:p-2 hover:shadow-xl">About Us</a>
          </div>
        </nav>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-900 drop-shadow-xl drop-shadow-white tracking-widest uppercase">
            THE ISLAMIC DATE TODAY IS
          </h1>
        </div>
        <div>
          <HijriDate location={location} />
        </div>
        <div className="absolute md:bottom-18 bottom-50 md:w-2/5 text-sm">
          <SignupForm location={location} />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
