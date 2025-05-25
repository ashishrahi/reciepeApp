import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../features/store";

interface User {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image: string;
  gender: string;
  username: string;
  birthDate: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
  university: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  bank: {
    cardNumber: string;
    cardType: string;
    cardExpire: string;
  };
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
}

const UserProfile = () => {
  // const [user, setUser] = useState<User | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const user = useSelector((state:RootState)=>state.auth.user)

  // useEffect(() => {
  //   fetch("https://dummyjson.com/users/1")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch user data.");
  //       return res.json();
  //     })
  //     .then((data) => setUser(data))
  //     .catch((err) => setError(err.message));
  // }, []);

  // if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="text-gray-600 text-center mt-10">Loading user profile...</p>;

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={user?.avatar}
          alt={user?.firstName}
          className="w-36 h-36 object-cover rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-indigo-800">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-600">@{user?.username}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium shadow">
            {/* {user.role.toUpperCase()} */}
          </span>
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p>📧 {user.email}</p>
            {/* <p>📱 {user.phone}</p> */}
            {/* <p>🎂 Born: {user.birthDate} ({user.age} yrs)</p> */}
            <p>👩 Gender: {user.gender}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">📍 Address</h3>
          {/* <p>{user.address.address}</p> */}
          {/* <p>{user.address.city}, {user.address.state}, {user.address.country} - {user.address.postalCode}</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">🏢 Company</h3>
          {/* <p>{user.company.title} @ <strong>{user.company.name}</strong></p> */}
          {/* <p>Dept: {user.company.department}</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">🎓 Education</h3>
          {/* <p>{user?.university}</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">🧬 Health</h3>
          {/* <p>Blood Group: {user?.bloodGroup}</p> */}
          {/* <p>Height: {user?.height} cm</p> */}
          {/* <p>Weight: {user?.weight} kg</p> */}
          {/* <p>Eyes: {user?.eyeColor}</p> */}
          {/* <p>Hair: {user?.hair.color} ({user?.hair.type})</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">💳 Bank</h3>
          {/* <p>{user?.bank.cardType} - **** **** **** {user?.bank.cardNumber.slice(-4)}</p> */}
          {/* <p>Expires: {user?.bank.cardExpire}</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">💰 Crypto</h3>
          {/* <p>{user?.crypto.coin} on {user?.crypto.network}</p> */}
          {/* <p>Wallet: <span className="break-words">{user?.crypto.wallet}</span></p> */}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
