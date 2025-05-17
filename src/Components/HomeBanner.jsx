import React from 'react';

const HomeBanner = ({ bannerImage }) => {
  // const defaultImage = 'https://images.unsplash.com/photo-1623998021451-306e52f35634?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      className="w-full h-[90vh] flex-grow bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${bannerImage}')`,
      }}
    />
  );
};

export default HomeBanner;
