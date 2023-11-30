const Subscription = () => {
  return (
    
      <div className="min-h-screen pt-16 flex justify-center items-center">
        <div className="">
          <div className="text-center font-semibold">
            <h1 className="text-5xl">
              <span className="text-blue-700 tracking-wide">Flexible </span>
              <span>Plans</span>
            </h1>
            <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
              Choose a plan that works best for you and your team.
            </p>
          </div>
          <div className="pt-24 flex flex-col lg:flex-row">
            {/* Basic Card */}
            <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">
                Premium Individual
              </h1>
              <p className="pt-2 tracking-wide">
                <span className="text-3xl font-semibold">Free</span> <br />
                <span className="text-gray-400 font-medium">for 1 month</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="flex items-center font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">1.</span>
                  <span className="pl-2">1 Premium Account</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">2.</span>
                  <span className="pl-2">Cancel anytime</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">3.</span>
                  <span className="pl-2">
                    <span className="text-black"></span>15 hours/month of
                    listening time from our audiobooks subscriber catalog
                  </span>
                </p>

                <p className="w-full py-4 mb-2 bg-blue-500 mt-8 rounded-xl text-white">
                  <span className="font-medium">Try free for 1 month</span>
                </p>
                <small>
                  Free for 1 month, then $10.99 per month after. Offer only
                  available if you haven&apos;t tried permium before.{" "}
                  <a href="#" className="underline">
                    Terms apply
                  </a>
                </small>
              </div>
            </div>
            {/* Premium Duo */}
            <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
              <h1 className="text-white font-semibold text-2xl">Premuim Duo</h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">$ </span>
                <span className="text-3xl font-semibold">14.99</span>
                <span className="text-gray-400 font-medium">/ month</span>
              </p>
              <hr className="mt-4 border-1 border-gray-600" />
              <div className="pt-8">
                <p className="flex items-center font-semibold text-gray-400 text-left">
                  <span className="material-icons align-middle">1.</span>
                  <span className="pl-2">2 Premium Accounts</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">2.</span>
                  <span className="pl-2">Cancel anytime</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">3. </span>
                  <span className="pl-2">
                    15 hours/month of listening time from our audiobooks
                    subscriber catalog(plan manager only)
                  </span>
                </p>
                <p className="w-full py-4 mb-2 bg-blue-500 mt-8 rounded-xl text-white">
                  <span className="font-medium">Get Premium Duo</span>
                </p>
                <small>
                  For couples who reside at the same address.{" "}
                  <a href="#" className="underline">
                    Terms apply
                  </a>
                </small>
              </div>
              <div className="absolute top-4 right-4">
                <p className="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                  Popular
                </p>
              </div>
            </div>
            {/* Premium family */}
            <div className="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
              <h1 className="text-black font-semibold text-2xl">
                Premium Family
              </h1>
              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">$ </span>
                <span className="text-3xl font-semibold">16.99</span>
                <span className="text-gray-400 font-medium">/ month</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">1.</span>
                  <span className="pl-2">Up to 6 Premium or Kids accounts</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">2.</span>
                  <span className="pl-2">Block explicit music</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">3.</span>
                  <span className="pl-2">Access to Spotify Kids</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">4.</span>
                  <span className="pl-2">Cancel anytime</span>
                </p>
                <p className="flex items-center font-semibold text-gray-400 text-left pt-5">
                  <span className="material-icons align-middle">5.</span>
                  <span className="pl-2"> 15 hours/month of listening time from our audiobooks
                    subscriber catalog(plan manager only)</span>
                </p>

                  <p className="w-full py-4 bg-blue-500 mt-8 rounded-xl text-white">
                    <span className="font-medium">Get Premium Family</span>
                  </p>
                  <small>
                  For up yo 6 family members residing at the same address.{" "}
                  <a href="#" className="underline">
                    Terms apply
                  </a>
                </small>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Subscription;
