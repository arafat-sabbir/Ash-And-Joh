const Newsletter = () => {
   return (
      <section className="flex flex-col items-center">
         <div className="grid sm:grid-cols-1 lg:grid-cols-2">
         <div className="my-auto space-y-3">
            <h2 className="text-4xl font-bold">
               Subscribe to our <br /> newsletter.
            </h2>
            <p className="text-base text-gray-600">
               Get the latest news, events & more delivered to your inbox.
            </p>
            <div className="join">
               <input
                  className="input input-bordered join-item"
                  placeholder="Email"
               />
               <button className="btn join-item rounded-r-full">
                  Subscribe
               </button>
            </div>
         </div>
         <div>
            <img src="https://i.ibb.co/j6XjpMN/div-elementor-element.png" alt="" />
         </div>
         </div>
      </section>
   );
};

export default Newsletter;
