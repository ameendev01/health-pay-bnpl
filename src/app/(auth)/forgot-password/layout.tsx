import React, { PropsWithChildren } from "react";

const PasswordResetLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-[#d5f9fb] p-4">
      <div className="h-full rounded-xl p-2 bg-[#fefcf5] overflow-y-auto flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default PasswordResetLayout;
